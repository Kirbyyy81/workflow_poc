// src/hooks/useGraphOperations.js
import { useCallback } from 'react';
import { MarkerType, Position } from '@xyflow/react';
import { NODE_TYPES, NODE_STATUS, LAYOUT } from '@/lib/constants';

export function useGraphOperations(nodes, setNodes, edges, setEdges) {
  
  // Helper: Generate short unique IDs
  const generateId = (prefix = 'node') => `${prefix}-${crypto.randomUUID().slice(0, 8)}`;

  // --- 1. Basic Actions ---

  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges]);

  const addNewNode = useCallback(() => {
    const newNodeId = generateId('workflow');
    const newNode = {
      id: newNodeId,
      type: NODE_TYPES.WORKFLOW,
      position: { 
        x: 100 + Math.random() * 50, 
        y: 100 + Math.random() * 50 
      },
      data: {
        label: 'New Workflow',
        type: 'Workflow',
        status: NODE_STATUS.PENDING,
        description: 'Newly created workflow node',
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  // --- 2. Interactive Handle Logic ---

  const addNodeFromHandle = useCallback((sourceId, handleType, position) => {
    const sourceNode = nodes.find((n) => n.id === sourceId);
    if (!sourceNode) return;

    // Determine if we are adding a 'Child' (next step) or 'Parent' (previous step)
    const isSourceHandle = handleType === 'source';
    const newNodeId = generateId(isSourceHandle ? 'child' : 'parent');
    
    // Calculate Position based on handle location
    let dx = 0, dy = 0;
    
    // Explicitly define which handles to connect
    // Format: "handleID-type" (e.g., 'r-source', 'l-target')
    let sourceHandleId = '';
    let targetHandleId = '';

    switch (position) {
      case Position.Right: 
        dx = LAYOUT.SIBLING_GAP; 
        // Connect Source(Right) -> Target(Left)
        sourceHandleId = 'r-source'; 
        targetHandleId = 'l-target';
        break;
      case Position.Left: 
        dx = -LAYOUT.SIBLING_GAP; 
        // Connect New(Right) -> Source(Left) OR Source(Left) -> New(Right) logic
        // If we clicked Left Handle (Target), we are adding a PARENT.
        // So Parent(Right) -> Current(Left)
        sourceHandleId = 'r-source';
        targetHandleId = 'l-target';
        break;
      case Position.Bottom: 
        dy = LAYOUT.CHILD_GAP; 
        // Connect Source(Bottom) -> Target(Top)
        sourceHandleId = 'b-source';
        targetHandleId = 't-target';
        break;
      case Position.Top: 
        dy = -LAYOUT.CHILD_GAP; 
        // Connect Parent(Bottom) -> Current(Top)
        sourceHandleId = 'b-source';
        targetHandleId = 't-target';
        break;
      default: 
        dx = LAYOUT.SIBLING_GAP;
        sourceHandleId = 'r-source';
        targetHandleId = 'l-target';
    }

    const newNode = {
      id: newNodeId,
      type: NODE_TYPES.DATA_INPUT, // Default type
      position: {
        x: sourceNode.position.x + dx,
        y: sourceNode.position.y + dy,
      },
      data: {
        label: isSourceHandle ? 'Next Step' : 'Previous Step',
        type: 'Data',
        status: NODE_STATUS.PENDING,
        description: 'Automatically added step',
      },
    };

    setNodes((nds) => [...nds, newNode]);

    // Create the Edge
    // IMPORTANT: We must strictly map Source -> Target
    let edgeSource, edgeTarget, edgeSourceHandle, edgeTargetHandle;

    if (isSourceHandle) {
      // We clicked a SOURCE handle (Right/Bottom) -> Add Child
      // Edge goes: Current Node -> New Node
      edgeSource = sourceId;
      edgeTarget = newNodeId;
      edgeSourceHandle = sourceHandleId; 
      edgeTargetHandle = targetHandleId;
    } else {
      // We clicked a TARGET handle (Left/Top) -> Add Parent
      // Edge goes: New Node -> Current Node
      edgeSource = newNodeId;
      edgeTarget = sourceId;
      edgeSourceHandle = sourceHandleId;
      edgeTargetHandle = targetHandleId;
    }

    const newEdge = {
      id: `e-${edgeSource}-${edgeTarget}`,
      source: edgeSource,
      target: edgeTarget,
      sourceHandle: edgeSourceHandle,
      targetHandle: edgeTargetHandle,
      type: 'custom',
      markerEnd: { type: MarkerType.ArrowClosed },
    };

    setEdges((eds) => [...eds, newEdge]);
  }, [nodes, setNodes, setEdges]);

  // Keep these for backward compatibility if you still use the context menu
  const addChildNode = useCallback((parentId) => { /* ... simplified logic using constants ... */ }, []);
  const addSiblingNode = useCallback((siblingId) => { /* ... simplified logic ... */ }, []);

  return {
    deleteNode,
    addNewNode,
    addChildNode,
    addSiblingNode,
    addNodeFromHandle
  };
}