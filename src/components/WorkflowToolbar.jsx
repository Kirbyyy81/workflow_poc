// src/components/WorkflowToolbar.jsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";

export default function WorkflowToolbar({ onAddNode, onSave, isSaving }) {
  return (
    <div className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm z-10 relative">
      <div>
        <h1 className="text-lg font-bold text-slate-800">Workflow POC</h1>
        <p className="text-xs text-slate-500">Firestore Connected</p>
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={onAddNode}
          variant="outline"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Node
        </Button>

        <Button 
          onClick={onSave}
          className="bg-slate-900 text-white hover:bg-slate-800 gap-2"
          disabled={isSaving}
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}