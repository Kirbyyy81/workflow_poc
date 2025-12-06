import React from 'react';
import { GitBranch } from "lucide-react";
import BaseNode from './BaseNode';

/**
 * WorkflowNode - Parent/high-level workflow node
 * Uses BaseNode with purple theming and workflow-specific configuration
 */
export default function WorkflowNode({ data, id, selected }) {
  // Map status to BaseNode status types
  const getStatus = () => {
    const status = data.status?.toLowerCase() || '';
    if (status.includes('progress')) return 'processing';
    if (status.includes('completed') || status.includes('approved')) return 'active';
    if (status.includes('error') || status.includes('failed')) return 'error';
    if (status.includes('pending') || status.includes('review')) return 'idle';
    return 'idle';
  };

  return (
    <BaseNode
      data={data}
      id={id}
      selected={selected}
      icon={<GitBranch />}
      title={data.label || "Workflow"}
      subtitle={data.description}
      color="purple"
      status={getStatus()}
      badge="Workflow"
      inputs={[
        { position: 'top', id: 'top', color: '#9333ea' }
      ]}
      outputs={[
        { position: 'bottom', id: 'bottom', color: '#9333ea' },
        { position: 'left', id: 'left', color: '#22c55e' },
        { position: 'right', id: 'right', color: '#22c55e' }
      ]}
      footer={
        <div className="flex justify-between items-center text-xs">
        <span className="capitalize font-medium">{data.status || 'Upcoming'}</span>
      </div>
      }
      onEdit={data.onEdit ? () => data.onEdit(id) : undefined}
      onDelete={data.onDelete ? () => data.onDelete(id) : undefined}
    />
  );
}