import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [isHovered, setIsHovered] = React.useState(false);

  const handleAddSubnode = (e) => {
    e.stopPropagation();
    if (data?.onAddSubnode) {
      data.onAddSubnode(id);
    }
  };

  const handleAddSibling = (e) => {
    e.stopPropagation();
    if (data?.onAddSibling) {
      data.onAddSibling(id);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (data?.onRemove) {
      data.onRemove(id);
    }
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: isHovered ? 3 : 2,
          stroke: isHovered ? '#3b82f6' : '#b1b1b7',
        }}
      />
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: 'pointer' }}
      />
      
      {isHovered && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="flex gap-1 bg-white rounded-lg shadow-lg border p-1"
          >
            <Button
              size="icon-sm"
              variant="outline"
              onClick={handleAddSubnode}
              title="Add Child Node"
              className="h-7 w-7"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="sr-only">Add child node</span>
            </Button>
            <Button
              size="icon-sm"
              variant="outline"
              onClick={handleAddSibling}
              title="Add Sibling Node"
              className="h-7 w-7"
            >
              <Plus className="h-3.5 w-3.5 rotate-90" />
              <span className="sr-only">Add sibling node</span>
            </Button>
            <Button
              size="icon-sm"
              variant="outline"
              onClick={handleRemove}
              title="Remove Edge"
              className="h-7 w-7 hover:bg-destructive hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
              <span className="sr-only">Remove edge</span>
            </Button>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}