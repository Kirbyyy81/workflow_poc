// src/App.jsx
import React, { useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Component Imports
import WorkflowNode from "@/components/nodes/WorkflowNode";
import DataInputNode from "@/components/nodes/DataInputNode";
import BaseNode from "@/components/nodes/BaseNode";
import CustomEdge from "@/components/nodes/CustomEdge";
import { Button } from "@/components/ui/button";

// Integration Imports
import { useFirestore } from "@/hooks/useFirestore";

const initialNodes = [
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

const initialEdges = [
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

export default function App() {
  // 1. INTEGRATION: Use the Firestore hook instead of local state
  const { 
    nodes, 
    edges, 
    setNodes, 
    setEdges, 
    saveWorkflow, 
    isLoading 
  } = useFirestore(initialNodes, initialEdges);

  const nodeTypes = { 
    workflowNode: WorkflowNode,
    dataInputNode: DataInputNode,
    baseNode : BaseNode
  };

  const edgeTypes = {
    custom: CustomEdge,
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: 'custom',
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges],
  );

  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges]);

  const addChildNode = useCallback((parentId) => {
    const parentNode = nodes.find((n) => n.id === parentId);
    if (!parentNode) return;

    // 2. INTEGRATION: Use UUIDs instead of counters to avoid DB collisions
    const uniqueId = crypto.randomUUID().slice(0, 8);
    const newNodeId = `data-${uniqueId}`;
    
    // Calculate position below the parent
    const newNode = {
      id: newNodeId,
      type: 'dataInputNode',
      position: {
        x: parentNode.position.x,
        y: parentNode.position.y + 200,
      },
      data: {
        label: `New Task`,
        type: 'Data',
        status: 'Pending',
        description: 'New task node',
        onDelete: deleteNode,
        onAddChild: addChildNode,
        onAddSibling: addSiblingNode,
      },
    };

    setNodes((nds) => [...nds, newNode]);
    
    // Create edge from parent to new child
    setEdges((eds) => [
      ...eds,
      {
        id: `e-${parentId}-${newNodeId}`,
        source: parentId,
        target: newNodeId,
        type: 'custom',
        markerEnd: { type: MarkerType.ArrowClosed },
      },
    ]);
  }, [nodes, deleteNode]); // Removed nodeIdCounter dependency

  const addSiblingNode = useCallback((siblingId) => {
    const siblingNode = nodes.find((n) => n.id === siblingId);
    if (!siblingNode) return;

    // Find parent of the sibling
    const parentEdge = edges.find((e) => e.target === siblingId);
    if (!parentEdge) return;

    // 2. INTEGRATION: Use UUIDs
    const uniqueId = crypto.randomUUID().slice(0, 8);
    const newNodeId = siblingNode.type === 'workflowNode' 
      ? `workflow-${uniqueId}` 
      : `data-${uniqueId}`;
    
    // Calculate position to the right of sibling
    const newNode = {
      id: newNodeId,
      type: siblingNode.type,
      position: {
        x: siblingNode.position.x + 300,
        y: siblingNode.position.y,
      },
      data: {
        label: siblingNode.type === 'workflowNode' ? `New Workflow` : `New Task`,
        type: siblingNode.type === 'workflowNode' ? 'Workflow' : 'Data',
        status: 'Pending',
        description: 'New sibling node',
        onDelete: deleteNode,
        onAddChild: addChildNode,
        onAddSibling: addSiblingNode,
      },
    };

    setNodes((nds) => [...nds, newNode]);
    
    // Connect parent to new sibling
    setEdges((eds) => [
      ...eds,
      {
        id: `e-${parentEdge.source}-${newNodeId}`,
        source: parentEdge.source,
        target: newNodeId,
        type: 'custom',
        markerEnd: { type: MarkerType.ArrowClosed },
      },
    ]);
  }, [nodes, edges, deleteNode, addChildNode]); // Removed nodeIdCounter dependency

  // Add callbacks to all nodes
  const nodesWithCallbacks = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onDelete: deleteNode,
      onAddChild: addChildNode,
      onAddSibling: addSiblingNode,
    },
  }));

  // 3. INTEGRATION: Loading State UI
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-600"></div>
          <p className="text-slate-500 font-medium">Loading Workflow...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen flex-col">
      {/* 4. INTEGRATION: Top Toolbar for Saving */}
      <div className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm z-10">
        <div>
          <h1 className="text-lg font-bold text-slate-800">Workflow POC</h1>
          <p className="text-xs text-slate-500">Firestore Connected</p>
        </div>
        <Button 
          onClick={() => saveWorkflow(nodes, edges)}
          className="bg-slate-900 text-white hover:bg-slate-800"
        >
          Save Changes
        </Button>
      </div>

      <div className="flex-1 w-full h-full">
        <ReactFlow
          nodes={nodesWithCallbacks}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950"
        >
          <Background 
            color="#cbd5e1" 
            gap={20} 
            size={1}
            variant="dots"
          />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}