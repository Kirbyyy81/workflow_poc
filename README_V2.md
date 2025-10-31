# 🧭 Workflow Management System - Complete Project Documentation

> A visual, node-based workflow management system for designing, documenting, and managing complex project flows. Built with React, React Flow, and modern UI components.

## 📑 Table of Contents

- [Project Overview](#-project-overview)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Architecture](#-architecture)
- [Core Concepts](#-core-concepts)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Component Hierarchy](#-component-hierarchy)
- [Data Models](#-data-models)
- [User Interactions](#-user-interactions)
- [Design System](#-design-system)
- [Installation & Setup](#-installation--setup)
- [Usage Guide](#-usage-guide)
- [Customization](#-customization)
- [API Reference](#-api-reference)
- [Development History](#-development-history)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Project Overview

### What is this?

This is a **visual workflow management system** that enables teams to:
- Design and visualize complex project workflows
- Connect different components (UI, APIs, databases) in a single view
- Embed live Figma previews directly in workflow nodes
- Manage hierarchical relationships between processes and components
- Collaborate on technical project planning

### Who is this for?

- **Product Managers**: Visualize entire product flows
- **Designers**: Connect Figma designs to implementation workflows
- **Developers**: Map out API dependencies and data flows
- **Technical Teams**: Document system architectures visually
- **Project Stakeholders**: Understand project structure at a glance

### Why does this exist?

Traditional project management tools don't effectively connect:
- Design artifacts (Figma) with technical implementation
- High-level workflows with specific components (APIs, databases, UI)
- Visual flow diagrams with actionable project items

This tool bridges that gap with a **unified visual workspace**.

---

## 🔍 Problem Statement

### The Challenge

Modern software projects involve:
1. **Design Phase**: Figma mockups, user flows, prototypes
2. **Development Phase**: APIs, databases, frontend components
3. **Integration Phase**: Connecting everything together

Teams struggle with:
- ❌ **Context switching** between Figma, docs, and code
- ❌ **Lost connections** between designs and implementation
- ❌ **Unclear dependencies** between components
- ❌ **Fragmented documentation** across multiple tools
- ❌ **Difficulty visualizing** the complete system

### The Impact

- Designers work in isolation without seeing technical constraints
- Developers don't have easy access to design context
- Project managers lack a unified view of progress
- New team members struggle to understand system architecture
- Dependencies and blockers are hard to identify

---

## ✅ Solution

### Our Approach

A **node-based visual canvas** where:

1. **Workflow Nodes** represent high-level processes
   - Example: "Customer Purchase Flow", "User Onboarding"
   
2. **Data Input Nodes** represent specific components
   - **UI/Figma nodes** with embedded designs
   - **API nodes** with endpoint documentation
   - **Data nodes** with schema information

3. **Edges** show relationships and dependencies

4. **Hover interactions** allow rapid workflow construction

### Key Differentiators

- ✅ **Unified workspace**: Design + Development in one place
- ✅ **Live Figma embeds**: See designs in context
- ✅ **Type-coded nodes**: Visual distinction by purpose
- ✅ **Hierarchical structure**: Parent workflows → child components
- ✅ **Mind-map aesthetic**: Intuitive, organic layout
- ✅ **Rapid construction**: Hover-based node addition

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────┐
│               Browser (Client)                  │
│  ┌───────────────────────────────────────────┐ │
│  │         React Application                  │ │
│  │                                            │ │
│  │  ┌──────────────────────────────────────┐ │ │
│  │  │        React Flow Canvas             │ │ │
│  │  │                                       │ │ │
│  │  │  ┌──────────┐    ┌──────────┐       │ │ │
│  │  │  │ Workflow │───▶│   Data   │       │ │ │
│  │  │  │   Node   │    │  Input   │       │ │ │
│  │  │  └──────────┘    │   Node   │       │ │ │
│  │  │                  └──────────┘       │ │ │
│  │  │         ▲                            │ │ │
│  │  │         │ Custom Edges              │ │ │
│  │  │         ▼                            │ │ │
│  │  └──────────────────────────────────────┘ │ │
│  │                                            │ │
│  │  ┌──────────────────────────────────────┐ │ │
│  │  │    shadcn/ui Components              │ │ │
│  │  │    (Card, Badge, Button, etc.)       │ │ │
│  │  └──────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
           │                      ▲
           │ (Future)             │ (Future)
           ▼                      │
    ┌─────────────┐        ┌──────────────┐
    │  Backend    │        │  Figma API   │
    │  (MongoDB)  │        │  Integration │
    └─────────────┘        └──────────────┘
```

### Component Architecture

```
App.jsx (Root)
├── ReactFlow (Canvas)
│   ├── WorkflowNode (Purple nodes)
│   │   ├── Card (shadcn/ui)
│   │   ├── Badge (status/type)
│   │   ├── Buttons (actions)
│   │   └── Handles (connection points)
│   │
│   ├── DataInputNode (Colored nodes)
│   │   ├── Card (shadcn/ui)
│   │   ├── Badge (status/type)
│   │   ├── Icon (type-specific)
│   │   ├── Buttons (actions)
│   │   └── Handles (connection points)
│   │
│   ├── CustomEdge (Connections)
│   │   └── BaseEdge (React Flow)
│   │
│   ├── Background (Dot pattern)
│   └── Controls (Zoom/Pan)
│
└── State Management
    ├── nodes[] (node data)
    ├── edges[] (connection data)
    └── callbacks (CRUD operations)
```

---

## 💡 Core Concepts

### 1. Nodes

**Nodes** are the fundamental building blocks representing different elements in your workflow.

#### Workflow Node (Parent)
```javascript
{
  id: 'workflow-1',
  type: 'workflowNode',
  position: { x: 400, y: 50 },
  data: {
    label: 'Customer Purchase Flow',
    status: 'In Progress',
    description: 'End-to-end customer checkout process'
  }
}
```

**Purpose**: Represent high-level processes, user journeys, or system components

**Visual**: Large purple card with GitBranch icon

#### Data Input Node (Child)
```javascript
{
  id: 'data-1',
  type: 'dataInputNode',
  position: { x: 150, y: 250 },
  data: {
    label: 'Checkout Screen',
    type: 'UI/Figma',
    status: 'Approved',
    description: 'User interface for checkout',
    figmaUrl: 'https://figma.com/...'
  }
}
```

**Purpose**: Represent specific implementation components

**Types**:
- `UI/Figma` - Interface designs, mockups (Blue)
- `API` - Backend endpoints, services (Green)
- `Data` - Databases, schemas, models (Orange)

### 2. Edges

**Edges** are connections between nodes showing relationships and data flow.

```javascript
{
  id: 'e-workflow-1-data-1',
  source: 'workflow-1',
  target: 'data-1',
  type: 'custom',
  markerEnd: { type: MarkerType.ArrowClosed }
}
```

**Purpose**: Show dependencies, hierarchies, and data flow

### 3. Handles

**Handles** are connection points on nodes where edges attach.

- **Top/Bottom (Blue/Purple)**: Parent-child relationships
- **Left/Right (Green/Pink)**: Sibling relationships

### 4. Hover Actions

**Hover actions** appear when you hover over a node:

- **Add Child** (bottom): Creates a child node below
- **Add Sibling** (right): Creates a parallel node to the right

### 5. Node Actions

**Node actions** are buttons in the node footer:

- 🔔 **Notify**: Trigger notifications
- ✏️ **Edit**: Open edit modal
- 🔗 **Open**: Launch external link (Figma, docs)
- 🗑️ **Delete**: Remove node and connections

---

## 🛠️ Technology Stack

### Core Framework
- **React 18+**: UI framework
- **Vite 4+**: Build tool and dev server
- **React Flow 11+**: Node-based canvas library

### UI Components
- **shadcn/ui**: Component library (Card, Badge, Button, etc.)
- **Tailwind CSS 4**: Utility-first styling
- **Lucide React**: Icon library
- **Radix UI**: Accessible UI primitives

### State Management
- **React Hooks**: useState, useCallback for local state
- **React Flow**: Built-in node/edge state management

### Styling System
- **CSS Variables**: Theme tokens
- **Tailwind v4**: @import syntax
- **Dark Mode**: Built-in dark theme support

### Development Tools
- **ESLint**: Code linting
- **Vite**: Hot module replacement
- **npm**: Package management

---

## 📁 Project Structure

```
workflow-poc/
├── public/                      # Static assets
├── src/
│   ├── components/
│   │   ├── nodes/              # Node components
│   │   │   ├── WorkflowNode.jsx       # Parent workflow nodes
│   │   │   ├── DataInputNode.jsx      # Child data/component nodes
│   │   │   ├── CustomEdge.jsx         # Edge connector component
│   │   │   └── FlowNode.jsx           # Legacy node (deprecated)
│   │   │
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── card.jsx               # Card component
│   │   │   ├── badge.jsx              # Badge component
│   │   │   ├── button.jsx             # Button component
│   │   │   └── tooltip.jsx            # Tooltip component
│   │   │
│   │   └── styles/             # Global styles
│   │       └── index.css              # Tailwind imports & theme
│   │
│   ├── lib/
│   │   └── utils.js            # Utility functions (cn, etc.)
│   │
│   ├── App.jsx                 # Main application component
│   └── main.jsx                # Application entry point
│
├── .github/
│   └── workflows/              # CI/CD workflows
├── index.html                  # HTML entry point
├── package.json                # Dependencies & scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration (if separate)
├── README.md                   # This file
└── IMPLEMENTATION_GUIDE_V2.md  # Detailed technical docs
```

### Key Files Explained

#### `src/App.jsx`
- Main application component
- React Flow canvas setup
- Node and edge state management
- CRUD operations for nodes/edges
- Node type registration

#### `src/components/nodes/WorkflowNode.jsx`
- Purple-themed parent nodes
- Large card layout (320px)
- Hover action buttons
- GitBranch icon
- Four connection handles

#### `src/components/nodes/DataInputNode.jsx`
- Color-coded child nodes
- Medium card layout (288px)
- Type-specific icons and colors
- Support for UI/Figma, API, Data types
- Displays endpoints or Figma URLs

#### `src/components/nodes/CustomEdge.jsx`
- Smooth bezier curve edges
- Hover state management
- Purple highlight on hover
- Transparent hit area for easy selection

#### `src/components/ui/`
- shadcn/ui component library
- Reusable UI primitives
- Accessible, customizable components

---

## 🌳 Component Hierarchy

### Visual Representation

```
<App>
  └─ <ReactFlow>
      ├─ <WorkflowNode> (type: workflowNode)
      │   ├─ <Card>
      │   │   ├─ <CardHeader>
      │   │   │   ├─ Icon (GitBranch)
      │   │   │   ├─ Title
      │   │   │   └─ <Badge> (type)
      │   │   ├─ <CardContent> (description)
      │   │   └─ <CardFooter>
      │   │       ├─ <Badge> (status)
      │   │       └─ <Button> × 4 (actions)
      │   ├─ <Handle> × 4 (connection points)
      │   └─ Hover Actions (when hovered)
      │       ├─ <Button> Add Child
      │       └─ <Button> Add Sibling
      │
      ├─ <DataInputNode> (type: dataInputNode)
      │   ├─ <Card>
      │   │   ├─ <CardHeader>
      │   │   │   ├─ Icon (type-specific)
      │   │   │   ├─ Title
      │   │   │   └─ <Badge> (type)
      │   │   ├─ <CardContent> (description/endpoint)
      │   │   └─ <CardFooter>
      │   │       ├─ <Badge> (status)
      │   │       └─ <Button> × 4 (actions)
      │   ├─ <Handle> × 4 (connection points)
      │   └─ Hover Actions (when hovered)
      │       ├─ <Button> Add Child
      │       └─ <Button> Add Sibling
      │
      ├─ <CustomEdge> × N (connections)
      │   └─ <BaseEdge> (React Flow)
      │
      ├─ <Background> (dot pattern)
      └─ <Controls> (zoom/pan/fit)
```

### Props Flow

```
App (State)
├─ nodes[] ──────────┐
├─ edges[] ──────────┼──→ ReactFlow
├─ nodeTypes {} ─────┤
├─ edgeTypes {} ─────┘
│
├─ onNodesChange ────┐
├─ onEdgesChange ────┼──→ ReactFlow (callbacks)
└─ onConnect ────────┘

Node Data Props
├─ label (string)
├─ type (string: 'UI/Figma' | 'API' | 'Data')
├─ status (string: 'Pending' | 'In Progress' | 'Approved')
├─ description (string)
├─ endpoint (string, optional)
├─ figmaUrl (string, optional)
├─ onDelete (function)
├─ onAddChild (function)
└─ onAddSibling (function)
```

---

## 📊 Data Models

### Node Model

```typescript
interface Node {
  id: string;                    // Unique identifier (e.g., 'workflow-1', 'data-1')
  type: 'workflowNode' | 'dataInputNode';  // Node type
  position: {
    x: number;                   // X coordinate on canvas
    y: number;                   // Y coordinate on canvas
  };
  data: {
    label: string;               // Display name
    type?: string;               // For DataInputNode: 'UI/Figma' | 'API' | 'Data'
    status: string;              // 'Pending' | 'In Progress' | 'Approved' | 'Completed'
    description: string;         // Detailed description
    endpoint?: string;           // For API/Data nodes: endpoint or connection string
    figmaUrl?: string;           // For UI nodes: Figma file URL
    onDelete?: (id: string) => void;       // Delete callback
    onAddChild?: (id: string) => void;     // Add child callback
    onAddSibling?: (id: string) => void;   // Add sibling callback
  };
}
```

### Edge Model

```typescript
interface Edge {
  id: string;                    // Unique identifier (e.g., 'e-workflow-1-data-1')
  source: string;                // Source node ID
  target: string;                // Target node ID
  type: 'custom';                // Edge type (always 'custom' for this app)
  markerEnd?: {
    type: MarkerType;            // Arrow style at end of edge
  };
  data?: {
    // Future: custom edge data
  };
}
```

### Example Workflow Structure

```javascript
const exampleWorkflow = {
  nodes: [
    {
      id: 'workflow-1',
      type: 'workflowNode',
      position: { x: 400, y: 50 },
      data: {
        label: 'Customer Purchase Flow',
        status: 'In Progress',
        description: 'End-to-end customer checkout and payment process'
      }
    },
    {
      id: 'data-1',
      type: 'dataInputNode',
      position: { x: 150, y: 250 },
      data: {
        label: 'Checkout Screen',
        type: 'UI/Figma',
        status: 'Approved',
        description: 'User interface for checkout process',
        figmaUrl: 'https://www.figma.com/file/abc123/checkout'
      }
    },
    {
      id: 'data-2',
      type: 'dataInputNode',
      position: { x: 450, y: 250 },
      data: {
        label: 'Payment API',
        type: 'API',
        status: 'In Progress',
        description: 'Payment processing endpoint',
        endpoint: 'POST /api/v1/payments'
      }
    },
    {
      id: 'data-3',
      type: 'dataInputNode',
      position: { x: 700, y: 250 },
      data: {
        label: 'Order Database',
        type: 'Data',
        status: 'Approved',
        description: 'Order data storage and retrieval',
        endpoint: 'MongoDB - orders collection'
      }
    }
  ],
  edges: [
    {
      id: 'e-workflow-1-data-1',
      source: 'workflow-1',
      target: 'data-1',
      type: 'custom',
      markerEnd: { type: MarkerType.ArrowClosed }
    },
    {
      id: 'e-workflow-1-data-2',
      source: 'workflow-1',
      target: 'data-2',
      type: 'custom',
      markerEnd: { type: MarkerType.ArrowClosed }
    },
    {
      id: 'e-workflow-1-data-3',
      source: 'workflow-1',
      target: 'data-3',
      type: 'custom',
      markerEnd: { type: MarkerType.ArrowClosed }
    }
  ]
};
```

---

## 🎮 User Interactions

### Primary Interactions

#### 1. Hover on Node
```
User hovers over any node
├─> onMouseEnter event fires
├─> isHovered state set to true
├─> Floating action buttons appear:
│   ├─ "Add Child" button (bottom)
│   └─ "Add Sibling" button (right)
└─> User moves mouse away
    └─> onMouseLeave event fires
        └─> isHovered state set to false
            └─> Buttons disappear
```

#### 2. Add Child Node
```
User clicks "Add Child" button
├─> onAddChild(parentId) callback fires
├─> New node created with:
│   ├─ ID: auto-generated (e.g., 'data-4')
│   ├─ Type: 'dataInputNode'
│   ├─> Position: parent.y + 200px (below parent)
│   └─ Data: default values
├─> New edge created:
│   ├─ Source: parentId
│   └─ Target: newNodeId
└─> Canvas updates with new node and edge
```

#### 3. Add Sibling Node
```
User clicks "Add Sibling" button
├─> onAddSibling(siblingId) callback fires
├─> Find parent of current node
├─> New node created with:
│   ├─ ID: auto-generated
│   ├─ Type: same as sibling
│   ├─> Position: sibling.x + 300px (to the right)
│   └─ Data: default values
├─> New edge created:
│   ├─ Source: parentId
│   └─ Target: newNodeId
└─> Canvas updates
```

#### 4. Delete Node
```
User clicks trash icon
├─> onDelete(nodeId) callback fires
├─> Node removed from nodes[]
├─> All edges connected to node removed
└─> Canvas updates
```

#### 5. Manual Connection
```
User drags from handle
├─> React Flow handles drag event
├─> Shows connection line preview
├─> User releases on target handle
├─> onConnect callback fires with:
│   ├─ source: sourceNodeId
│   ├─> target: targetNodeId
│   └─ sourceHandle/targetHandle: optional
├─> New edge created
└─> Canvas updates
```

#### 6. Pan and Zoom
```
Pan:
├─ Click and drag on empty canvas space
└─> Canvas moves in drag direction

Zoom:
├─ Scroll wheel
│   ├─ Scroll up: zoom in
│   └─ Scroll down: zoom out
└─> Use controls in bottom-left:
    ├─ [+] button: zoom in
    ├─ [-] button: zoom out
    ├─ [⊡] button: fit view
    └─ [🔒] button: lock/unlock
```

### Secondary Interactions

#### Edit Node
- Click ✏️ Edit button
- (Currently logs to console - placeholder for future modal)

#### Notify
- Click 🔔 Bell button
- (Currently logs to console - placeholder for notifications)

#### Open External
- Click 🔗 External Link button
- For UI nodes: opens Figma URL
- For API nodes: logs endpoint info
- (Currently logs to console - placeholder)

#### Hover on Edge
- Hover over any edge
- Edge changes color: gray → purple
- Edge thickness increases: 2px → 3px
- Smooth transition animation

---

## 🎨 Design System

### Color Palette

#### Workflow Nodes (Purple Theme)
```css
/* Light Mode */
Background: linear-gradient(to bottom right, #faf5ff, #ffffff)
Border: #e9d5ff (purple-200)
Icon Background: #f3e8ff (purple-100)
Icon Color: #9333ea (purple-600)
Text: #1f2937 (gray-900)
Handles: #a855f7 (purple-500), #ec4899 (pink-500)

/* Dark Mode */
Background: linear-gradient(to bottom right, #581c87, #0f172a)
Icon Background: #581c87 (purple-900)
Icon Color: #c084fc (purple-400)
Text: #f9fafb (gray-50)
```

#### Data Input Nodes

**UI/Figma (Blue)**
```css
/* Light Mode */
Background: linear-gradient(to bottom right, #eff6ff, #ffffff)
Border: #bfdbfe (blue-200)
Icon Background: #dbeafe (blue-100)
Icon Color: #2563eb (blue-600)

/* Dark Mode */
Background: linear-gradient(to bottom right, #1e3a8a, #0f172a)
Icon Background: #1e3a8a (blue-900)
Icon Color: #60a5fa (blue-400)
```

**API (Green)**
```css
/* Light Mode */
Background: linear-gradient(to bottom right, #f0fdf4, #ffffff)
Border: #bbf7d0 (green-200)
Icon Background: #dcfce7 (green-100)
Icon Color: #16a34a (green-600)

/* Dark Mode */
Background: linear-gradient(to bottom right, #14532d, #0f172a)
Icon Background: #14532d (green-900)
Icon Color: #4ade80 (green-400)
```

**Data (Orange)**
```css
/* Light Mode */
Background: linear-gradient(to bottom right, #fff7ed, #ffffff)
Border: #fed7aa (orange-200)
Icon Background: #ffedd5 (orange-100)
Icon Color: #ea580c (orange-600)

/* Dark Mode */
Background: linear-gradient(to bottom right, #7c2d12, #0f172a)
Icon Background: #7c2d12 (orange-900)
Icon Color: #fb923c (orange-400)
```

### Typography

```css
/* Node Titles */
font-size: 16px (text-base) - Data Input Nodes
font-size: 18px (text-lg) - Workflow Nodes
font-weight: 600 (font-semibold) - Data Input Nodes
font-weight: 700 (font-bold) - Workflow Nodes
line-height: tight (leading-tight)

/* Descriptions */
font-size: 12px (text-xs) - Data Input Nodes
font-size: 14px (text-sm) - Workflow Nodes
color: #6b7280 (gray-500) - Light mode
color: #9ca3af (gray-400) - Dark mode

/* Badges */
font-size: 12px (text-xs)
font-weight: 500 (font-medium)
text-transform: capitalize

/* Code/Endpoints */
font-family: monospace
font-size: 12px (text-xs)
background: #f3f4f6 (gray-100)
```

### Spacing & Sizing

```css
/* Node Dimensions */
Workflow Node: 320px width (w-80)
Data Input Node: 288px width (w-72)
Card Height: auto (based on content)

/* Padding */
Card: 12px (p-3)
Card Header: 12px bottom (pb-3)
Card Footer: 12px top (pt-3)
Card Content: 8px vertical (py-2)

/* Gaps */
Between elements: 8px (gap-2)
Between button icons: 4px (gap-1)

/* Border Radius */
Cards: 24px (rounded-3xl)
Buttons: 9999px (rounded-full)
Badges: 9999px (rounded-full)
Code blocks: 6px (rounded)

/* Handles */
Size: 12px × 12px (w-3 h-3)
Border: 2px white

/* Hover Action Positions */
Add Child button: 56px below node (-bottom-14)
Add Sibling button: 64px to right (-right-16)
Button size: 40px × 40px (h-10 w-10)
```

### Icons

```javascript
// Workflow Node
import { GitBranch } from "lucide-react";

// Data Input Nodes
import { Layout, Code, Database, FileJson } from "lucide-react";

const TYPE_ICONS = {
  'UI/Figma': Layout,
  'API': Code,
  'Data': Database,
  'JSON': FileJson,
};

// Node Actions
import { Bell, Edit, ExternalLink, Trash2, Plus } from "lucide-react";
```

### Shadows

```css
/* Cards */
Default: shadow-md (0 4px 6px -1px rgb(0 0 0 / 0.1))
Hover: shadow-lg (0 10px 15px -3px rgb(0 0 0 / 0.1))

/* Hover Action Buttons */
shadow-lg (0 10px 15px -3px rgb(0 0 0 / 0.1))

/* Transition */
transition: all 0.2s ease
```

### Status Badge Colors

```css
/* Approved / Completed */
variant: "default"
background: #3b82f6 (blue-500)
text: white

/* In Progress */
variant: "secondary"
background: #f3f4f6 (gray-100)
text: #1f2937 (gray-900)

/* Pending */
variant: "outline"
background: transparent
border: #e5e7eb (gray-200)
text: #374151 (gray-700)
```

### Canvas Background

```css
/* Dot Pattern */
color: #cbd5e1 (slate-300)
gap: 20px
size: 1px
variant: "dots"

/* Canvas Gradient */
background: linear-gradient(
  to bottom right,
  #f8fafc,  /* slate-50 */
  #f1f5f9   /* slate-100 */
)

/* Dark Mode */
background: linear-gradient(
  to bottom right,
  #0f172a,  /* slate-900 */
  #020617   /* slate-950 */
)
```

### Edge Styling

```css
/* Default State */
stroke: #cbd5e1 (slate-300)
stroke-width: 2px

/* Hover State */
stroke: #8b5cf6 (purple-500)
stroke-width: 3px

/* Transition */
transition: all 0.2s ease

/* Marker (Arrow) */
type: MarkerType.ArrowClosed
color: inherits stroke color
```

---

## 🚀 Installation & Setup

### Prerequisites

```bash
# Node.js version
node >= 18.0.0

# Package manager
npm >= 9.0.0
# or
yarn >= 1.22.0
```

### Step 1: Clone Repository

```bash
git clone https://github.com/your-username/workflow-poc.git
cd workflow-poc
```

### Step 2: Install Dependencies

```bash
npm install
```

**Core Dependencies:**
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "@xyflow/react": "^12.0.0",
  "lucide-react": "^0.263.1",
  "@radix-ui/react-tooltip": "^1.0.7",
  "@radix-ui/react-slot": "^1.0.2",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

**Dev Dependencies:**
```json
{
  "vite": "^5.0.0",
  "tailwindcss": "^4.0.0",
  "@vitejs/plugin-react": "^4.2.0",
  "eslint": "^8.55.0"
}
```

### Step 3: Configure Environment

No environment variables needed for basic setup.

For future Figma integration:
```bash
# .env.local (not included in repo)
VITE_FIGMA_API_TOKEN=your_figma_token_here
```

### Step 4: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Step 5: Build for Production

```bash
npm run build
```

Output will be in `dist/` directory.

### Step 6: Preview Production Build

```bash
npm run preview
```

---

## 📖 Usage Guide

### Creating Your First Workflow

#### 1. Start with a Workflow Node

The default setup includes a sample workflow. To create your own:

```javascript
// In App.jsx, modify initialNodes

const initialNodes = [
  {
    id: 'workflow-1',
    type: 'workflowNode',
    position: { x: 400, y: 50 },
    data: {
      label: 'Your Workflow Name',
      status: 'In Progress',
      description: 'Description of your workflow',
    },
  },
];
```

#### 2. Add Child Components

**Method A: Using Hover Actions**
1. Hover over the workflow node
2. Click "Add Child" button that appears below
3. A new data input node will be created
4. Edit the node data as needed

**Method B: Manually in Code**
```javascript
const initialNodes = [
  // ... workflow node ...
  {
    id: 'data-1',
    type: 'dataInputNode',
    position: { x: 150, y: 250 },
    data: {
      label: 'Component Name',
      type: 'UI/Figma',  // or 'API' or 'Data'
      status: 'Pending',
      description: 'Component description',
      figmaUrl: 'https://figma.com/...',  // optional
    },
  },
];
```

#### 3. Create Connections

**Method A: Automatic (via Add Child)**
- Connections are created automatically when using hover actions

**Method B: Manual Drag**
1. Click and drag from a handle on one node
2. Release on a handle on another node
3. Connection is created

**Method C: In Code**
```javascript
const initialEdges = [
  {
    id: 'e-workflow-1-data-1',
    source: 'workflow-1',
    target: 'data-1',
    type: 'custom',
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];
```

### Node Type Guidelines

#### When to Use Workflow Nodes

✅ Use for:
- High-level processes ("User Onboarding", "Checkout Flow")
- Major system components ("Authentication System")
- Project phases ("Phase 1: Design", "Phase 2: Development")
- User journeys ("Customer Purchase Journey")

❌ Don't use for:
- Individual UI screens
- Specific API endpoints
- Database tables

#### When to Use Data Input Nodes

**UI/Figma Nodes**
✅ Use for:
- Figma design files
- Individual screens/pages
- Component libraries
- Design systems

**API Nodes**
✅ Use for:
- REST API endpoints
- GraphQL queries
- Microservices
- External integrations

**Data Nodes**
✅ Use for:
- Database tables/collections
- Data models/schemas
- Data sources
- Storage systems

### Best Practices

#### 1. Naming Conventions

```javascript
// ✅ Good names
"Customer Purchase Flow"
"Login Screen"
"POST /api/users"
"Users Database"

// ❌ Avoid
"thing1"
"component"
"api"
"db"
```

#### 2. Hierarchy Structure

```
Recommended:
Workflow (1)
├─ Data Input (3-7 children)
│  ├─ Data Input (0-3 grandchildren)
│  └─ Data Input
└─ Data Input

Avoid:
Workflow (1)
├─ Data Input (15+ children - too many!)
└─ Data Input
    └─ Data Input
        └─ Data Input (too deep!)
```

#### 3. Status Management

Update status as work progresses:
```
Pending → In Progress → In Review → Approved/Completed
```

#### 4. Descriptions

Write clear, concise descriptions:
```javascript
// ✅ Good
description: "User authentication API endpoint with JWT tokens"

// ❌ Too vague
description: "API stuff"

// ❌ Too long
description: "This is the API endpoint that handles user authentication and it uses JWT tokens for security and it validates the email and password and returns a token that can be used for subsequent requests..."
```

---

## 🎛️ Customization

### Adding New Node Types

#### 1. Create New Type in DataInputNode

```javascript
// In DataInputNode.jsx

import { Shield } from "lucide-react";  // New icon

const TYPE_ICONS = {
  'UI/Figma': Layout,
  'API': Code,
  'Data': Database,
  'Validation': Shield,  // ← Add new type
};

const TYPE_COLORS = {
  // ... existing types ...
  'Validation': {
    gradient: 'from-red-50 to-white dark:from-red-950 dark:to-slate-900',
    border: 'border-red-200',
    icon: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400',
    badge: 'border-red-300',
  },
};
```

#### 2. Use New Type

```javascript
{
  id: 'data-4',
  type: 'dataInputNode',
  data: {
    type: 'Validation',  // ← Use new type
    label: 'Email Validator',
    // ...
  }
}
```

### Changing Colors

#### Workflow Node Colors

```javascript
// In WorkflowNode.jsx

// Change gradient background
className="... bg-gradient-to-br from-purple-50 to-white ..."
// To:
className="... bg-gradient-to-br from-indigo-50 to-white ..."

// Change border
className="... border-2 border-purple-200 ..."
// To:
className="... border-2 border-indigo-200 ..."

// Change icon background
className="... bg-purple-100 ..."
// To:
className="... bg-indigo-100 ..."
```

#### Edge Colors

```javascript
// In CustomEdge.jsx

style={{
  strokeWidth: isHovered ? 3 : 2,
  stroke: isHovered ? '#8b5cf6' : '#cbd5e1',  // ← Change colors
  transition: 'all 0.2s ease',
}}
```

### Adjusting Spacing

#### Node Positioning

```javascript
// In App.jsx

const addChildNode = useCallback((parentId) => {
  // ...
  position: {
    x: parentNode.position.x,
    y: parentNode.position.y + 200,  // ← Change vertical spacing
  },
  // ...
});

const addSiblingNode = useCallback((siblingId) => {
  // ...
  position: {
    x: siblingNode.position.x + 300,  // ← Change horizontal spacing
    y: siblingNode.position.y,
  },
  // ...
});
```

#### Hover Button Positions

```javascript
// In WorkflowNode.jsx or DataInputNode.jsx

// Add Child button
<div className="absolute -bottom-14 left-1/2">
// Change -bottom-14 to adjust vertical distance

// Add Sibling button
<div className="absolute -right-16 top-1/2">
// Change -right-16 to adjust horizontal distance
```

### Customizing Node Size

```javascript
// In WorkflowNode.jsx
<Card className="w-80 ...">
// Change w-80 (320px) to w-96 (384px) or any size

// In DataInputNode.jsx
<Card className="w-72 ...">
// Change w-72 (288px) to w-64 (256px) or any size
```

### Adding Custom Fields

```javascript
// Example: Adding "assignee" field

// 1. Update data model
data: {
  label: 'Task Name',
  type: 'API',
  assignee: 'john@example.com',  // ← New field
  // ...
}

// 2. Display in node
// In DataInputNode.jsx, add to CardHeader:
{data.assignee && (
  <p className="text-xs text-gray-500">
    Assigned to: {data.assignee}
  </p>
)}
```

---

## 📚 API Reference

### Node Component Props

#### WorkflowNode

```typescript
interface WorkflowNodeProps {
  data: {
    label: string;              // Required: Node title
    status: string;             // Required: Current status
    description: string;        // Required: Node description
    onDelete?: (id: string) => void;      // Optional: Delete callback
    onAddChild?: (id: string) => void;    // Optional: Add child callback
    onAddSibling?: (id: string) => void;  // Optional: Add sibling callback
  };
  id: string;                   // Provided by React Flow
}
```

#### DataInputNode

```typescript
interface DataInputNodeProps {
  data: {
    label: string;              // Required: Node title
    type: 'UI/Figma' | 'API' | 'Data';  // Required: Node type
    status: string;             // Required: Current status
    description: string;        // Required: Node description
    endpoint?: string;          // Optional: API endpoint or DB connection
    figmaUrl?: string;          // Optional: Figma file URL
    onDelete?: (id: string) => void;      // Optional: Delete callback
    onAddChild?: (id: string) => void;    // Optional: Add child callback
    onAddSibling?: (id: string) => void;  // Optional: Add sibling callback
  };
  id: string;                   // Provided by React Flow
}
```

### App.jsx Functions

#### deleteNode

```typescript
function deleteNode(nodeId: string): void
```
Removes a node and all its connected edges.

**Usage:**
```javascript
deleteNode('workflow-1');
```

#### addChildNode

```typescript
function addChildNode(parentId: string): void
```
Creates a new child node below the parent and connects them.

**Usage:**
```javascript
addChildNode('workflow-1');
```

**Position Calculation:**
```javascript
position: {
  x: parentNode.position.x,
  y: parentNode.position.y + 200,  // 200px below
}
```

#### addSiblingNode

```typescript
function addSiblingNode(siblingId: string): void
```
Creates a new sibling node to the right of the current node, connected to the same parent.

**Usage:**
```javascript
addSiblingNode('data-1');
```

**Position Calculation:**
```javascript
position: {
  x: siblingNode.position.x + 300,  // 300px to the right
  y: siblingNode.position.y,
}
```

### React Flow Callbacks

#### onNodesChange

```typescript
function onNodesChange(changes: NodeChange[]): void
```
Handles node position updates, selection, and removal.

#### onEdgesChange

```typescript
function onEdgesChange(changes: EdgeChange[]): void
```
Handles edge selection and removal.

#### onConnect

```typescript
function onConnect(connection: Connection): void
```
Creates a new edge when handles are connected manually.

**Parameters:**
```typescript
interface Connection {
  source: string;        // Source node ID
  target: string;        // Target node ID
  sourceHandle?: string; // Source handle ID (optional)
  targetHandle?: string; // Target handle ID (optional)
}
```

---

## 📜 Development History

### Version 2.0 (Current) - Mind-Map Redesign

**Date**: October 2025

**Major Changes:**
- ✨ Introduced two specialized node types (Workflow, Data Input)
- ✨ Added hover-based controls on nodes (instead of edges)
- ✨ Implemented mind-map inspired design with gradients
- ✨ Added type-specific color coding (Blue/Green/Orange)
- ✨ Created large icon badges for visual identification
- ✨ Implemented floating action buttons
- ✨ Changed background to dot pattern

**Technical:**
- Created `WorkflowNode.jsx` component
- Created `DataInputNode.jsx` component
- Simplified `CustomEdge.jsx` (removed edge controls)
- Updated `App.jsx` with hover-based logic
- Added comprehensive documentation

### Version 1.0 - Initial Implementation

**Date**: October 2025 (earlier)

**Features:**
- Basic node component (FlowNode)
- Edge-based controls (add/remove on edges)
- Single node type
- Standard card design
- Grid background

**Components:**
- `FlowNode.jsx` (now deprecated)
- `CustomEdge.jsx` (with hover buttons)
- Basic `App.jsx`

### Proof of Concept Phase

**Original Goals:**
- Visual workflow builder
- Figma integration (planned)
- Hierarchical structure
- Node-to-node connections

**Initial Tech Stack:**
- React + Vite
- React Flow
- Tailwind CSS
- shadcn/ui

---

## 🗺️ Future Roadmap

### Phase 1: Core Enhancements (Next 1-2 months)

#### 1.1 Figma Integration
- [ ] Embed Figma iframes in UI nodes
- [ ] Add Figma file picker
- [ ] Preview designs inline
- [ ] Link to Figma comments

#### 1.2 Node Editing
- [ ] Create edit modal component
- [ ] Form fields for all node properties
- [ ] Validation and error handling
- [ ] Save/Cancel functionality

#### 1.3 Node Templates
- [ ] Create template library
- [ ] Pre-configured node patterns
- [ ] Drag-and-drop from palette
- [ ] Custom template creation

### Phase 2: Collaboration (3-4 months)

#### 2.1 Multi-User Support
- [ ] Real-time updates (WebSocket)
- [ ] User presence indicators
- [ ] Cursor tracking
- [ ] Collaborative editing

#### 2.2 Comments & Notifications
- [ ] Add comments to nodes
- [ ] Mention team members (@username)
- [ ] Email/Slack notifications
- [ ] Activity feed

#### 2.3 Version Control
- [ ] Save workflow snapshots
- [ ] View history
- [ ] Compare versions
- [ ] Restore previous versions

### Phase 3: Advanced Features (5-6 months)

#### 3.1 Backend Integration
- [ ] Database setup (MongoDB/PostgreSQL)
- [ ] REST API for CRUD operations
- [ ] User authentication (JWT)
- [ ] Workspace/team management

#### 3.2 Export & Import
- [ ] Export to JSON
- [ ] Export to PNG/SVG
- [ ] Export to Markdown documentation
- [ ] Import from JSON
- [ ] Import from CSV

#### 3.3 Advanced Layouts
- [ ] Auto-layout algorithm
- [ ] Hierarchical tree layout
- [ ] Force-directed layout
- [ ] Grid snap alignment

### Phase 4: Enterprise Features (6+ months)

#### 4.1 Role-Based Access Control
- [ ] User roles (Admin, Editor, Viewer)
- [ ] Node-level permissions
- [ ] Workspace permissions
- [ ] Audit logs

#### 4.2 Integrations
- [ ] Jira integration
- [ ] GitHub integration
- [ ] Slack integration
- [ ] API documentation tools

#### 4.3 Analytics
- [ ] Workflow metrics
- [ ] Completion tracking
- [ ] Team productivity insights
- [ ] Custom reports

### Potential Features (Backlog)

- **AI Assistance**: Suggest connections, auto-complete workflows
- **Mobile App**: iOS/Android native apps
- **Custom Themes**: User-defined color schemes
- **Workflow Templates**: Industry-specific templates
- **API Webhooks**: Trigger external actions on node changes
- **Gantt View**: Timeline view of workflows
- **Kanban View**: Board view alternative
- **PDF Export**: Generate PDF reports
- **Search & Filter**: Find nodes across large workflows
- **Keyboard Shortcuts**: Power user features
- **Dark Mode Toggle**: UI-level dark mode switch

---

## 🤝 Contributing

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/workflow-poc.git
   cd workflow-poc
   git remote add upstream https://github.com/original/workflow-poc.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   npm run dev
   # Test all features manually
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add feature: your feature description"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Describe your changes
   - Link related issues

### Code Style Guidelines

#### JavaScript/React
```javascript
// ✅ Use functional components with hooks
function MyComponent({ data }) {
  const [state, setState] = useState(null);
  return <div>{data.label}</div>;
}

// ✅ Use meaningful variable names
const addChildNode = () => { /* ... */ };

// ✅ Add JSDoc comments for complex functions
/**
 * Creates a new child node below the parent
 * @param {string} parentId - ID of the parent node
 */
const addChildNode = (parentId) => { /* ... */ };

// ❌ Avoid class components
class MyComponent extends React.Component { /* ... */ }

// ❌ Avoid unclear names
const fn1 = () => { /* ... */ };
```

#### CSS/Tailwind
```jsx
// ✅ Use Tailwind utility classes
<div className="flex items-center gap-2 p-4">

// ✅ Group related utilities
<div className="w-full h-full bg-white rounded-lg shadow-md">

// ❌ Avoid inline styles
<div style={{ width: '100%', height: '100%' }}>
```

#### File Organization
```
// ✅ One component per file
// WorkflowNode.jsx contains only WorkflowNode

// ✅ Co-locate related files
components/
  nodes/
    WorkflowNode.jsx
    DataInputNode.jsx
    CustomEdge.jsx

// ❌ Avoid mixing unrelated components
components/
  Everything.jsx  // Contains WorkflowNode, DataInputNode, etc.
```

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(nodes): add validation node type

Add new validation node type with red color scheme and shield icon.
Includes type icon mapping and color definitions.

Closes #123

---

fix(edges): correct hover state transition

Fix edge hover transition from gray to purple. Previously had
incorrect timing function.

---

docs(readme): update installation instructions

Add prerequisites section and clarify Node.js version requirement.
```

### Testing Guidelines

Currently, the project doesn't have automated tests, but manual testing is essential:

**Before Submitting PR:**
- [ ] All existing features work
- [ ] New feature works as expected
- [ ] No console errors
- [ ] Tested in Chrome and Firefox
- [ ] Tested in light and dark mode
- [ ] Responsive design intact
- [ ] Performance acceptable (no lag)

---

## 🔧 Troubleshooting

### Common Issues

#### Issue: "Cannot find module '@xyflow/react'"

**Cause:** React Flow not installed

**Solution:**
```bash
npm install @xyflow/react
```

---

#### Issue: "Icons not displaying"

**Cause:** Lucide React not installed

**Solution:**
```bash
npm install lucide-react
```

---

#### Issue: "Tailwind styles not working"

**Cause:** Tailwind not configured properly

**Solution:**
1. Check `tailwind.config.js` exists
2. Verify `src/components/styles/index.css` imports Tailwind:
   ```css
   @import "tailwindcss";
   ```
3. Ensure Vite is configured for Tailwind

---

#### Issue: "Hover buttons don't appear"

**Cause:** Callbacks not passed to nodes

**Solution:** In `App.jsx`, ensure:
```javascript
const nodesWithCallbacks = nodes.map((node) => ({
  ...node,
  data: {
    ...node.data,
    onAddChild: addChildNode,  // ← Must be present
    onAddSibling: addSiblingNode,  // ← Must be present
  },
}));
```

---

#### Issue: "New nodes appear at (0, 0)"

**Cause:** Position calculation error

**Solution:** Check position calculation in `addChildNode` and `addSiblingNode`:
```javascript
// Ensure parent/sibling node exists
const parentNode = nodes.find((n) => n.id === parentId);
if (!parentNode) return;  // ← Add this check

// Ensure position object is valid
position: {
  x: parentNode.position.x,  // Must be a number
  y: parentNode.position.y + 200,  // Must be a number
}
```

---

#### Issue: "Edges don't connect"

**Cause:** Edge type not registered or handles missing

**Solution:**
1. Check edge type registration:
   ```javascript
   const edgeTypes = {
     custom: CustomEdge,  // ← Must be present
   };
   ```

2. Verify handles exist on nodes:
   ```jsx
   <Handle
     type="source"
     position={Position.Bottom}
   />
   ```

---

#### Issue: "Performance lag with many nodes"

**Cause:** Too many nodes rendering at once

**Solution:**
1. Limit visible nodes (virtualization)
2. Optimize re-renders with React.memo:
   ```javascript
   export default React.memo(WorkflowNode);
   ```
3. Use production build:
   ```bash
   npm run build
   npm run preview
   ```

---

#### Issue: "Dark mode doesn't work"

**Cause:** Theme tokens not configured

**Solution:**
1. Check `src/components/styles/index.css` has dark mode definitions:
   ```css
   .dark {
     --background: oklch(...);
     /* ... other dark mode tokens ... */
   }
   ```

2. Verify dark class is applied to root:
   ```html
   <html class="dark">
   ```

---

#### Issue: "Build fails with Tailwind errors"

**Cause:** Tailwind v4 configuration issues

**Solution:**
1. Check Tailwind import syntax in CSS:
   ```css
   @import "tailwindcss";  /* v4 syntax */
   ```

2. Verify Vite config:
   ```javascript
   // vite.config.js
   import tailwindcss from '@tailwindcss/vite'
   
   export default {
     plugins: [
       react(),
       tailwindcss(),
     ],
   }
   ```

---

### Debug Mode

Enable verbose logging:

```javascript
// In App.jsx, add to component:
useEffect(() => {
  console.log('Nodes:', nodes);
  console.log('Edges:', edges);
}, [nodes, edges]);
```

### Browser Console Errors

**"ResizeObserver loop limit exceeded"**
- Not critical, can be ignored
- Caused by React Flow's internal resize detection

**"Warning: Each child in a list should have a unique 'key' prop"**
- Check that all array renders use unique keys
- Usually in badge or button rendering

### Getting Help

1. **Check Documentation**: Read this README and IMPLEMENTATION_GUIDE_V2.md
2. **Search Issues**: Look for existing GitHub issues
3. **Create Issue**: If problem persists, create detailed issue with:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if visual)
   - Browser and OS info
   - Console errors

---

## 📄 License

MIT License

Copyright (c) 2025 [Your Name/Organization]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 🙏 Acknowledgments

- **React Flow**: For the excellent node-based canvas library
- **shadcn/ui**: For the beautiful, accessible component library
- **Tailwind CSS**: For the utility-first styling approach
- **Lucide**: For the comprehensive icon library
- **Radix UI**: For accessible UI primitives

---

## 📞 Contact & Support

- **GitHub**: [https://github.com/your-username/workflow-poc](https://github.com/your-username/workflow-poc)
- **Issues**: [https://github.com/your-username/workflow-poc/issues](https://github.com/your-username/workflow-poc/issues)
- **Email**: your-email@example.com
- **Documentation**: See `IMPLEMENTATION_GUIDE_V2.md` for technical details

---

## 🎓 Learning Resources

### React Flow
- Official Docs: [https://reactflow.dev/](https://reactflow.dev/)
- Examples: [https://reactflow.dev/examples](https://reactflow.dev/examples)
- API Reference: [https://reactflow.dev/api-reference](https://reactflow.dev/api-reference)

### shadcn/ui
- Official Docs: [https://ui.shadcn.com/](https://ui.shadcn.com/)
- Component Docs: [https://ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components)

### Tailwind CSS
- Official Docs: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- Cheat Sheet: [https://nerdcave.com/tailwind-cheat-sheet](https://nerdcave.com/tailwind-cheat-sheet)

---

**Last Updated**: October 30, 2025  
**Version**: 2.0  
**Status**: Active Development

---

Made with ❤️ for better workflow visualization