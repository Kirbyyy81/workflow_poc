import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Edit, ExternalLink, Trash2, Plus, GitBranch } from "lucide-react";

export default function WorkflowNode({ data, id }) {
  const [isHovered, setIsHovered] = useState(false);
  const {
    label = "Workflow",
    status = "In Progress",
    description,
    children,
    onDelete,
    onAddChild,
    onAddSibling,
  } = data;

  const handleNotify = () => {
    console.log(`Notify for workflow ${id}`);
  };

  const handleEdit = () => {
    console.log(`Edit workflow ${id}`);
  };

  const handleOpen = () => {
    console.log(`Open external link for workflow ${id}`);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleAddChild = (e) => {
    e.stopPropagation();
    if (onAddChild) {
      onAddChild(id);
    }
  };

  const handleAddSibling = (e) => {
    e.stopPropagation();
    if (onAddSibling) {
      onAddSibling(id);
    }
  };

  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
        return 'default';
      case 'in progress':
        return 'secondary';
      case 'in review':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-purple-500 !w-3 !h-3 !border-2 !border-white"
      />

      <Card className="w-80 rounded-3xl shadow-lg hover:shadow-xl transition-all border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-slate-900">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <GitBranch className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight text-purple-900 dark:text-purple-100">
                  {label}
                </h3>
                <Badge variant="outline" className="mt-1 text-xs border-purple-300">
                  Workflow
                </Badge>
              </div>
            </div>
          </div>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
              {description}
            </p>
          )}
        </CardHeader>

        {children && <CardContent className="py-2">{children}</CardContent>}

        <CardFooter className="flex justify-between items-center pt-3 border-t border-purple-100">
          <Badge variant={getStatusColor()} className="capitalize text-xs font-semibold">
            {status}
          </Badge>
          <div className="flex gap-1">
            <Button size="icon-sm" variant="ghost" onClick={handleNotify}>
              <Bell className="h-3.5 w-3.5" />
            </Button>
            <Button size="icon-sm" variant="ghost" onClick={handleEdit}>
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button size="icon-sm" variant="ghost" onClick={handleOpen}>
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
            <Button 
              size="icon-sm" 
              variant="ghost" 
              onClick={handleDelete}
              className="hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Hover Actions - Floating buttons around the node */}
      {isHovered && (
        <>
          {/* Add Child Node - Bottom */}
          <div 
            className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 z-10"
          >
            <Button
              size="icon"
              variant="default"
              onClick={handleAddChild}
              className="rounded-full shadow-lg bg-purple-600 hover:bg-purple-700 h-10 w-10"
              title="Add Child Node"
            >
              <Plus className="h-5 w-5" />
            </Button>
            <p className="text-xs text-center mt-1 text-gray-600 dark:text-gray-400 whitespace-nowrap">
              Add Child
            </p>
          </div>

          {/* Add Sibling Node - Right */}
          <div 
            className="absolute -right-16 top-1/2 transform -translate-y-1/2 z-10"
          >
            <Button
              size="icon"
              variant="outline"
              onClick={handleAddSibling}
              className="rounded-full shadow-lg h-10 w-10 border-2 border-purple-300"
              title="Add Sibling Node"
            >
              <Plus className="h-5 w-5 rotate-90" />
            </Button>
            <p className="text-xs text-center mt-1 text-gray-600 dark:text-gray-400 whitespace-nowrap">
              Add Sibling
            </p>
          </div>
        </>
      )}

      {/* Bottom Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-purple-500 !w-3 !h-3 !border-2 !border-white"
      />

      {/* Left Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!bg-pink-500 !w-3 !h-3 !border-2 !border-white"
      />

      {/* Right Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!bg-pink-500 !w-3 !h-3 !border-2 !border-white"
      />
    </div>
  );
}
