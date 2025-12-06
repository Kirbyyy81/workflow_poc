// src/components/nodes/UiNode.jsx
import React, { useState } from 'react';
import { Layout, Smartphone, Monitor } from "lucide-react";
import BaseNode from './BaseNode';
import FigmaPreview from '@/components/figma/FigmaPreview';
import FigmaViewerModal from '@/components/figma/FigmaViewerModal';

/**
 * UiNode - Represents UI components, screens, or design elements
 * Specialized for Figma designs, wireframes, and mockups
 */
export default function UiNode({ data, id, selected }) {
    const [isFigmaModalOpen, setIsFigmaModalOpen] = useState(false);

    // Determine device type icon
    const getDeviceIcon = () => {
        const deviceType = data.deviceType?.toLowerCase() || 'desktop';
        if (deviceType.includes('mobile') || deviceType.includes('phone')) {
            return <Smartphone />;
        } else if (deviceType.includes('tablet')) {
            return <Monitor className="h-4 w-4" />;
        }
        return <Layout />;
    };

    // Map status to BaseNode status types
    const getStatus = () => {
        const status = data.status?.toLowerCase() || '';
        if (status.includes('progress') || status.includes('design')) return 'processing';
        if (status.includes('completed') || status.includes('approved')) return 'active';
        if (status.includes('review')) return 'idle';
        return 'idle';
    };

    // Build content with Figma preview or description
    const content = (
        <div className="space-y-2">
            {data.description && (
                <div className="text-sm text-slate-600">{data.description}</div>
            )}

            {data.figmaUrl && (
                <FigmaPreview
                    url={data.figmaUrl}
                    onViewClick={() => setIsFigmaModalOpen(true)}
                />
            )}

            {data.deviceType && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    {getDeviceIcon()}
                    <span className="capitalize">{data.deviceType}</span>
                </div>
            )}
        </div>
    );

    return (
        <>
            <BaseNode
                data={data}
                id={id}
                selected={selected}
                icon={<Layout />}
                title={data.label || "UI Component"}
                subtitle="UI Design"
                content={content}
                color="blue"
                status={getStatus()}
                badge={data.deviceType || "Screen"}
                footer={
                    <div className="flex justify-between items-center text-xs">
                        <span className="capitalize font-medium">{data.status || 'In Design'}</span>
                    </div>
                }
                onEdit={data.onEdit ? () => data.onEdit(id) : undefined}
                onDelete={data.onDelete ? () => data.onDelete(id) : undefined}
            />

            {/* Figma Viewer Modal */}
            {data.figmaUrl && (
                <FigmaViewerModal
                    isOpen={isFigmaModalOpen}
                    onClose={() => setIsFigmaModalOpen(false)}
                    url={data.figmaUrl}
                />
            )}
        </>
    );
}
