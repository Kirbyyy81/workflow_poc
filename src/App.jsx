// src/App.jsx
import React from "react";
import FlowNode from "@/components/nodes/FlowNode";
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
    id: 'n1',
    data: { 
      label: 'Customer Purchase Flow',
      type: 'Workflow',
      status: 'In Progress',
      description: 'Main workflow for customer checkout process',
    },
    position: { x: 250, y: 50 },
    type: 'node',
  },
  {
    id: 'n2',
    data: { 
      label: 'Checkout Screen',
      type: 'UI/Figma',
      status: 'Approved',
      description: 'User interface for checkout',
    },
    position: { x: 100, y: 200 },
    type: 'node',
  },
  {
    id: 'n3',
    data: { 
      label: 'Payment Endpoint',
      type: 'API',
      status: 'In Progress',
      description: 'POST /api/payments',
    },
    position: { x: 400, y: 200 },
    type: 'node',
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: 'n1',
    target: 'n2',
    type: 'custom',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e1-3',
    source: 'n1',
    target: 'n3',
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
    node: FlowNode,
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

  const addSubnode = useCallback((edgeId) => {
    const edge = edges.find((e) => e.id === edgeId);
    if (!edge) return;

    const sourceNode = nodes.find((n) => n.id === edge.source);
    const targetNode = nodes.find((n) => n.id === edge.target);
    
    if (!sourceNode || !targetNode) return;

    const newNodeId = `n${nodeIdCounter}`;
    const newNode = {
      id: newNodeId,
      type: 'node',
      position: {
        x: (sourceNode.position.x + targetNode.position.x) / 2,
        y: (sourceNode.position.y + targetNode.position.y) / 2,
      },
      data: {
        label: `New Node ${nodeIdCounter}`,
        type: 'Task',
        status: 'Pending',
        description: 'New task node',
        onDelete: deleteNode,
      },
    };

    setNodeIdCounter(nodeIdCounter + 1);
    setNodes((nds) => [...nds, newNode]);
    
    // Remove old edge and create two new edges
    setEdges((eds) => {
      const filtered = eds.filter((e) => e.id !== edgeId);
      return [
        ...filtered,
        {
          id: `e${edge.source}-${newNodeId}`,
          source: edge.source,
          target: newNodeId,
          type: 'custom',
          markerEnd: { type: MarkerType.ArrowClosed },
        },
        {
          id: `e${newNodeId}-${edge.target}`,
          source: newNodeId,
          target: edge.target,
          type: 'custom',
          markerEnd: { type: MarkerType.ArrowClosed },
        },
      ];
    });
  }, [edges, nodes, nodeIdCounter, deleteNode]);

  const addSibling = useCallback((edgeId) => {
    const edge = edges.find((e) => e.id === edgeId);
    if (!edge) return;

    const targetNode = nodes.find((n) => n.id === edge.target);
    if (!targetNode) return;

    const newNodeId = `n${nodeIdCounter}`;
    const newNode = {
      id: newNodeId,
      type: 'node',
      position: {
        x: targetNode.position.x + 200,
        y: targetNode.position.y,
      },
      data: {
        label: `Sibling Node ${nodeIdCounter}`,
        type: 'Task',
        status: 'Pending',
        description: 'New sibling node',
        onDelete: deleteNode,
      },
    };

    setNodeIdCounter(nodeIdCounter + 1);
    setNodes((nds) => [...nds, newNode]);
    
    // Connect the source to the new sibling
    setEdges((eds) => [
      ...eds,
      {
        id: `e${edge.source}-${newNodeId}`,
        source: edge.source,
        target: newNodeId,
        type: 'custom',
        markerEnd: { type: MarkerType.ArrowClosed },
      },
    ]);
  }, [edges, nodes, nodeIdCounter, deleteNode]);

  const removeEdge = useCallback((edgeId) => {
    setEdges((eds) => eds.filter((e) => e.id !== edgeId));
  }, []);

  // Add edge data with callbacks
  const edgesWithData = edges.map((edge) => ({
    ...edge,
    data: {
      onAddSubnode: addSubnode,
      onAddSibling: addSibling,
      onRemove: removeEdge,
    },
  }));

  // Add delete callback to all nodes
  const nodesWithDelete = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onDelete: deleteNode,
    },
  }));

  return (
    <div className="flex h-screen w-screen">
      <ReactFlow
        nodes={nodesWithDelete}
        edges={edgesWithData}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        className="bg-gray-50"
      >
        <Background color="#aaa" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}