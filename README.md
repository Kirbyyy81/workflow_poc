# 🧭 Workflow Management System (POC)

## Overview

This Proof of Concept (POC) demonstrates a **visual workflow management system** built with **React**.  
The goal is to create a **centralized hub** for teams (UI designers, backend developers, PMs, etc.) to visualize, manage, and collaborate on complex project flows in one place.

Each **workflow** represents a complete process (e.g., *Customer Purchase Flow*), while each **subnode** represents a supporting component — such as a Figma UI screen, an API endpoint, or a validation rule.

This system allows embedding of **live Figma previews**, **node-to-node connections**, and **role-based edit restrictions** (conceptually, not enforced in this POC).

---

## 🎯 Objectives

This POC aims to:
1. Demonstrate the **visual node-based workflow** using [React Flow](https://reactflow.dev/).
2. Show that **Figma files can be embedded and previewed live** inside workflow nodes.
3. Model a **hierarchical workflow structure**, where:
   - Parent node = overall workflow (e.g., Customer Purchase Flow)
   - Subnodes = UI, API, validation, or other process components
4. Provide a base structure for future integrations like:
   - Role-based editing permissions
   - Notification system for status changes
   - Persistent backend (database/API)
   - Status-driven workflow approvals

---

## 🧩 Conceptual Model

### Parent Node: Workflow

Represents the overall process — e.g. a *Customer Purchase Flow*.

```json
{
  "id": "workflow_001",
  "type": "parent_node",
  "title": "Customer Purchase Flow",
  "status": "In Review",
  "subnodes": ["node_ui_checkout", "node_api_payment", "node_data_validation"]
}
```

### Subnodes: Components

Each subnode represents part of the workflow, such as a Figma UI, API, or data validation rule.

Example: UI Node (Figma)
```json
{
  "id": "node_ui_checkout",
  "type": "ui_figma",
  "title": "Checkout Screen",
  "role": "designer",
  "figmaEmbed": "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/<FILE_ID>",
  "figmaLink": "https://www.figma.com/file/<FILE_ID>",
  "status": "Approved"
}

// Example: API Node
{
  "id": "node_api_payment",
  "type": "api",
  "title": "Payment Endpoint",
  "role": "backend",
  "endpoint": "POST /api/payments",
  "request": {
    "amount": { "type": "number", "required": true, "min": 0 },
    "method": { "type": "string", "enum": ["card", "ewallet"] }
  },
  "status": "In Progress"
}
```

## 🧱 POC Implementation (Frontend Only)

For this proof of concept:

There is no backend connection or persistence.

All data (nodes, edges, figma links) are stored in local React state.

Focus is on Figma embed and node visualization only.

# 🚀 Setup & Run
1. Clone and Install
   ```bash
   git clone https://github.com/your-username/workflow-poc.git
   cd workflow-poc
   npm install

2. Start the App
   ```bash
   npm run dev

App runs at http://localhost:3000
