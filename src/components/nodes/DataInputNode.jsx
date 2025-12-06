import React, { useState } from 'react';
import { Database, Code, Layout, FileJson } from "lucide-react";
import BaseNode from './BaseNode';
import FigmaPreview from '@/components/figma/FigmaPreview';
import FigmaViewerModal from '@/components/figma/FigmaViewerModal';

/**
 * Type-specific icon mapping
 */
const TYPE_ICONS = {
  'UI/Figma': <Layout />,
  'API': <Code />,
  'Data': <Database />,
  'JSON': <FileJson />,
  'Validation': <FileJson />,
};

/**
 * Type-specific color mapping to BaseNode colors
 */
const TYPE_TO_COLOR = {
  'UI/Figma': 'blue',
  'API': 'green',
  'Data': 'orange',
  'JSON': 'gray',
  'Validation': 'red',
};

/**
 * DataInputNode - Child/component-level node with type-specific styling
 * Uses BaseNode with dynamic theming based on node type
 */
export default function DataInputNode({ data, id, selected }) {
  const [isFigmaModalOpen, setIsFigmaModalOpen] = useState(false);

  const type = data.type || 'Data';
  const icon = TYPE_ICONS[type] || TYPE_ICONS['Data'];
  const color = TYPE_TO_COLOR[type] || 'orange';

  // Map status to BaseNode status types
  const getStatus = () => {
    const status = data.status?.toLowerCase() || '';
    if (status.includes('progress')) return 'processing';
    if (status.includes('completed') || status.includes('approved')) return 'active';
    if (status.includes('error') || status.includes('failed')) return 'error';
    if (status.includes('pending') || status.includes('review')) return 'idle';
    return 'idle';
  };

  // Build custom content with endpoint/figmaUrl
  const content = (
    <div className="space-y-2">
      {data.description && (
        <div className="text-sm">{data.description}</div>
      )}
      {data.endpoint && (
        <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded text-xs font-mono break-all">
          {data.endpoint}
        </div>
      )}
      {data.figmaUrl && (
        <FigmaPreview
          url={data.figmaUrl}
          onViewClick={() => setIsFigmaModalOpen(true)}
        />
      )}
    </div>
  );

  // Handle colors based on type
  const getHandleColor = () => {
    const colors = {
      'blue': '#3b82f6',
      'green': '#22c55e',
      'orange': '#f97316',
      'gray': '#6b7280',
      'red': '#ef4444',
    };
    return colors[color] || '#6b7280';
  };

  return (
    <>
      <BaseNode
        data={data}
        id={id}
        selected={selected}
        icon={icon}
        title={data.label || "Data Input"}
        subtitle={type}
        content={content}
        color={color}
        status={getStatus()}
        badge={type}
        footer={
          <div className="flex justify-between items-center text-xs">
            <span className="capitalize font-medium">{data.status || 'Pending'}</span>
          </div>
        }
        onEdit={data.onEdit ? () => data.onEdit(id) : undefined}
        onDelete={data.onDelete ? () => data.onDelete(id) : undefined}
      />

      {/* Figma Viewer Modal */}
      <FigmaViewerModal
        isOpen={isFigmaModalOpen}
        onClose={() => setIsFigmaModalOpen(false)}
        url={data.figmaUrl}
      />
    </>
  );
}