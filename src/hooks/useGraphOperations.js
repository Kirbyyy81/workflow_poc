// src/hooks/useGraphOperations.js
import { useCallback } from 'react';
import { MarkerType, Position } from '@xyflow/react';

export function useGraphOperations(nodes, setNodes, edges, setEdges) {
  
  // Helper: Generate short unique IDs
  const generateId = (prefix = 'node') => `${prefix}-${crypto.randomUUID().slice(0, 8)}`;

  // --- 1. Basic Actions ---

  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges]);

  // Adds a completely floating node (not connected to anything)
  const addNewNode = useCallback(() => {
    const newNodeId = generateId('workflow');
    const newNode = {
      id: newNodeId,
      type: 'workflowNode',
      position: { 
        x: 100 + Math.random() * 50, 
        y: 100 + Math.random() * 50 
      },
      data: {
        label: 'New Workflow',
        type: 'Workflow',
        status: 'Pending',
        description: 'Newly created workflow node',
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  // --- 2. Context Menu / Button Actions ---

  const addChildNode = useCallback((parentId) => {
    const parentNode = nodes.find((n) => n.id === parentId);
    if (!parentNode) return;

    const newNodeId = generateId('data');
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
      },
    };

    setNodes((nds) => [...nds, newNode]);
    
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
  }, [nodes, setNodes, setEdges]);

  const addSiblingNode = useCallback((siblingId) => {
    const siblingNode = nodes.find((n) => n.id === siblingId);
    if (!siblingNode) return;

    const parentEdge = edges.find((e) => e.target === siblingId);
    if (!parentEdge) return;

    const newNodeId = siblingNode.type === 'workflowNode' 
      ? generateId('workflow') 
      : generateId('data');
    
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
      },
    };

    setNodes((nds) => [...nds, newNode]);
    
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
  }, [nodes, edges, setNodes, setEdges]);

  // --- 3. Interactive Handle Logic ---

  const addNodeFromHandle = useCallback((sourceId, handleType, position) => {
    const sourceNode = nodes.find((n) => n.id === sourceId);
    if (!sourceNode) return;

    // Determine direction and connection logic
    const isSourceHandle = handleType === 'source';
    const newNodeId = generateId(isSourceHandle ? 'child' : 'parent');
    
    // Calculate Position based on handle location
    let dx = 0, dy = 0;
    const GAP_X = 350;
    const GAP_Y = 200;

    switch (position) {
      case Position.Right: dx = GAP_X; break;
      case Position.Left: dx = -GAP_X; break;
      case Position.Bottom: dy = GAP_Y; break;
      case Position.Top: dy = -GAP_Y; break;
      default: dx = GAP_X;
    }

    const newNode = {
      id: newNodeId,
      type: 'dataInputNode', // Default to generic task
      position: {
        x: sourceNode.position.x + dx,
        y: sourceNode.position.y + dy,
      },
      data: {
        label: isSourceHandle ? 'Next Step' : 'Previous Step',
        type: 'Data',
        status: 'Pending',
        description: 'Automatically added step',
      },
    };

    setNodes((nds) => [...nds, newNode]);

    // Create Edge:
    // If adding from 'source' handle -> Connect Source to New (Source -> Target)
    // If adding from 'target' handle -> Connect New to Source (Source -> Target)
    const newEdge = {
      id: `e-${isSourceHandle ? sourceId : newNodeId}-${isSourceHandle ? newNodeId : sourceId}`,
      source: isSourceHandle ? sourceId : newNodeId,
      target: isSourceHandle ? newNodeId : sourceId,
      type: 'custom',
      markerEnd: { type: MarkerType.ArrowClosed },
    };

    setEdges((eds) => [...eds, newEdge]);
  }, [nodes, setNodes, setEdges]);

  return {
    deleteNode,
    addNewNode,
    addChildNode,
    addSiblingNode,
    addNodeFromHandle
  };
}