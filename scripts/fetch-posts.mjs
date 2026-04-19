/**
 * fetch-posts.mjs
 * Pre-build script: Fetches all Facebook posts from Google Sheets,
 * downloads all Google Drive/lh3 images as local static files,
 * and writes public/posts.json for zero-latency, proxy-free static serving.
 * Run automatically via: npm run build
 */

import { google } from 'googleapis';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Load credentials from .env file ─────────────────────────────────────────
async function loadEnv() {
    const envPath = path.join(__dirname, '..', '.env');
    const envContent = await fs.readFile(envPath, 'utf-8');
    const env = {};
    for (const line of envContent.split('\n')) {
        const idx = line.indexOf('=');
        if (idx === -1) continue;
        const key = line.substring(0, idx).trim();
        const val = line.substring(idx + 1).trim().replace(/^"|"$/g, '');
        env[key] = val;
    }
    return env;
}

// ── Detect if a URL is a video ──────────────────────────────────────────────
function isVideoUrl(url) {
    if (!url) return false;
    const lower = url.toLowerCase();
    // Direct video file extensions
    if (/\.(mp4|mov|webm|avi|mkv)(\?|$)/.test(lower)) return true;
    // YouTube links
    if (lower.includes('youtube.com/watch') || lower.includes('youtu.be/')) return true;
    // Facebook video links
    if (lower.includes('facebook.com') && lower.includes('/videos/')) return true;
    return false;
}

// ── Download a Google Drive / lh3 image and save it locally ─────────────────
const downloadedMap = new Map(); // cache: original url → local path

async function downloadGoogleImage(rawUrl, imgDir) {
    if (!rawUrl) return rawUrl;
    if (downloadedMap.has(rawUrl)) return downloadedMap.get(rawUrl);

    // Determine the real fetch URL
    let fetchUrl = rawUrl;
    let fileId = null;

    if (rawUrl.includes('lh3.googleusercontent.com/d/')) {
        fileId = rawUrl.split('/d/')[1].split('?')[0];
        fetchUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
    } else if (rawUrl.includes('drive.google.com')) {
        const fileMatch = rawUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        const idMatch = rawUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        fileId = fileMatch ? fileMatch[1] : (idMatch ? idMatch[1] : null);
        if (fileId) fetchUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
    } else {
        return rawUrl; // Not a Google Drive URL — return as-is
    }

    try {
        const res = await fetch(fetchUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
            redirect: 'follow',
        });
        if (!res.ok) {
            console.warn(`  ⚠️  Could not download ${fetchUrl} (${res.status}) — keeping original URL`);
            return rawUrl;
        }
        const ext = (res.headers.get('content-type') || 'image/jpeg').includes('png') ? 'png' : 'jpg';
        const filename = `gdrive-${fileId || Date.now()}.${ext}`;
        const localPath = path.join(imgDir, filename);

        const arrayBuffer = await res.arrayBuffer();
        await fs.writeFile(localPath, Buffer.from(arrayBuffer));

        const publicUrl = `/img/${filename}`;
        downloadedMap.set(rawUrl, publicUrl);
        return publicUrl;
    } catch (e) {
        console.warn(`  ⚠️  Failed to download ${fetchUrl}: ${e.message} — keeping original URL`);
        return rawUrl;
    }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function fetchPosts() {
    console.log('📥  Fetching posts from Google Sheets...');

    let clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    let sheetId = process.env.GOOGLE_SHEET_ID;

    // Fall back to reading the .env file directly (for local builds)
    if (!clientEmail || !privateKey || !sheetId) {
        const env = await loadEnv();
        clientEmail = clientEmail || env['GOOGLE_CLIENT_EMAIL'];
        privateKey = privateKey || env['GOOGLE_PRIVATE_KEY'];
        sheetId = sheetId || env['GOOGLE_SHEET_ID'];
    }

    if (!clientEmail || !privateKey || !sheetId) {
        throw new Error('Missing GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, or GOOGLE_SHEET_ID');
    }

    // Normalize private key newlines
    privateKey = privateKey.replace(/\\n/g, '\n').replace(/^"|"$/g, '');

    const auth = new google.auth.GoogleAuth({
        credentials: { client_email: clientEmail, private_key: privateKey },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'A2:G2000',
    });

    const rows = response.data.values || [];
    console.log(`✅  Retrieved ${rows.length} rows from sheet.`);

    // Create local image cache directory
    const imgDir = path.join(__dirname, '..', 'public', 'img');
    await fs.mkdir(imgDir, { recursive: true });

    console.log('🖼️   Downloading Google Drive images locally...');

    // Process rows and download all Google Drive images
    const data = await Promise.all(
        rows.filter(row => row[0]).map(async (row) => {
            const rawUrls = (row[2] || '').split(',').map(u => u.trim()).filter(Boolean);

            // Column G = dedicated video URL; fallback: detect video URLs in Column C
            const columnGVideo = (row[6] || '').trim() || null;
            const videoUrls = rawUrls.filter(u => isVideoUrl(u));
            const rawImageUrls = rawUrls.filter(u => !isVideoUrl(u));
            const videoUrl = columnGVideo || (videoUrls.length > 0 ? videoUrls[0] : null);

            // Download each image locally (skip video URLs)
            const imageUrls = await Promise.all(rawImageUrls.map(u => downloadGoogleImage(u, imgDir)));
            const full_picture = imageUrls[0] || null;

            const attachments = { data: [] };
            if (imageUrls.length > 0) {
                attachments.data.push({
                    subattachments: {
                        data: imageUrls.map(url => ({ media: { image: { src: url } } })),
                    },
                });
            }

            return {
                id: String(row[0]),
                created_time: String(row[1]),
                message: String(row[3] || ''),
                full_picture,
                attachments,
                videoUrl,
                translations: {
                    en: String(row[4] || row[3] || ''),
                    fr: String(row[5] || row[3] || ''),
                },
            };
        })
    );

    // Write to public/posts.json (served as a static file after build)
    const outputPath = path.join(__dirname, '..', 'public', 'posts.json');
    await fs.writeFile(outputPath, JSON.stringify({ data }, null, 2));
    console.log(`💾  Saved ${data.length} posts to public/posts.json`);
    console.log(`🖼️   Downloaded ${downloadedMap.size} images to public/img/`);
}

fetchPosts().catch(err => {
    console.error('❌  fetch-posts failed:', err.message);
    process.exit(1);
});
