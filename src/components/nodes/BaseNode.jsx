// src/components/nodes/BaseNode.jsx
import React, { memo } from 'react';
import { Position } from '@xyflow/react';
import { Edit, Trash2 } from 'lucide-react';
import HandleWithAdd from './CustomHandle';

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
  outputs = [],
  color = 'stone',
  className = '',
  onEdit,
  onDelete,
}) => {
  
  // ... (Keep existing colorSchemes logic) ...
  const colorSchemes = {
    stone: { bg: 'bg-stone-50', border: 'border-stone-200', headerText: 'text-stone-900', accent: 'text-stone-500', selectedBorder: 'border-stone-400' },
    blue: { bg: 'bg-stone-50', border: 'border-stone-200', headerText: 'text-slate-900', accent: 'text-slate-500', selectedBorder: 'border-slate-400' },
    green: { bg: 'bg-stone-50', border: 'border-stone-200', headerText: 'text-emerald-900', accent: 'text-emerald-600', selectedBorder: 'border-emerald-400' },
    purple: { bg: 'bg-stone-50', border: 'border-stone-200', headerText: 'text-violet-900', accent: 'text-violet-600', selectedBorder: 'border-violet-400' },
    orange: { bg: 'bg-stone-50', border: 'border-stone-200', headerText: 'text-orange-900', accent: 'text-orange-600', selectedBorder: 'border-orange-400' },
    red: { bg: 'bg-stone-50', border: 'border-stone-200', headerText: 'text-red-900', accent: 'text-red-600', selectedBorder: 'border-red-400' },
  };
  
  const colors = colorSchemes[color] || colorSchemes.stone;

  // Calculation for styles
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
      {/* Render Universal Interactive Handles */}
      {allHandles.map((handle, index) => {
        const positionStyle = getHandleStyle(handle.position, handle.offset || 50);
        
        return (
          <HandleWithAdd
            key={`${id}-${handle.position}-${index}`}
            id={handle.id || `${handle.position}`} // e.g. "r", "l"
            position={handle.position}
            style={positionStyle}
            // Logic: HandleWithAdd decides 'type' (source/target) based on the button clicked
            onAdd={(type) => {
              if (data.onAddFromHandle) {
                data.onAddFromHandle(id, type, handle.position);
              }
            }}
          />
        );
      })}

      {/* Header, Content, Footer (Same as before) */}
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

      <div className={`px-4 py-3 text-sm text-stone-600 font-sans`}>
        {content || (
          <div>{data?.description || 'Node content goes here'}</div>
        )}
      </div>

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