// src/components/nodes/FlowNode.jsx
import React from 'react';
import { Play, CheckCircle, XCircle } from "lucide-react";
import { Handle, Position } from '@xyflow/react';

/**
 * FlowNode - Represents Start or End points in a workflow
 * Distinct rounded capsule shape
 */
export default function FlowNode({ data, id, selected }) {
  const isStart = data.flowType === 'start';
  const isEnd = data.flowType === 'end';
  const isError = data.flowType === 'error';

  // Determine colors based on flow type
  const getColors = () => {
    if (isStart) {
      return {
        bg: 'bg-green-50',
        border: 'border-green-400',
        text: 'text-green-700',
        icon: 'text-green-600',
      };
    } else if (isError) {
      return {
        bg: 'bg-red-50',
        border: 'border-red-400',
        text: 'text-red-700',
        icon: 'text-red-600',
      };
    } else {
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-400',
        text: 'text-blue-700',
        icon: 'text-blue-600',
      };
    }
  };

  const colors = getColors();

  // Get icon based on type
  const getIcon = () => {
    if (isStart) return <Play className="h-4 w-4" />;
    if (isError) return <XCircle className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  return (
    <div
      className={`
        relative px-6 py-3 rounded-full border-2 
        ${colors.bg} ${colors.border}
        ${selected ? 'ring-2 ring-offset-2 ring-blue-400' : ''}
        shadow-md hover:shadow-lg transition-all duration-200
        min-w-[160px]
      `}
    >
      {/* Handles */}
      {!isStart && (
        <Handle
          type="target"
          position={Position.Top}
          id="t-target"
          className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white"
        />
      )}
      {!isEnd && !isError && (
        <Handle
          type="source"
          position={Position.Bottom}
          id="b-source"
          className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white"
        />
      )}

      {/* Content */}
      <div className="flex items-center justify-center gap-2">
        <div className={colors.icon}>
          {getIcon()}
        </div>
        <div className={`font-semibold text-sm ${colors.text}`}>
          {data.label || (isStart ? 'Start' : isError ? 'Error' : 'End')}
        </div>
      </div>

      {/* Trigger/Condition */}
      {data.trigger && (
        <div className="text-xs text-center mt-1 text-slate-600">
          {data.trigger}
        </div>
      )}
    </div>
  );
}