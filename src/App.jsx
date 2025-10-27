// src/pages/MainPage.jsx
import React from "react";
import FigmaNode from "./components/FigmaNode";
import NodeCard from "./components/NodeCard";

export default function MainPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4">
        <h2 className="font-bold text-xl mb-4">Workflows</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="cursor-pointer hover:text-black">Customer Purchase Flow</li>
          <li className="cursor-pointer hover:text-black">Order Fulfillment Flow</li>
        </ul>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 bg-white p-6 overflow-auto grid grid-cols-3 gap-6">
        <NodeCard
          title="Purchase Request"
          type="Workflow"
          status="In Progress"
          description="Initiate purchase flow"
        />
        <FigmaNode
          title="UI Design"
          figmaUrl="https://www.figma.com/file/abc123/example"
          status="Completed"
        />
        <NodeCard
          title="API Endpoint"
          type="API"
          status="Pending"
          description="POST /purchase/submit"
        />
      </div>
    </div>
  );
}
