// src/components/NodeCard.jsx
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bell, Edit, ExternalLink } from "lucide-react";

export default function NodeCard({
  title,
  type,
  status = "Pending",
  description,
  onNotify,
  onEdit,
  onOpen,
  children,
}) {
  return (
    <Card className="w-64 rounded-2xl shadow-md hover:shadow-lg transition-all p-3 border">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{title}</h3>
          <Badge>{type}</Badge>
        </div>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </CardHeader>

      <CardContent>{children}</CardContent>

      <CardFooter className="flex justify-between items-center">
        <Badge
          variant={status === "Completed" ? "default" : "secondary"}
          className="capitalize"
        >
          {status}
        </Badge>
        <div className="flex gap-2">
          {onNotify && (
            <Button size="icon" variant="ghost" onClick={onNotify}>
              <Bell size={16} />
            </Button>
          )}
          {onEdit && (
            <Button size="icon" variant="ghost" onClick={onEdit}>
              <Edit size={16} />
            </Button>
          )}
          {onOpen && (
            <Button size="icon" variant="ghost" onClick={onOpen}>
              <ExternalLink size={16} />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
