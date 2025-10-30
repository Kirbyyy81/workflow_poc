import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card' ;
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Edit, ExternalLink, Trash2 } from "lucide-react";

export default function FlowNode({ data, id }) {
  const {
    label = "Node",
    type = "default",
    status = "Pending",
    description,
    children,
    onDelete,
  } = data;

  const handleNotify = () => {
    console.log(`Notify for node ${id}`);
  };

  const handleEdit = () => {
    console.log(`Edit node ${id}`);
  };

  const handleOpen = () => {
    console.log(`Open external link for node ${id}`);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
        return 'default';
      case 'in progress':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="relative">
      {/* Input Handle (top) */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-blue-500 !w-3 !h-3 !border-2 !border-white"
      />

      <Card className="w-64 rounded-2xl shadow-md hover:shadow-lg transition-all border bg-white">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-base leading-tight">{label}</h3>
            <Badge variant="outline" className="shrink-0 text-xs">
              {type}
            </Badge>
          </div>
          {description && (
            <p className="text-xs text-gray-500 mt-1 leading-snug">{description}</p>
          )}
        </CardHeader>

        {children && <CardContent className="py-2">{children}</CardContent>}

        <CardFooter className="flex justify-between items-center pt-3">
          <Badge variant={getStatusColor()} className="capitalize text-xs">
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

      {/* Output Handle (bottom) */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-blue-500 !w-3 !h-3 !border-2 !border-white"
      />

      {/* Left Handle (for sibling connections) */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!bg-green-500 !w-3 !h-3 !border-2 !border-white"
      />

      {/* Right Handle (for sibling connections) */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!bg-green-500 !w-3 !h-3 !border-2 !border-white"
      />
    </div>
  );
}