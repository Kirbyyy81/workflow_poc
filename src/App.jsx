// src/App.jsx
import React, { useCallback, useMemo, useState } from "react";
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

// Components
import WorkflowNode from "@/components/nodes/WorkflowNode";
import DataInputNode from "@/components/nodes/DataInputNode";
import UiNode from "@/components/nodes/UiNode";
import ApiNode from "@/components/nodes/ApiNode";
import FlowNode from "@/components/nodes/FlowNode";
import ConditionNode from "@/components/nodes/ConditionNode";
import BaseNode from "@/components/nodes/BaseNode";
import CustomEdge from "@/components/nodes/CustomEdge";
import WorkflowToolbar from "@/components/WorkflowToolbar";
import EditNodeSheet from "@/components/EditNodeSheet";

// Logic & Data
import { useFirestore } from "@/hooks/useFirestore";
import { useGraphOperations } from "@/hooks/useGraphOperations";
import { initialNodes, initialEdges } from "@/data/initialNodes";
import { NODE_TYPES } from "@/lib/constants";

const nodeTypes = {
  [NODE_TYPES.WORKFLOW]: WorkflowNode,
  [NODE_TYPES.DATA_INPUT]: DataInputNode,
  [NODE_TYPES.UI]: UiNode,
  [NODE_TYPES.API]: ApiNode,
  [NODE_TYPES.FLOW]: FlowNode,
  [NODE_TYPES.CONDITION]: ConditionNode,
  [NODE_TYPES.BASE]: BaseNode
};

const edgeTypes = {
  custom: CustomEdge,
};

export default function App() {
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingNodeId, setEditingNodeId] = useState(null);

  // 1. Data Layer
  const {
    nodes, edges, setNodes, setEdges, saveWorkflow, isLoading
  } = useFirestore(initialNodes, initialEdges);

  // 2. Logic Layer
  const {
    addNewNode, deleteNode, addNodeFromHandle, updateNodeData
  } = useGraphOperations(nodes, setNodes, edges, setEdges);

  // Handlers
  const handleEditNode = useCallback((nodeId) => {
    setEditingNodeId(nodeId);
    setIsEditSheetOpen(true);
  }, []);

  // Save node changes from the EditNodeSheet
  const handleSaveNode = useCallback((nodeId, updatedData, newType) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          // If type is changing, update both type and data
          if (newType && newType !== node.type) {
            return {
              ...node,
              type: newType,
              data: {
                ...node.data,
                ...updatedData,
              },
            };
          }
          // Otherwise just update data
          return {
            ...node,
            data: {
              ...node.data,
              ...updatedData,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  // 3. View Layer Helpers
  const nodesWithCallbacks = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onDelete: deleteNode,
        onAddFromHandle: addNodeFromHandle,
        onEdit: handleEditNode,
      },
    }));
  }, [nodes, deleteNode, addNodeFromHandle, handleEditNode]);

  // React Flow Handlers
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: 'custom',
        markerEnd: { type: MarkerType.ArrowClosed },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const editingNode = nodes.find(n => n.id === editingNodeId);

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
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      {/* 1. Top Toolbar */}
      <WorkflowToolbar
        onAddNode={addNewNode}
        onSave={() => saveWorkflow(nodes, edges)}
      />

      {/* 2. Main Layout: Flex Row to put Canvas and Sidebar side-by-side */}
      <div className="flex-1 flex flex-row h-[calc(100vh-64px)] w-full">

        {/* Canvas Area - Grows to fill available space */}
        <div className="flex-1 relative h-full min-w-0 bg-slate-50">
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
            <Background color="#cbd5e1" gap={20} size={1} variant="dots" />
            <Controls />
          </ReactFlow>
        </div>

        {/* Sidebar Area - Sits to the right, pushes canvas when open */}
        <EditNodeSheet
          isOpen={isEditSheetOpen}
          onClose={() => setIsEditSheetOpen(false)}
          node={editingNode}
          onSave={handleSaveNode}
        />

      </div>
    </div>
  );
}