// src/components/nodes/HandleWithAdd.jsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Plus } from 'lucide-react';

export default function HandleWithAdd({ 
  position, 
  id, 
  onAdd, 
  style, 
  className 
}) {
  const isRight = position === Position.Right;
  const isLeft = position === Position.Left;
  const isTop = position === Position.Top;
  const isBottom = position === Position.Bottom;

  // Logic: 
  // Right/Bottom handles add a "Next Step" (Source logic)
  // Left/Top handles add a "Previous Step" (Target logic)
  const isOutputSide = isRight || isBottom;

  return (
    <div 
      className={`group absolute flex items-center justify-center z-50`}
      style={{
        ...style,
        // Center the wrapper perfectly on the edge
        transform: (isTop || isBottom) ? 'translateX(-50%)' : 'translateY(-50%)',
        width: '10px', 
        height: '10px',
        border: 'none',
        background: 'transparent'
      }}
    >
      {/* 1. TARGET HANDLE (Visible Base) 
          Allows incoming connections */}
      <Handle
        type="target"
        position={position}
        id={`${id}-target`} // RESTORED ID SUFFIX
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          background: '#78716c', 
          border: '2px solid #fafaf9',
          borderRadius: '50%',
          zIndex: 10
        }}
        className={className}
      />

      {/* 2. SOURCE HANDLE (Invisible Overlay) 
          Allows dragging NEW connections out */}
      <Handle
        type="source"
        position={position}
        id={`${id}-source`} // RESTORED ID SUFFIX
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          opacity: 0, // Invisible but clickable
          zIndex: 11
        }}
      />

      {/* 3. ADD BUTTON (Visible on Hover) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          // If Output side, treat as Source (add Child). 
          // If Input side, treat as Target (add Parent).
          onAdd(isOutputSide ? 'source' : 'target');
        }}
        className={`
          absolute opacity-0 group-hover:opacity-100 transition-all duration-200
          bg-blue-600 text-white rounded-full p-0.5 shadow-sm hover:bg-blue-700 hover:scale-110
          flex items-center justify-center w-5 h-5
          z-50 cursor-pointer pointer-events-auto
          ${isRight ? 'left-full ml-1' : ''}
          ${isLeft ? 'right-full mr-1' : ''}
          ${isTop ? 'bottom-full mb-1' : ''}
          ${isBottom ? 'top-full mt-1' : ''}
        `}
        title={isOutputSide ? "Add Next Step" : "Add Previous Step"}
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
}