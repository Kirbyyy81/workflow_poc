import React from 'react';
import { Bell, Edit, ExternalLink, Trash2, Box } from "lucide-react";
import BaseNode from './BaseNode';
import { Button } from "@/components/ui/button";

export default function FlowNode({ data, id, selected }) {
  const {
    label = "Node",
    type = "default",
    status = "Pending",
    description,
    children,
    onDelete,
  } = data;

  const handleNotify = (e) => {
    e.stopPropagation();
    console.log(`Notify for node ${id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    console.log(`Edit node ${id}`);
  };

  const handleOpen = (e) => {
    e.stopPropagation();
    console.log(`Open external link for node ${id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  const getStatus = () => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
        return 'active';
      case 'in progress':
        return 'processing';
      case 'error':
      case 'failed':
        return 'error';
      default:
        return 'idle';
    }
  };

  const footerContent = (
    <div className="flex justify-between items-center w-full">
      <span className="capitalize font-medium text-stone-500">{status}</span>
      <div className="flex gap-1">
        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={handleNotify}>
          <Bell className="h-3 w-3" />
        </Button>
        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={handleEdit}>
          <Edit className="h-3 w-3" />
        </Button>
        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={handleOpen}>
          <ExternalLink className="h-3 w-3" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 hover:text-red-600 hover:bg-red-50"
          onClick={handleDelete}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );

  return (
    <BaseNode
      data={data}
      id={id}
      selected={selected}
      icon={<Box className="h-4 w-4" />}
      title={label}
      subtitle={type}
      badge={type}
      status={getStatus()}
      color="stone"
      inputs={[
        { position: 'top', id: 'top' },
        { position: 'left', id: 'left', color: '#22c55e' } // Green for sibling
      ]}
      outputs={[
        { position: 'bottom', id: 'bottom' },
        { position: 'right', id: 'right', color: '#22c55e' } // Green for sibling
      ]}
      content={
        <div className="space-y-2">
          {description && (
            <p className="text-xs leading-relaxed">{description}</p>
          )}
          {children}
        </div>
      }
      footer={footerContent}
    />
  );
}