// src/hooks/useGraphOperations.js
import { useCallback } from 'react';
import { MarkerType } from '@xyflow/react';

export function useGraphOperations(nodes, setNodes, edges, setEdges) {
  
  // Helper to generate IDs
  const generateId = (prefix = 'node') => `${prefix}-${crypto.randomUUID().slice(0, 8)}`;

  // --- Actions ---

  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges]);

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

  const addChildNode = useCallback((parentId) => {
    const parentNode = nodes.find((n) => n.id === parentId);
    if (!parentNode) return;

    const newNodeId = generateId('data');
    
    // Logic: Place 200px below parent
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
    
    // Create Edge
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
    
    // Logic: Place 300px to the right
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

  return {
    deleteNode,
    addNewNode,
    addChildNode,
    addSiblingNode
  };
}