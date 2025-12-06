// src/data/initialNodes.js
import { MarkerType } from '@xyflow/react';
import { NODE_TYPES, NODE_STATUS } from '@/lib/constants';

export const initialNodes = [
  {
    id: 'workflow-1',
    type: NODE_TYPES.WORKFLOW,
    position: { x: 400, y: 50 },
    data: { 
      label: 'Customer Purchase Flow',
      status: NODE_STATUS.IN_PROGRESS,
      description: 'End-to-end workflow for customer checkout',
    },
  },
  {
    id: 'data-1',
    type: NODE_TYPES.DATA_INPUT,
    position: { x: 150, y: 250 },
    data: { 
      label: 'Checkout Screen',
      type: 'UI/Figma',
      status: NODE_STATUS.APPROVED,
      description: 'User interface for checkout process',
      figmaUrl: 'https://www.figma.com/file/...',
    },
  },
  {
    id: 'data-2',
    type: NODE_TYPES.DATA_INPUT,
    position: { x: 450, y: 250 },
    data: { 
      label: 'Payment API',
      type: 'API',
      status: NODE_STATUS.IN_PROGRESS,
      description: 'Payment processing endpoint',
      endpoint: 'POST /api/payments',
    },
  },
];

export const initialEdges = [
  // When using CustomHandle with explicit IDs, edges ideally specify handles.
  // However, React Flow handles "loose" connections well if IDs are omitted.
  // To be safe with our new dual-handle system:
  {
    id: 'e-workflow-1-data-1',
    source: 'workflow-1',
    target: 'data-1',
    sourceHandle: 'b-source', // Explicitly connect Bottom Source
    targetHandle: 't-target', // To Top Target
    type: 'custom',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-workflow-1-data-2',
    source: 'workflow-1',
    target: 'data-2',
    sourceHandle: 'b-source',
    targetHandle: 't-target',
    type: 'custom',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];