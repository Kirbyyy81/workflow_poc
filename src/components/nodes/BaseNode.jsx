import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

/**
 * BaseNode - A flexible foundation component for all node types
 * 
 * This component provides:
 * - Consistent styling and layout
 * - Configurable handles (inputs/outputs)
 * - Header with icon and title
 * - Customizable content area
 * - Footer section
 * - Status indicators
 * 
 * To create a new node type, simply wrap this component and pass custom content.
 */

const BaseNode = memo(({ 
  data,
  id,
  selected,
  // Design customization props
  icon,
  title,
  subtitle,
  content,
  footer,
  
  // Handle configuration
  inputs = [],
  outputs = [],

  // Styling options
  color = 'blue',
  variant = 'default',
  className = '',
  // Status
  status,
  badge,
}) => {
  // Color schemes for different node types
  const colorSchemes = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      header: 'bg-blue-500',
      text: 'text-blue-900',
      selectedBorder: 'border-blue-600'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-300',
      header: 'bg-green-500',
      text: 'text-green-900',
      selectedBorder: 'border-green-600'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      header: 'bg-purple-500',
      text: 'text-purple-900',
      selectedBorder: 'border-purple-600'
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-300',
      header: 'bg-orange-500',
      text: 'text-orange-900',
      selectedBorder: 'border-orange-600'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      header: 'bg-red-500',
      text: 'text-red-900',
      selectedBorder: 'border-red-600'
    },
    gray: {
      bg: 'bg-gray-50',
      border: 'border-gray-300',
      header: 'bg-gray-500',
      text: 'text-gray-900',
      selectedBorder: 'border-gray-600'
    }
  };

  const colors = colorSchemes[color] || colorSchemes.blue;

  // Status indicator colors
  const statusColors = {
    active: 'bg-green-400',
    idle: 'bg-gray-400',
    error: 'bg-red-400',
    warning: 'bg-yellow-400',
    processing: 'bg-blue-400 animate-pulse'
  };

  return (
    <div
      className={`
        ${colors.bg} 
        ${selected ? colors.selectedBorder + ' border-2' : colors.border + ' border'} 
        rounded-lg shadow-lg min-w-[200px] max-w-[300px]
        transition-all duration-200
        ${selected ? 'shadow-xl scale-105' : 'shadow-md'}
        ${className}
      `}
    >
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={input.position || Position.Left}
          id={input.id || `input-${index}`}
          style={{
            top: input.top || `${((index + 1) * 100) / (inputs.length + 1)}%`,
            background: input.color || '#555',
            width: '12px',
            height: '12px',
            border: '2px solid white'
          }}
          className="transition-all hover:scale-125"
        />
      ))}

      {/* Header */}
      <div className={`${colors.header} text-white px-4 py-3 rounded-t-lg flex items-center justify-between`}>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {icon && <div className="flex-shrink-0 text-xl">{icon}</div>}
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">
              {title || data?.label || 'Node'}
            </div>
            {subtitle && (
              <div className="text-xs opacity-90 truncate">{subtitle}</div>
            )}
          </div>
        </div>
        
        {/* Status Indicator */}
        {status && (
          <div 
            className={`w-2 h-2 rounded-full ${statusColors[status]} flex-shrink-0 ml-2`}
            title={status}
          />
        )}
        
        {/* Badge */}
        {badge && (
          <div className="ml-2 px-2 py-0.5 bg-white bg-opacity-20 rounded text-xs flex-shrink-0">
            {badge}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className={`px-4 py-3 ${colors.text}`}>
        {content || (
          <div className="text-sm">
            {data?.description || 'Node content goes here'}
          </div>
        )}
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-4 py-2 border-t border-gray-200 text-xs text-gray-600">
          {footer}
        </div>
      )}

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={output.position || Position.Right}
          id={output.id || `output-${index}`}
          style={{
            top: output.top || `${((index + 1) * 100) / (outputs.length + 1)}%`,
            background: output.color || '#555',
            width: '12px',
            height: '12px',
            border: '2px solid white'
          }}
          className="transition-all hover:scale-125"
        />
      ))}
    </div>
  );
});

BaseNode.displayName = 'BaseNode';

export default BaseNode;