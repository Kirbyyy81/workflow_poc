// src/hooks/useFirestore.js
import { useState, useEffect, useCallback } from 'react';
import { db } from '@/services/storage/firebaseService';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

// Hardcoding a single document ID for this POC
const WORKFLOW_ID = 'demo-workflow-001';

export function useFirestore(initialNodes, initialEdges) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Real-time Subscription (Read)
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "workflows", WORKFLOW_ID), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        // Only update if data is different to avoid infinite loops
        // (In a real app, you'd check timestamps or user IDs)
        setNodes(data.nodes || []);
        setEdges(data.edges || []);
      }
      setIsLoading(false);
    });

    return () => unsub();
  }, []);

  // 2. Save Function (Write)
  // Call this whenever you want to persist the state
  const saveWorkflow = useCallback(async (currentNodes, currentEdges) => {
    try {
      await setDoc(doc(db, "workflows", WORKFLOW_ID), {
        nodes: currentNodes,
        edges: currentEdges,
        lastUpdated: new Date()
      });
      console.log("Saved to Firestore!");
    } catch (error) {
      console.error("Error saving workflow:", error);
    }
  }, []);

  return { nodes, edges, setNodes, setEdges, saveWorkflow, isLoading };
}