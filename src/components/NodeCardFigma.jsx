// src/components/nodes/FigmaNode.jsx
import React from "react";
import NodeCard from "./NodeCard";

export default function NodeCardFigma({ title, figmaUrl, status }) {
  const openFigma = () => window.open(figmaUrl, "_blank");

  return (
    <NodeCard
      title={title}
      type="Figma"
      status={status}
      description="UI Design Preview"
      onOpen={openFigma}
    >
      <div className="aspect-video rounded-lg overflow-hidden border">
        <iframe
          src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figmaUrl)}`}
          allowFullScreen
          className="w-full h-40"
        />
      </div>
    </NodeCard>
  );
}
