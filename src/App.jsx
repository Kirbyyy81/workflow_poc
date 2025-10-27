// src/pages/MainPage.jsx
import React from "react";
// import FigmaNode from "./components/FigmaNode";
import Node from "@/components/Node";

export default function MainPage() {
  return (
    <div className="flex h-screen">

      {/* Main Canvas */}
      <div className="flex-1 bg-white p-6 overflow-auto grid grid-cols-3 gap-6">
        <Node 
          title="Purchase Request"
          type="Workflow"
          status="In Progress"
          description="Initiate purchase flow"
          />
      </div>
    </div>
  );
}
