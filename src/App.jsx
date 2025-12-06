// src/App.jsx
import React from "react";
import WorkflowNode from "@/components/nodes/WorkflowNode";
import DataInputNode from "@/components/nodes/DataInputNode";
import BaseNode from "@/components/nodes/BaseNode";
import CustomEdge from "@/components/nodes/CustomEdge";
import { useState, useCallback } from 'react';
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
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e-workflow-1-data-2',
    source: 'workflow-1',
    target: 'data-2',
    type: 'custom',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e-workflow-1-data-3',
    source: 'workflow-1',
    target: 'data-3',
    type: 'custom',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [nodeIdCounter, setNodeIdCounter] = useState(4);

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
    [],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
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
    [],
  );

  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, []);

  const addChildNode = useCallback((parentId) => {
    const parentNode = nodes.find((n) => n.id === parentId);
    if (!parentNode) return;

    const newNodeId = `data-${nodeIdCounter}`;
    const isWorkflowParent = parentNode.type === 'workflowNode';
    
    // Calculate position below the parent
    const newNode = {
      id: newNodeId,
      type: 'dataInputNode',
      position: {
        x: parentNode.position.x,
        y: parentNode.position.y + 200,
      },
      data: {
        label: `New Task ${nodeIdCounter}`,
        type: 'Data',
        status: 'Pending',
        description: 'New task node',
        onDelete: deleteNode,
        onAddChild: addChildNode,
        onAddSibling: addSiblingNode,
      },
    };

    setNodeIdCounter(nodeIdCounter + 1);
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
  }, [nodes, nodeIdCounter, deleteNode]);

  const addSiblingNode = useCallback((siblingId) => {
    const siblingNode = nodes.find((n) => n.id === siblingId);
    if (!siblingNode) return;

    // Find parent of the sibling
    const parentEdge = edges.find((e) => e.target === siblingId);
    if (!parentEdge) return;

    const newNodeId = siblingNode.type === 'workflowNode' ? `workflow-${nodeIdCounter}` : `data-${nodeIdCounter}`;
    
    // Calculate position to the right of sibling
    const newNode = {
      id: newNodeId,
      type: siblingNode.type,
      position: {
        x: siblingNode.position.x + 300,
        y: siblingNode.position.y,
      },
      data: {
        label: siblingNode.type === 'workflowNode' ? `New Workflow ${nodeIdCounter}` : `New Task ${nodeIdCounter}`,
        type: siblingNode.type === 'workflowNode' ? 'Workflow' : 'Data',
        status: 'Pending',
        description: 'New sibling node',
        onDelete: deleteNode,
        onAddChild: addChildNode,
        onAddSibling: addSiblingNode,
      },
    };

    setNodeIdCounter(nodeIdCounter + 1);
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
  }, [nodes, edges, nodeIdCounter, deleteNode, addChildNode]);

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

  return (
    <div className="flex h-screen w-screen">
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
  );
}
