import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadFieldProps {
    value: string;
    onChange: (url: string) => void;
    placeholder?: string;
    className?: string;
}

// Route all Google-hosted images through the backend proxy to avoid browser 429 rate limits.
// Works locally with server.ts; build script downloads images for Hostinger static hosting.
const resolveUrl = (url: string): string => {
    if (!url) return url;

    // Already going through our proxy — leave it alone
    if (url.includes('/api/proxy-image')) return url;

    // Route lh3 URLs through proxy (browser gets 429 rate-limited when loading directly)
    if (url.includes('lh3.googleusercontent.com')) {
        return `/api/proxy-image?url=${encodeURIComponent(url)}`;
    }

    if (!url.includes('drive.google.com')) return url;

    let fileId: string | null = null;
    // /file/d/ID/ — most common "Copy link" format
    const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch) fileId = fileMatch[1];

    // ?id=ID or &id=ID — covers uc?id=, uc?export=view&id=, open?id=
    if (!fileId) {
        const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (idMatch) fileId = idMatch[1];
    }

    if (fileId) {
        const targetUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        return `/api/proxy-image?url=${encodeURIComponent(targetUrl)}`;
    }

    return url;
};

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
    value,
    onChange,
    placeholder = 'Image URL or upload from device...',
    className = '',
}) => {
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            if (ev.target?.result) onChange(ev.target.result as string);
        };
        reader.readAsDataURL(file);
        // Reset input so same file can be re-selected
        e.target.value = '';
    };

    return (
        <div className={`flex gap-2 items-center ${className}`}>
            {/* Hidden file picker */}
            <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
            />

            {/* URL text input */}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(resolveUrl(e.target.value))}
                placeholder={placeholder}
                className="flex-1 min-w-0 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 text-xs font-mono focus:border-m-green focus:ring-1 focus:ring-m-green outline-none transition-all text-void dark:text-white placeholder:text-void/30 dark:placeholder:text-white/30"
            />

            {/* Upload from device button */}
            <button
                type="button"
                onClick={() => fileRef.current?.click()}
                title="Upload from device"
                className="shrink-0 flex items-center gap-1.5 px-3 py-2 bg-sky-500/10 hover:bg-sky-500 text-sky-600 dark:text-sky-400 hover:text-white border border-sky-500/20 hover:border-sky-500 rounded-lg text-xs font-bold transition-all"
            >
                <Upload size={13} />
                Upload
            </button>

            {/* Clear button */}
            {value && (
                <button
                    type="button"
                    onClick={() => onChange('')}
                    title="Clear"
                    className="shrink-0 p-2 text-void/30 dark:text-white/30 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                >
                    <X size={14} />
                </button>
            )}
        </div>
    );
};
