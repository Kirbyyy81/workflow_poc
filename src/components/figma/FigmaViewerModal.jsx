// src/components/modals/FigmaViewerModal.jsx
import React from 'react';
import { X, ExternalLink, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FigmaEmbed from '@/components/figma/FigmaEmbed';
import { extractFileName } from '@/services/figma/figmaService';

/**
 * FigmaViewerModal Component
 * Full-screen modal for viewing Figma embeds
 */
export default function FigmaViewerModal({ isOpen, onClose, url }) {
    const [copied, setCopied] = React.useState(false);

    if (!isOpen || !url) return null;

    const fileName = extractFileName(url);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-[95vw] h-[95vh] bg-white rounded-lg shadow-2xl flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-semibold text-slate-900 truncate">
                            {fileName}
                        </h2>
                        <p className="text-sm text-slate-500">Figma Design</p>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                        {/* Copy Link Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCopyLink}
                            className="gap-2"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4" />
                                    Copy Link
                                </>
                            )}
                        </Button>

                        {/* Open in Figma Button */}
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                        >
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="gap-2"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Open in Figma
                            </a>
                        </Button>

                        {/* Close Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="h-8 w-8"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Figma Embed */}
                <div className="flex-1 p-6 overflow-hidden">
                    <FigmaEmbed url={url} className="h-full" />
                </div>
            </div>
        </div>
    );
}
