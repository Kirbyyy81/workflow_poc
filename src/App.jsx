// src/App.jsx
import React, { useCallback, useMemo } from "react";
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
import BaseNode from "@/components/nodes/BaseNode";
import CustomEdge from "@/components/nodes/CustomEdge";
import WorkflowToolbar from "@/components/WorkflowToolbar";

// Logic & Data
import { useFirestore } from "@/hooks/useFirestore";
import { useGraphOperations } from "@/hooks/useGraphOperations";
import { initialNodes, initialEdges } from "@/data/initialNodes";

// Define outside component to avoid re-creation on render
const nodeTypes = { 
  workflowNode: WorkflowNode,
  dataInputNode: DataInputNode,
  baseNode: BaseNode
};

const edgeTypes = {
  custom: CustomEdge,
};

export default function App() {
  // 1. Data Layer (Firestore)
  const { 
    nodes, edges, setNodes, setEdges, saveWorkflow, isLoading 
  } = useFirestore(initialNodes, initialEdges);

  // 2. Logic Layer (Graph Ops)
  const { 
    addNewNode, deleteNode, addChildNode, addSiblingNode 
  } = useGraphOperations(nodes, setNodes, edges, setEdges);

  // 3. View Layer Helpers
  // Inject callbacks into nodes for the UI to use
  const nodesWithCallbacks = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onDelete: deleteNode,
        onAddChild: addChildNode,
        onAddSibling: addSiblingNode,
      },
    }));
  }, [nodes, deleteNode, addChildNode, addSiblingNode]);

  // React Flow Standard Handlers
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

  // Loading State
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
      <WorkflowToolbar 
        onAddNode={addNewNode}
        onSave={() => saveWorkflow(nodes, edges)}
      />

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
          <Background color="#cbd5e1" gap={20} size={1} variant="dots" />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}