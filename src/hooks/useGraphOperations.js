// src/hooks/useGraphOperations.js
import { useCallback } from 'react';
import { MarkerType, Position } from '@xyflow/react';
import { NODE_TYPES, NODE_STATUS, LAYOUT } from '@/lib/constants';

export function useGraphOperations(nodes, setNodes, edges, setEdges) {
  
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

  // --- NEW: Update Data Logic ---
  const updateNodeData = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, ...newData },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  // --- 2. Interactive Handle Logic ---

  const addNodeFromHandle = useCallback((sourceId, handleType, position) => {
    const sourceNode = nodes.find((n) => n.id === sourceId);
    if (!sourceNode) return;

    const isSourceHandle = handleType === 'source';
    const newNodeId = generateId(isSourceHandle ? 'child' : 'parent');
    
    let dx = 0, dy = 0;
    let sourceHandleId = '';
    let targetHandleId = '';

    switch (position) {
      case Position.Right: 
        dx = LAYOUT.SIBLING_GAP; 
        sourceHandleId = 'r-source'; 
        targetHandleId = 'l-target';
        break;
      case Position.Left: 
        dx = -LAYOUT.SIBLING_GAP; 
        sourceHandleId = 'r-source';
        targetHandleId = 'l-target';
        break;
      case Position.Bottom: 
        dy = LAYOUT.CHILD_GAP; 
        sourceHandleId = 'b-source';
        targetHandleId = 't-target';
        break;
      case Position.Top: 
        dy = -LAYOUT.CHILD_GAP; 
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
      type: NODE_TYPES.DATA_INPUT,
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

    let edgeSource, edgeTarget, edgeSourceHandle, edgeTargetHandle;

    if (isSourceHandle) {
      edgeSource = sourceId;
      edgeTarget = newNodeId;
      edgeSourceHandle = sourceHandleId; 
      edgeTargetHandle = targetHandleId;
    } else {
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

  // Backward compatibility stubs
  const addChildNode = useCallback(() => {}, []);
  const addSiblingNode = useCallback(() => {}, []);

  return {
    deleteNode,
    addNewNode,
    updateNodeData, // <--- Exported here
    addChildNode,
    addSiblingNode,
    addNodeFromHandle
  };
}