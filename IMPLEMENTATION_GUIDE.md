# Node.jsx Implementation Guide

## Overview

I've created a complete workflow management system with the following features:

### ✅ Features Implemented

1. **Custom Node Component** (`Node.jsx`)
   - React Flow handles on all sides (top, bottom, left, right)
   - Visual card-based design with shadcn/ui components
   - Status badges with color coding
   - Action buttons (Notify, Edit, Open, Delete)
   - Support for different node types and statuses

2. **Custom Edge Component** (`CustomEdge.jsx`)
   - **Hover functionality** - Shows action buttons when you hover over an edge
   - **Add Subnode** - Inserts a new node in the middle of the edge
   - **Add Sibling** - Creates a parallel node connected to the same source
   - **Remove Edge** - Deletes the connection

3. **Enhanced App Component** (`App.jsx`)
   - Full node and edge management
   - Dynamic node creation with auto-incrementing IDs
   - Edge callbacks for add/remove operations
   - Sample workflow data structure
   - Proper React Flow integration

## 🎯 How to Use

### Hover on Edges

When you hover over any edge (connection line), you'll see three buttons appear:

1. **➕ Plus (Vertical)** - Add Child Node
   - Inserts a new node between the source and target
   - Creates two new edges connecting through the new node

2. **➕ Plus (Horizontal)** - Add Sibling Node
   - Creates a parallel node at the same level
   - Connects it to the same source node

3. **❌ X** - Remove Edge
   - Deletes the connection between nodes

### Node Actions

Each node has four action buttons:

- 🔔 **Bell** - Send notifications (placeholder)
- ✏️ **Edit** - Edit node properties (placeholder)
- 🔗 **External Link** - Open in external tool (placeholder)
- 🗑️ **Trash** - Delete the node and all its connections

## 📦 Installation

Replace the following files in your project:

```bash
src/
├── App.jsx              # Replace with new App.jsx
├── components/
│   ├── Node.jsx         # Replace with new Node.jsx
│   └── CustomEdge.jsx   # New file - add this
```

## 🎨 Key Features

### Node Handles

- **Blue handles** (top/bottom) - Parent/child relationships
- **Green handles** (left/right) - Sibling relationships

### Status Colors

- **Default (Blue)** - Completed/Approved
- **Secondary (Gray)** - In Progress
- **Outline** - Pending

### Edge Styling

- Default: Gray stroke with 2px width
- Hovered: Blue stroke with 3px width
- Invisible hit area (20px wide) for easy hovering

## 🔧 Customization

### Adding New Node Types

In `App.jsx`, modify the node creation functions:

```javascript
const newNode = {
  id: newNodeId,
  type: 'node',
  position: { x: ..., y: ... },
  data: {
    label: 'Node Label',
    type: 'UI/Figma',  // Change this
    status: 'Pending',
    description: 'Node description',
    onDelete: deleteNode,
  },
};
```

### Styling Edges

In `CustomEdge.jsx`, modify the style object:

```javascript
style={{
  ...style,
  strokeWidth: isHovered ? 3 : 2,
  stroke: isHovered ? '#3b82f6' : '#b1b1b7', // Change colors here
}}
```

## 🐛 Troubleshooting

### Issue: Buttons don't appear on hover

**Solution:** Make sure the edge type is set to 'custom':

```javascript
const newEdge = {
  ...params,
  type: 'custom',  // This is required
  markerEnd: { type: MarkerType.ArrowClosed },
};
```

### Issue: Nodes can't be deleted

**Solution:** Ensure the `onDelete` callback is passed in node data:

```javascript
data: {
  ...node.data,
  onDelete: deleteNode,  // This must be present
}
```

### Issue: New nodes appear in wrong position

**Solution:** The position is calculated as the midpoint. Adjust the calculation in `addSubnode()`:

```javascript
position: {
  x: (sourceNode.position.x + targetNode.position.x) / 2 + offset,
  y: (sourceNode.position.y + targetNode.position.y) / 2 + offset,
}
```

## 📝 Next Steps

To fully implement the POC as described in the README:

1. **Add Figma Integration**
   - Create a FigmaNode component
   - Embed iframe for Figma previews
   - Add URL input fields

2. **Implement Different Node Types**
   - Create APINode, ValidationNode, etc.
   - Add type-specific content rendering
   - Implement node type selector

3. **Add Node Properties Panel**
   - Right sidebar for editing node details
   - Form inputs for all node properties
   - Save/Cancel functionality

4. **Implement Node Palette**
   - Left sidebar with draggable node types
   - Drag-and-drop to canvas
   - Pre-configured node templates

5. **Add Persistence**
   - localStorage for temporary saving
   - Export/Import workflow JSON
   - Prepare for backend integration

## 🎉 Demo

1. Start the dev server: `npm run dev`
2. Hover over the edges connecting the nodes
3. Click the plus buttons to add nodes
4. Click the X to remove edges
5. Click the trash icon on nodes to delete them

## 💡 Tips

- Use `Ctrl/Cmd + Scroll` to zoom in/out
- Drag nodes to reposition them
- Connect nodes by dragging from one handle to another
- Use the Controls panel (bottom-left) for navigation

## 📄 License

This implementation follows the POC structure defined in the project README.
