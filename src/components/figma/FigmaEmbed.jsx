// src/components/figma/FigmaEmbed.jsx
import React, { useState } from 'react';
import { Loader2, Maximize2, X } from 'lucide-react';
import { generateEmbedUrl, isValidFigmaUrl } from '@/services/figma/figmaService';

/**
 * FigmaEmbed Component
 * Embeds a Figma file or prototype using iframe
 */
export default function FigmaEmbed({ url, className = '', onClose }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    if (!url || !isValidFigmaUrl(url)) {
        return (
            <div className="flex items-center justify-center h-full bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-center p-8">
                    <p className="text-slate-600 font-medium">Invalid Figma URL</p>
                    <p className="text-sm text-slate-500 mt-2">
                        Please provide a valid Figma file or prototype URL
                    </p>
                </div>
            </div>
        );
    }

    const embedUrl = generateEmbedUrl(url);

    const handleLoad = () => {
        setIsLoading(false);
        setHasError(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <div className={`relative w-full h-full ${className}`}>
            {/* Loading State */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50 rounded-lg">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                        <p className="text-sm text-slate-500">Loading Figma design...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {hasError && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-center p-8">
                        <p className="text-slate-600 font-medium">Failed to load Figma embed</p>
                        <p className="text-sm text-slate-500 mt-2">
                            The design may be private or the URL is incorrect
                        </p>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                            Open in Figma →
                        </a>
                    </div>
                </div>
            )}

            {/* Figma Iframe */}
            <iframe
                src={embedUrl}
                className="w-full h-full rounded-lg border-0"
                allowFullScreen
                onLoad={handleLoad}
                onError={handleError}
                title="Figma Embed"
            />
        </div>
    );
}
