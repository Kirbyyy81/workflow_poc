// src/components/EditNodeSheet.jsx
import React, { useEffect, useState } from "react";
import { X, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NODE_STATUS, NODE_TYPES } from "@/lib/constants";
import { isValidFigmaUrl, extractFileName } from "@/services/figma/figmaService";
import FigmaPreview from "@/components/figma/FigmaPreview";

export default function EditNodeSheet({ isOpen, onClose, node, onSave }) {
  const [formData, setFormData] = useState({
    label: "",
    description: "",
    status: "",
    nodeType: "",
    figmaUrl: "",
    endpoint: "",
    method: "GET",
    flowType: "start",
    condition: ""
  });

  const [figmaValidation, setFigmaValidation] = useState({ isValid: false, message: '' });

  // Load node data when opened or node changes
  useEffect(() => {
    if (node) {
      setFormData({
        label: node.data.label || "",
        description: node.data.description || "",
        status: node.data.status || NODE_STATUS.PENDING,
        nodeType: node.type || NODE_TYPES.WORKFLOW,
        figmaUrl: node.data.figmaUrl || "",
        endpoint: node.data.endpoint || "",
        method: node.data.method || "GET",
        flowType: node.data.flowType || "start",
        condition: node.data.condition || "",
      });
    }
  }, [node]);

  // Validate Figma URL when it changes
  useEffect(() => {
    if (formData.figmaUrl) {
      const isValid = isValidFigmaUrl(formData.figmaUrl);
      setFigmaValidation({
        isValid,
        message: isValid
          ? `Valid Figma ${extractFileName(formData.figmaUrl)}`
          : 'Invalid Figma URL format'
      });
    } else {
      setFigmaValidation({ isValid: false, message: '' });
    }
  }, [formData.figmaUrl]);

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
    // If node type changed, we need to update both type and data
    if (formData.nodeType !== node.type) {
      onSave(node.id, formData, formData.nodeType);
    } else {
      onSave(node.id, formData);
    }
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

        {/* Node Type Dropdown */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase">
            Node Type
          </label>
          <select
            value={formData.nodeType}
            onChange={(e) => handleChange('nodeType', e.target.value)}
            className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value={NODE_TYPES.WORKFLOW}>Workflow (Parent)</option>
            <option value={NODE_TYPES.UI}>UI Component</option>
            <option value={NODE_TYPES.API}>API Endpoint</option>
            <option value={NODE_TYPES.DATA_INPUT}>Data Input</option>
            <option value={NODE_TYPES.FLOW}>Flow (Start/End)</option>
            <option value={NODE_TYPES.CONDITION}>Condition (Branching)</option>
          </select>
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

        {/* Type-Specific Fields */}

        {/* Figma URL - Show for UI and Data Input nodes */}
        {(formData.nodeType === NODE_TYPES.UI || formData.nodeType === NODE_TYPES.DATA_INPUT) && (
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 uppercase">
              Figma Embed Link
            </label>
            <input
              type="text"
              value={formData.figmaUrl}
              onChange={(e) => handleChange('figmaUrl', e.target.value)}
              className={`flex h-9 w-full rounded-md border ${formData.figmaUrl && !figmaValidation.isValid
                  ? 'border-red-300 focus:ring-red-400'
                  : 'border-slate-200 focus:ring-slate-400'
                } bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2`}
              placeholder="https://www.figma.com/file/..."
            />

            {/* Validation Message */}
            {formData.figmaUrl && (
              <div className={`flex items-center gap-2 text-xs ${figmaValidation.isValid ? 'text-green-600' : 'text-red-600'
                }`}>
                {figmaValidation.isValid ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : (
                  <AlertCircle className="h-3 w-3" />
                )}
                <span>{figmaValidation.message}</span>
              </div>
            )}

            {/* Helper Text */}
            <p className="text-xs text-slate-500">
              Paste a Figma file or prototype URL
            </p>

            {/* Live Preview */}
            {formData.figmaUrl && figmaValidation.isValid && (
              <div className="mt-3 p-3 bg-slate-50 rounded-md border border-slate-200">
                <p className="text-xs font-medium text-slate-700 mb-2">Preview:</p>
                <FigmaPreview url={formData.figmaUrl} />
              </div>
            )}

            {/* Test Embed Button */}
            {formData.figmaUrl && figmaValidation.isValid && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full gap-2"
                asChild
              >
                <a
                  href={formData.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3 w-3" />
                  Open in Figma
                </a>
              </Button>
            )}
          </div>
        )}

        {/* API Endpoint - Show for API nodes */}
        {formData.nodeType === NODE_TYPES.API && (
          <>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">
                HTTP Method
              </label>
              <select
                value={formData.method}
                onChange={(e) => handleChange('method', e.target.value)}
                className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 uppercase">
                API Endpoint
              </label>
              <input
                type="text"
                value={formData.endpoint}
                onChange={(e) => handleChange('endpoint', e.target.value)}
                className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm font-mono shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                placeholder="/api/endpoint"
              />
            </div>
          </>
        )}

        {/* Flow Type - Show for Flow nodes */}
        {formData.nodeType === NODE_TYPES.FLOW && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 uppercase">
              Flow Type
            </label>
            <select
              value={formData.flowType}
              onChange={(e) => handleChange('flowType', e.target.value)}
              className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <option value="start">Start</option>
              <option value="end">End</option>
              <option value="error">Error</option>
            </select>
          </div>
        )}

        {/* Condition - Show for Condition nodes */}
        {formData.nodeType === NODE_TYPES.CONDITION && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 uppercase">
              Condition Expression
            </label>
            <input
              type="text"
              value={formData.condition}
              onChange={(e) => handleChange('condition', e.target.value)}
              className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm font-mono shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="e.g., status === 'active'"
            />
          </div>
        )}

        {/* Endpoint - Show for Data Input nodes */}
        {formData.nodeType === NODE_TYPES.DATA_INPUT && (
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 uppercase">
              Data Source
            </label>
            <input
              type="text"
              value={formData.endpoint}
              onChange={(e) => handleChange('endpoint', e.target.value)}
              className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm font-mono shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="Database query or data source"
            />
          </div>
        )}

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