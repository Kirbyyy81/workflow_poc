import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Edit, ExternalLink, Trash2, Plus, Database, Code, Layout, FileJson } from "lucide-react";

const TYPE_ICONS = {
  'UI/Figma': Layout,
  'API': Code,
  'Data': Database,
  'JSON': FileJson,
  'Validation': FileJson,
  'default': Database,
};

const TYPE_COLORS = {
  'UI/Figma': {
    gradient: 'from-blue-50 to-white dark:from-blue-950 dark:to-slate-900',
    border: 'border-blue-200',
    icon: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
    badge: 'border-blue-300',
  },
  'API': {
    gradient: 'from-green-50 to-white dark:from-green-950 dark:to-slate-900',
    border: 'border-green-200',
    icon: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
    badge: 'border-green-300',
  },
  'Data': {
    gradient: 'from-orange-50 to-white dark:from-orange-950 dark:to-slate-900',
    border: 'border-orange-200',
    icon: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
    badge: 'border-orange-300',
  },
  'default': {
    gradient: 'from-gray-50 to-white dark:from-gray-950 dark:to-slate-900',
    border: 'border-gray-200',
    icon: 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400',
    badge: 'border-gray-300',
  },
};

export default function DataInputNode({ data, id }) {
  const [isHovered, setIsHovered] = useState(false);
  const {
    label = "Data Input",
    type = "Data",
    status = "Pending",
    description,
    endpoint,
    figmaUrl,
    children,
    onDelete,
    onAddChild,
    onAddSibling,
  } = data;

  const IconComponent = TYPE_ICONS[type] || TYPE_ICONS.default;
  const colors = TYPE_COLORS[type] || TYPE_COLORS.default;

  const handleNotify = () => {
    console.log(`Notify for data input ${id}`);
  };

  const handleEdit = () => {
    console.log(`Edit data input ${id}`);
  };

  const handleOpen = () => {
    console.log(`Open external link for data input ${id}`);
    if (figmaUrl) {
      window.open(figmaUrl, '_blank');
    } else if (endpoint) {
      console.log(`API Endpoint: ${endpoint}`);
    }
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
        className="!bg-blue-500 !w-3 !h-3 !border-2 !border-white"
      />

      <Card className={`w-72 rounded-3xl shadow-md hover:shadow-xl transition-all border-2 ${colors.border} bg-gradient-to-br ${colors.gradient}`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${colors.icon} flex items-center justify-center`}>
                <IconComponent className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-base leading-tight">
                  {label}
                </h3>
                <Badge variant="outline" className={`mt-1 text-xs ${colors.badge}`}>
                  {type}
                </Badge>
              </div>
            </div>
          </div>
          {description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
              {description}
            </p>
          )}
          {endpoint && (
            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-2 block">
              {endpoint}
            </code>
          )}
          {figmaUrl && (
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 truncate">
              🎨 Figma design attached
            </p>
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
              className="rounded-full shadow-lg h-10 w-10"
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
              className="rounded-full shadow-lg h-10 w-10"
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
        className="!bg-blue-500 !w-3 !h-3 !border-2 !border-white"
      />

      {/* Left Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!bg-green-500 !w-3 !h-3 !border-2 !border-white"
      />

      {/* Right Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!bg-green-500 !w-3 !h-3 !border-2 !border-white"
      />
    </div>
  );
}
