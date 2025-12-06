// src/components/figma/FigmaPreview.jsx
import React from 'react';
import { ExternalLink, Layout } from 'lucide-react';
import { extractFileName, getThumbnailUrl, parseFigmaUrl } from '@/services/figma/figmaService';

/**
 * FigmaPreview Component
 * Shows a thumbnail preview of a Figma design in a node
 */
export default function FigmaPreview({ url, onViewClick }) {
    if (!url) return null;

    const parsed = parseFigmaUrl(url);
    if (!parsed) return null;

    const fileName = extractFileName(url);
    const thumbnailUrl = getThumbnailUrl(parsed.fileId);

    return (
        <div className="space-y-2">
            {/* Thumbnail */}
            <div
                className="relative group cursor-pointer rounded-md overflow-hidden border border-slate-200 bg-slate-50 hover:border-blue-400 transition-colors"
                onClick={onViewClick}
            >
                <img
                    src={thumbnailUrl}
                    alt={fileName}
                    className="w-full h-32 object-cover"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white rounded-full p-2">
                            <Layout className="h-5 w-5 text-slate-700" />
                        </div>
                    </div>
                </div>
            </div>

            {/* File Info */}
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700 truncate">
                        {fileName}
                    </p>
                    <p className="text-xs text-slate-500 capitalize">
                        {parsed.type === 'proto' ? 'Prototype' : 'Design File'}
                    </p>
                </div>

                {/* External Link */}
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                >
                    <ExternalLink className="h-4 w-4" />
                </a>
            </div>

            {/* View Design Button */}
            {onViewClick && (
                <button
                    onClick={onViewClick}
                    className="w-full text-xs py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors font-medium"
                >
                    View Design
                </button>
            )}
        </div>
    );
}
