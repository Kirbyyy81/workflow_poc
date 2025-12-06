// src/components/nodes/BaseNode.jsx
import React, { memo } from 'react';
import { Position } from '@xyflow/react';
import { Edit, Trash2 } from 'lucide-react';
import CustomHandle from './CustomHandle';
import { NODE_COLORS, NODE_COLOR_SCHEMES } from '@/lib/constants';

const BaseNode = memo(({
  data,
  id,
  selected,
  icon,
  title,
  content,
  footer,
  handles = [
      { id: 't', position: Position.Top, offset: 50 },
      { id: 'r', position: Position.Right, offset: 50 },
      { id: 'b', position: Position.Bottom, offset: 50 },
      { id: 'l', position: Position.Left, offset: 50 }
  ],
  outputs = [], // Backward compatibility
  color = 'stone',
  className = '',
  onEdit,
  onDelete,
}) => {
  
  // Theme configuration using Constants
const colors = NODE_COLOR_SCHEMES[color] || NODE_COLOR_SCHEMES[NODE_COLORS.STONE];
  
  // Calculation for styles to place handle exactly on edge
  const getHandleStyle = (position, offset = 50) => {
    switch (position) {
      case Position.Top: return { top: '-5px', left: `${offset}%` };
      case Position.Bottom: return { bottom: '-5px', left: `${offset}%` };
      case Position.Left: return { left: '-5px', top: `${offset}%` };
      case Position.Right: return { right: '-5px', top: `${offset}%` };
      default: return { left: '50%', top: 0 };
    }
  };

  const allHandles = [...handles, ...outputs];

  return (
    <div
      className={`
        ${colors.bg} 
        ${selected ? colors.selectedBorder + ' ring-1 ring-stone-400' : colors.border + ' border'} 
        rounded-lg shadow-sm min-w-[240px] max-w-[320px]
        transition-all duration-200
        ${selected ? 'shadow-md' : 'hover:shadow-md'}
        ${className}
        relative group/node
      `}
    >
      {/* Render Interactive Handles */}
      {allHandles.map((handle, index) => {
        const positionStyle = getHandleStyle(handle.position, handle.offset || 50);
        
        return (
          <CustomHandle
            key={`${id}-${handle.position}-${index}`}
            id={handle.id || handle.position} // Pass 't', 'r', etc.
            position={handle.position}
            style={positionStyle}
            onAdd={(type) => {
              if (data.onAddFromHandle) {
                data.onAddFromHandle(id, type, handle.position);
              }
            }}
          />
        );
      })}

      {/* Header */}
      <div className={`px-4 py-3 flex items-start justify-between border-b border-stone-100`}>
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {icon && <div className={`flex-shrink-0 mt-0.5 ${colors.accent}`}>{icon}</div>}
          <div className="flex-1 min-w-0">
            <div className={`font-serif font-medium text-base leading-tight ${colors.headerText}`}>
              {title || data?.label || 'Node'}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`px-4 py-3 text-sm text-stone-600 font-sans`}>
        {content || (
          <div>{data?.description || 'Node content goes here'}</div>
        )}
      </div>

      {/* Footer */}
      {(footer || onEdit || onDelete) && (
        <div className="px-4 py-2 border-t border-stone-100 text-xs text-stone-500 bg-stone-50/50 rounded-b-lg flex justify-between items-center min-h-[36px]">
          <div className="flex-1 mr-2">{footer}</div>
          <div className="flex items-center gap-1">
            {onEdit && (
              <button onClick={(e) => { e.stopPropagation(); onEdit(id); }} className="p-1.5 hover:bg-stone-200 rounded-md text-stone-500 hover:text-stone-700 transition-colors">
                <Edit className="w-3.5 h-3.5" />
              </button>
            )}
            {onDelete && (
              <button onClick={(e) => { e.stopPropagation(); onDelete(id); }} className="p-1.5 hover:bg-red-100 rounded-md text-stone-500 hover:text-red-600 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

BaseNode.displayName = 'BaseNode';
export default BaseNode;