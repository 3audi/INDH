import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '100mb' }));

// ─── Environment & Paths ──────────────────────────────────────────────────────
const isProd = process.env.NODE_ENV === 'production';
const ROOT_DIR = process.cwd(); // Use process.cwd() for more reliable pathing in containers

const DATA_FILE = path.join(ROOT_DIR, 'data', 'content.json');
const CREDENTIALS_FILE = path.join(ROOT_DIR, 'data', 'credentials.json');
const FB_TRANSLATIONS_FILE = path.join(ROOT_DIR, 'data', 'fb_translations.json');

// Default credentials (fallback if data/credentials.json is missing)
const DEFAULT_CREDS = { 
  username: process.env.ADMIN_USERNAME || 'INDHDRADMIN', 
  password: process.env.ADMIN_PASSWORD || 'Abdo+13320' 
};

console.log(`📂  Root Directory: ${ROOT_DIR}`);
console.log(`📄  Data File: ${DATA_FILE}`);
console.log(`🔐  Credentials File: ${CREDENTIALS_FILE}`);
console.log(`🚀  Environment: ${process.env.NODE_ENV || 'development'}`);

// ─── Content API ──────────────────────────────────────────────────────────────
app.get('/api/content', async (_req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    res.json(JSON.parse(data));
  } catch (err: any) {
    if (err.code === 'ENOENT') res.json(null);
    else { console.error('Read error:', err); res.status(500).json({ error: 'Failed to read' }); }
  }
});

app.post('/api/content', async (req, res) => {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (err) {
    console.error('Write error:', err);
    res.status(500).json({ error: 'Failed to save' });
  }
});

// ─── Credentials API ──────────────────────────────────────────────────────────
app.get('/api/credentials', async (_req, res) => {
  try {
    const data = await fs.readFile(CREDENTIALS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    console.log('✅  Credentials read successfully from file');
    res.json(parsed);
  } catch (err: any) {
    console.warn(`⚠️  Could not read credentials file: ${err.message}. Using defaults.`);
    res.json(DEFAULT_CREDS);
  }
});

app.post('/api/credentials', async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    res.status(400).json({ error: 'username and password required' });
    return;
  }
  try {
    await fs.mkdir(path.dirname(CREDENTIALS_FILE), { recursive: true });
    await fs.writeFile(CREDENTIALS_FILE, JSON.stringify({ username, password }, null, 2));
    res.json({ success: true });
  } catch (err) {
    console.error('Credentials write error:', err);
    res.status(500).json({ error: 'Failed to save credentials' });
  }
});

// ─── Image Proxy API ──────────────────────────────────────────────────────────
// Bypasses Google Drive CORS and hotlinking restrictions
app.get('/api/proxy-image', async (req, res) => {
  const { url } = req.query;
  if (!url || typeof url !== 'string') {
    res.status(400).send('Missing url parameter');
    return;
  }

  try {
    const response = await fetch(url, {
      headers: {
        // Spoof a standard browser to avoid bot blocks
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://drive.google.com/'
      }
    });

    if (!response.ok) {
      // Try the thumbnail API fallback if direct fails
      const thumbnailFallback = url.replace('uc?export=view&id=', 'thumbnail?id=').replace('&sz=w2000', '') + '&sz=w2000';
      if (url !== thumbnailFallback && url.includes('drive.google.com')) {
        const fallbackResponse = await fetch(thumbnailFallback, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          }
        });
        if (fallbackResponse.ok) {
          const contentType = fallbackResponse.headers.get('content-type') || 'image/jpeg';
          res.setHeader('Content-Type', contentType);
          res.setHeader('Cache-Control', 'public, max-age=31536000');
          res.send(Buffer.from(await fallbackResponse.arrayBuffer()));
          return;
        }
      }
      res.status(response.status).send('Failed to fetch image');
      return;
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Check if it returned a Google Drive HTML page instead of an image
    if (contentType.includes('text/html')) {
      const text = await response.text();
      // Try to extract the real image URL from the HTML if it's a Drive generic view page
      const match = text.match(/<meta property="og:image" content="(.*?)"/);
      if (match && match[1]) {
        const realImageUrl = match[1];
        const realResponse = await fetch(realImageUrl);
        if (realResponse.ok) {
          res.setHeader('Content-Type', realResponse.headers.get('content-type') || 'image/jpeg');
          res.setHeader('Cache-Control', 'public, max-age=31536000');
          res.send(Buffer.from(await realResponse.arrayBuffer()));
          return;
        }
      }
      res.status(403).send('Google Drive blocked direct image access (HTML returned)');
      return;
    }

    // Set appropriate headers and stream the image
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Send the array buffer
    res.send(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    console.error('Image proxy error:', error);
    res.status(500).send('Failed to proxy image');
  }
});

// ─── Facebook API ─────────────────────────────────────────────────────────────
app.get('/api/facebook', async (_req, res) => {
  try {
    let clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    let sheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !privateKey || !sheetId) {
      try {
        const envFile = await fs.readFile(path.join(__dirname, '.env'), 'utf-8');
        const envLines = envFile.split('\n');
        for (const line of envLines) {
          if (line.startsWith('GOOGLE_CLIENT_EMAIL=')) clientEmail = line.substring(line.indexOf('=') + 1).trim();
          if (line.startsWith('GOOGLE_PRIVATE_KEY=')) privateKey = line.substring(line.indexOf('=') + 1).replace(/^"|"$/g, '').replace(/\\n/g, '\n');
          if (line.startsWith('GOOGLE_SHEET_ID=')) sheetId = line.substring(line.indexOf('=') + 1).trim();
        }
      } catch {
        console.warn('Could not read .env file for Google credentials');
      }
    }

    if (!clientEmail || !privateKey || !sheetId) {
      res.status(500).json({ error: 'Missing Google Sheets credentials in .env' });
      return;
    }

    // Clean up private key if it was quoted or contains escaped newlines
    privateKey = privateKey.replace(/\\n/g, '\n').replace(/^"|"$/g, '');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'A2:G2000', // Fetch up to 2000 posts (A-G, Column G = video URL)
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      res.json({ data: [] });
      return;
    }

    const formattedPosts = rows.map((row) => {
      const id = row[0];
      const date = row[1];
      const imagesStr = row[2] || '';
      const arabic = row[3] || '';
      const english = row[4] || arabic;
      const french = row[5] || arabic;
      const videoUrl = (row[6] || '').trim() || null;

      const imageUrls = imagesStr.split(',').map((u: string) => u.trim()).filter(Boolean);
      const full_picture = imageUrls.length > 0 ? imageUrls[0] : null;

      const attachments = { data: [] as any[] };
      if (imageUrls.length > 0) {
        attachments.data.push({
          subattachments: {
            data: imageUrls.map(url => ({ media: { image: { src: url } } }))
          }
        });
      }

      return {
        id: id,
        created_time: date,
        message: arabic,
        full_picture: full_picture,
        attachments: attachments,
        videoUrl: videoUrl,
        translations: {
          en: english,
          fr: french
        }
      };
    });

    res.json({ data: formattedPosts, paging: {} });

  } catch (err) {
    console.error('Google Sheets API error:', err);
    res.status(500).json({ error: 'Failed to fetch from Google Sheets' });
  }
});

// ─── Vite / Static ────────────────────────────────────────────────────────────
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(ROOT_DIR, 'dist');
    console.log(`📦  Serving static files from: ${distPath}`);
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`✅  http://localhost:${port}`));
}

startServer();
