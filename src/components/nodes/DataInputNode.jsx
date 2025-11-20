import React from 'react';
import { Database, Code, Layout, FileJson } from "lucide-react";
import BaseNode from './BaseNode';

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
        <a
          href={data.figmaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 underline block"
        >
          View in Figma →
        </a>
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
          {data.onDelete && (
            <button
              onClick={() => data.onDelete(id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      }
    />
  );
}