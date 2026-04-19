import React, { useRef, useCallback } from 'react';
import {
    Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight,
    Heading1, Heading2, Type
} from 'lucide-react';

interface RichTextEditorProps {
    value: string; // HTML string
    onChange: (html: string) => void;
    dir?: 'rtl' | 'ltr';
    className?: string;
    minHeight?: string;
}

const ToolBtn: React.FC<{
    onClick: () => void;
    title: string;
    active?: boolean;
    children: React.ReactNode;
}> = ({ onClick, title, active, children }) => (
    <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); onClick(); }}
        title={title}
        className={`p-1.5 rounded transition-all ${active
                ? 'bg-m-red/20 text-m-red'
                : 'hover:bg-black/10 dark:hover:bg-white/10 text-void/60 dark:text-white/60 hover:text-void dark:hover:text-white'
            }`}
    >
        {children}
    </button>
);

const COLORS = ['#000000', '#ef4444', '#22c55e', '#3b82f6', '#f59e0b', '#a855f7', '#ec4899', '#ffffff'];

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value,
    onChange,
    dir = 'ltr',
    className = '',
    minHeight = '200px',
}) => {
    const editorRef = useRef<HTMLDivElement>(null);

    const exec = useCallback((cmd: string, val?: string) => {
        document.execCommand(cmd, false, val);
        editorRef.current?.focus();
        if (editorRef.current) onChange(editorRef.current.innerHTML);
    }, [onChange]);

    const handleInput = () => {
        if (editorRef.current) onChange(editorRef.current.innerHTML);
    };

    const insertBlock = (tag: string) => {
        exec('formatBlock', tag);
    };

    return (
        <div className={`border border-black/10 dark:border-white/10 rounded-xl overflow-hidden ${className}`}>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
                {/* Text format */}
                <ToolBtn onClick={() => exec('bold')} title="Bold"><Bold size={14} /></ToolBtn>
                <ToolBtn onClick={() => exec('italic')} title="Italic"><Italic size={14} /></ToolBtn>
                <ToolBtn onClick={() => exec('underline')} title="Underline"><Underline size={14} /></ToolBtn>

                <div className="w-px h-5 bg-black/10 dark:bg-white/10 mx-1" />

                {/* Headings */}
                <ToolBtn onClick={() => insertBlock('h1')} title="Heading 1"><Heading1 size={14} /></ToolBtn>
                <ToolBtn onClick={() => insertBlock('h2')} title="Heading 2"><Heading2 size={14} /></ToolBtn>
                <ToolBtn onClick={() => insertBlock('p')} title="Paragraph"><Type size={14} /></ToolBtn>

                <div className="w-px h-5 bg-black/10 dark:bg-white/10 mx-1" />

                {/* Lists */}
                <ToolBtn onClick={() => exec('insertUnorderedList')} title="Bullet List"><List size={14} /></ToolBtn>

                <div className="w-px h-5 bg-black/10 dark:bg-white/10 mx-1" />

                {/* Alignment */}
                <ToolBtn onClick={() => exec('justifyLeft')} title="Align Left"><AlignLeft size={14} /></ToolBtn>
                <ToolBtn onClick={() => exec('justifyCenter')} title="Align Center"><AlignCenter size={14} /></ToolBtn>
                <ToolBtn onClick={() => exec('justifyRight')} title="Align Right"><AlignRight size={14} /></ToolBtn>

                <div className="w-px h-5 bg-black/10 dark:bg-white/10 mx-1" />

                {/* Font Size */}
                <select
                    onMouseDown={e => e.stopPropagation()}
                    onChange={e => exec('fontSize', e.target.value)}
                    defaultValue="3"
                    className="text-xs bg-transparent border border-black/10 dark:border-white/10 rounded px-1 py-0.5 text-void dark:text-white outline-none"
                    title="Font Size"
                >
                    {['1', '2', '3', '4', '5', '6', '7'].map(s => (
                        <option key={s} value={s}>
                            {['8', '10', '12', '14', '18', '24', '36'][+s - 1]}px
                        </option>
                    ))}
                </select>

                <div className="w-px h-5 bg-black/10 dark:bg-white/10 mx-1" />

                {/* Text Color */}
                <div className="flex items-center gap-0.5">
                    {COLORS.map(color => (
                        <button
                            key={color}
                            type="button"
                            onMouseDown={e => { e.preventDefault(); exec('foreColor', color); }}
                            title={color}
                            className="w-4 h-4 rounded-sm border border-black/20 hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>

                <div className="flex-1" />

                {/* Clear formatting */}
                <button
                    type="button"
                    onMouseDown={e => { e.preventDefault(); exec('removeFormat'); }}
                    className="text-xs text-void/40 dark:text-white/40 hover:text-void dark:hover:text-white px-2 py-1 rounded transition-all"
                    title="Clear Formatting"
                >
                    Clear
                </button>
            </div>

            {/* Editable Area */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                dir={dir}
                onInput={handleInput}
                dangerouslySetInnerHTML={{ __html: value }}
                style={{ minHeight }}
                className="p-4 outline-none text-void dark:text-white text-sm leading-relaxed bg-white dark:bg-black/20 focus:ring-1 focus:ring-m-green/50 [&_h1]:text-2xl [&_h1]:font-black [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-2"
            />
        </div>
    );
};
