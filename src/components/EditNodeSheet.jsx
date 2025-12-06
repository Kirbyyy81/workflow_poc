// src/components/EditNodeSheet.jsx
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NODE_STATUS } from "@/lib/constants";

export default function EditNodeSheet({ isOpen, onClose, node, onSave }) {
  const [formData, setFormData] = useState({
    label: "",
    description: "",
    status: "",
    figmaUrl: "",
    endpoint: ""
  });

  // Load node data when opened or node changes
  useEffect(() => {
    if (node) {
      setFormData({
        label: node.data.label || "",
        description: node.data.description || "",
        status: node.data.status || NODE_STATUS.PENDING,
        figmaUrl: node.data.figmaUrl || "",
        endpoint: node.data.endpoint || "",
      });
    }
  }, [node]);

  // If closed, render nothing so it doesn't take up layout space
  if (!isOpen || !node) return null;

  // Optional: Auto-save on change to make it "Live"
  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    // Uncomment the line below if you want "Real-Time" updates as you type
    // onSave(node.id, newData); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(node.id, formData);
    // We don't close automatically anymore, allowing the user to keep editing
  };

  return (
    <div className="h-full w-[400px] border-l border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-xl flex flex-col z-20 shrink-0 transition-all duration-300 ease-in-out">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Properties</h2>
          <p className="text-xs text-slate-500">Selected: {node.id}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        
        {/* Label Input */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase">
            Title
          </label>
          <input
            type="text"
            value={formData.label}
            onChange={(e) => handleChange('label', e.target.value)}
            className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        {/* Status Dropdown */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            {Object.values(NODE_STATUS).map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Description Textarea */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
          />
        </div>

        <div className="my-2 h-px bg-slate-100"></div>

        {/* Figma URL */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase">
            Figma Embed Link
          </label>
          <input
            type="text"
            value={formData.figmaUrl}
            onChange={(e) => handleChange('figmaUrl', e.target.value)}
            className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            placeholder="https://..."
          />
        </div>

        {/* Endpoint */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase">
            API Endpoint
          </label>
          <input
            type="text"
            value={formData.endpoint}
            onChange={(e) => handleChange('endpoint', e.target.value)}
            className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm font-mono shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

      </form>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-100 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-2">
        <Button onClick={handleSubmit} size="sm" className="bg-slate-900 text-white w-full">
          Apply Changes
        </Button>
      </div>
    </div>
  );
}