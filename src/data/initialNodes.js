// src/data/initialData.js
import { MarkerType } from '@xyflow/react';

export const initialNodes = [
  {
    id: 'workflow-1',
    data: { 
      label: 'Customer Purchase Flow',
      status: 'In Progress',
      description: 'End-to-end workflow for customer checkout and payment processing',
    },
    position: { x: 400, y: 50 },
    type: 'workflowNode',
  },
  {
    id: 'data-1',
    data: { 
      label: 'Checkout Screen',
      type: 'UI/Figma',
      status: 'Approved',
      description: 'User interface for checkout process',
      figmaUrl: 'https://www.figma.com/file/...',
    },
    position: { x: 150, y: 250 },
    type: 'dataInputNode',
  },
  {
    id: 'data-2',
    data: { 
      label: 'Payment API',
      type: 'API',
      status: 'In Progress',
      description: 'Payment processing endpoint',
      endpoint: 'POST /api/payments',
    },
    position: { x: 450, y: 250 },
    type: 'dataInputNode',
  },
  {
    id: 'data-3',
    data: { 
      label: 'Order Database',
      type: 'Data',
      status: 'Approved',
      description: 'Order data storage and retrieval',
      endpoint: 'MongoDB - orders collection',
    },
    position: { x: 700, y: 250 },
    type: 'dataInputNode',
  },
];

export const initialEdges = [
  {
    id: 'e-workflow-1-data-1',
    source: 'workflow-1',
    target: 'data-1',
    type: 'custom',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-workflow-1-data-2',
    source: 'workflow-1',
    target: 'data-2',
    type: 'custom',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: 'e-workflow-1-data-3',
    source: 'workflow-1',
    target: 'data-3',
    type: 'custom',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];