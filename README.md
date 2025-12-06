# 🧭 Workflow Management System (POC)

A Proof of Concept for a visual workflow management system built with React 19 and Vite. This tool helps teams visualize, manage, and collaborate on complex project flows in a centralized, persistent hub backed by Firestore.

## ✨ Features

* **Visual Workflow Builder:** Create and arrange nodes on an infinite canvas using [React Flow](https://reactflow.dev/).
* **Interactive Graph Construction:**
    * **Contextual Adding:** Hover over any node handle to instantly add a "Parent" (Previous Step) or "Child" (Next Step) node.
    * **Auto-Linking:** Nodes created via handles are automatically connected with directional edges.
* **Enhanced Figma Integration:** 
    * Embed Figma designs directly in nodes with live previews
    * Full-screen modal viewer for detailed design review
    * URL validation and metadata extraction
* **Property Editor:** A side-panel interface to edit node details including titles, descriptions, statuses, and external links (Figma/API).
* **Cloud Persistence:** Real-time saving and loading of workflow layouts using **Firebase Firestore**.
* **Dynamic Node States:** Visual indicators for node statuses (Pending, In Progress, Approved, etc.) using a custom color-coded design system.

## 🎨 Node Types

### Currently Implemented

#### **WorkflowNode** (Parent)
- **Purpose:** Top-level container representing a complete workflow or major process
- **Use Case:** Organizing high-level features, user journeys, or business processes
- **Features:** 
  - Status tracking (Pending, In Progress, Approved, Completed)
  - Description and metadata
  - Parent/child relationship management
  - Can contain multiple child nodes
- **Visual:** Large, prominent node with workflow icon
- **Example:** "Customer Purchase Flow", "User Onboarding Process", "Payment Integration"

#### **DataInputNode**
- **Purpose:** Represents data sources, database queries, or static data inputs
- **Use Case:** Database reads, file uploads, form inputs, configuration data
- **Features:**
  - Type-specific icons and color coding
  - Endpoint/query display
  - Status indicators
  - Data schema preview
- **Visual:** Orange-themed node with database icon
- **Example:** "User Database Query", "Product Catalog", "Configuration JSON"

#### **BaseNode**
- **Purpose:** Foundational UI template that all other nodes extend
- **Features:**
  - Modular design system with header, content, footer
  - Standardized edit/delete actions
  - Custom handle system for connections
  - Status-based theming and color schemes
- **Note:** Not used directly; serves as the base class for all node types

### Planned for Implementation

#### **UiNode** (Phase 2-3)
- **Purpose:** Represents UI components, screens, or design elements
- **Use Case:** Figma designs, wireframes, mockups, component libraries
- **Features:**
  - **Figma integration** with live embed preview
  - Full-screen modal viewer for detailed design review
  - URL validation and metadata extraction
  - Screenshot/thumbnail display
  - Design version tracking
- **Visual:** Blue-themed node with layout/screen icon
- **Example:** "Login Screen", "Checkout Modal", "Navigation Component"

#### **ApiNode** (Phase 2-3)
- **Purpose:** Represents API endpoints, webhooks, or external service calls
- **Use Case:** REST APIs, GraphQL queries, webhooks, third-party integrations
- **Features:**
  - HTTP method indicator (GET, POST, PUT, DELETE)
  - Endpoint URL display
  - Request/response schema preview
  - Authentication requirements
  - Rate limiting info
- **Visual:** Green-themed node with code/API icon
- **Example:** "POST /api/payments", "Stripe Webhook", "GET /users/:id"

#### **FlowNode** (Phase 3)
- **Purpose:** Marks the start or end of a workflow sequence
- **Use Case:** Entry points, exit points, workflow boundaries
- **Types:**
  - **Start Node:** Workflow initiation point
  - **End Node:** Workflow completion/termination point
- **Features:**
  - Distinct visual styling (rounded/pill shape)
  - Single input (End) or output (Start) handle
  - Trigger conditions for Start nodes
  - Success/failure states for End nodes
- **Visual:** Rounded capsule shape, green (Start) or red (End)
- **Example:** "User Clicks Checkout", "Payment Complete", "Error: Payment Failed"

#### **ConditionNode** (Phase 3)
- **Purpose:** Represents branching logic and conditional flows
- **Use Case:** If/else statements, switch cases, approval gates, A/B testing
- **Features:**
  - Diamond-shaped visual for easy recognition
  - Multiple output handles (true/false, or multiple cases)
  - Condition expression editor
  - Edge labels for each path ("if true", "if false", "case A")
  - Logic operator support (AND, OR, NOT)
- **Visual:** Diamond/rhombus shape, purple-themed
- **Example:** "Payment Success?", "User Role == Admin?", "Cart Total > $100?"

### Suggested Additional Nodes

#### **TransformNode** (Suggested)
- **Purpose:** Data transformation, mapping, or processing
- **Use Case:** Format conversion, data validation, calculations, filtering
- **Features:**
  - Input/output data type indicators
  - Transformation logic display (e.g., "map", "filter", "reduce")
  - Preview of transformation results
  - Error handling configuration
- **Visual:** Yellow-themed node with transform icon
- **Example:** "Format Date", "Calculate Tax", "Filter Active Users"

#### **EventNode** (Suggested)
- **Purpose:** Represents system events, triggers, or listeners
- **Use Case:** User actions, scheduled tasks, webhooks, pub/sub events
- **Features:**
  - Event type indicator (click, submit, schedule, webhook)
  - Trigger conditions
  - Event payload schema
  - Frequency/timing info
- **Visual:** Teal-themed node with lightning bolt icon
- **Example:** "User Login Event", "Daily Report Trigger", "Order Created Webhook"

#### **NoteNode** (Suggested)
- **Purpose:** Annotations, comments, and documentation
- **Use Case:** Design notes, TODOs, explanations, warnings
- **Features:**
  - Sticky note appearance
  - Rich text/markdown editor
  - Color picker for categorization (yellow, pink, blue)
  - Resizable
  - No connection handles (floating annotations)
- **Visual:** Sticky note style, customizable colors
- **Example:** "TODO: Add error handling", "Design Decision: Using OAuth2"

## 🛠️ Tech Stack

* **Frontend:** React 19, Vite
* **Visualization:** @xyflow/react (React Flow)
* **Styling:** Tailwind CSS v4, `clsx`, `tailwind-merge`
* **Icons:** Lucide React
* **Backend / Storage:** Firebase Firestore
* **Architecture:** Modular hook-based logic (`useGraphOperations`, `useFirestore`)

## 📂 Project Structure

```text
src/
├── components/
│   ├── nodes/          # Custom Node & Handle components
│   │   ├── BaseNode.jsx    # UI Shell for all nodes
│   │   ├── CustomHandle.jsx # Handle with "+" button logic
│   │   ├── WorkflowNode.jsx
│   │   └── DataInputNode.jsx
│   ├── figma/          # Figma integration components
│   │   ├── FigmaEmbed.jsx      # Iframe embed component
│   │   ├── FigmaPreview.jsx    # Thumbnail preview
│   │   └── FigmaViewerModal.jsx # Full-screen viewer
│   ├── ui/             # Reusable UI elements (Button, Card, Badge)
│   ├── EditNodeSheet.jsx # Side panel for editing node data
│   └── WorkflowToolbar.jsx # Top action bar
├── hooks/
│   ├── useGraphOperations.js # Logic for adding/deleting/modifying nodes
│   └── useFirestore.js       # Database sync logic
├── lib/
│   ├── constants.js    # Central config for Types, Colors, and Layouts
│   └── firebase.js     # Firebase SDK initialization
├── services/
│   ├── figma/          # Figma service utilities
│   │   └── figmaService.js # URL parsing, validation, embed generation
│   └── storage/        # Storage service abstractions
├── data/               # Initial/Fallback data sets
└── App.jsx             # Main application orchestrator

## 🚀 Setup and Run

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/workflow-poc.git
    cd workflow-poc
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be running at `http://localhost:5173`.

## 🔮 Future Work

### Phase 2: Workflow Flow Enhancements (In Progress)
*   **Canvas Controls:** Mini-map, zoom controls, auto-layout
*   **Node Creation Improvements:** Type selector, smart positioning
*   **Navigation & Search:** Cmd/Ctrl+K search, breadcrumbs

### Phase 3: Additional Node Types
*   **DecisionNode:** Branching logic with conditional paths
*   **ProcessNode:** Data transformation and processing steps
*   **NoteNode:** Annotations and documentation
*   **Enhanced Edges:** Conditional labels, data flow visualization
*   **Node Grouping:** Visual grouping and organization

### Phase 4: Export & Data Features
*   **Export/Import:** JSON, PNG, SVG, Markdown formats
*   **Metadata Panel:** Workflow statistics and analytics

### Deferred to MVP
*   **Authentication:** User management and login
*   **Role-Based Access Control:** Permissions and sharing
*   **Real-Time Collaboration:** Multi-user editing with presence
*   **Notifications:** Status change alerts and updates