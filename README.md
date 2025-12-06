# 🧭 Workflow Management System (POC)

A Proof of Concept for a visual workflow management system built with React 19 and Vite. This tool helps teams visualize, manage, and collaborate on complex project flows in a centralized, persistent hub backed by Firestore.

## ✨ Features

* **Visual Workflow Builder:** Create and arrange nodes on an infinite canvas using [React Flow](https://reactflow.dev/).
* **Interactive Graph Construction:**
    * **Contextual Adding:** Hover over any node handle to instantly add a "Parent" (Previous Step) or "Child" (Next Step) node.
    * **Auto-Linking:** Nodes created via handles are automatically connected with directional edges.
* **Property Editor:** A side-panel interface to edit node details including titles, descriptions, statuses, and external links (Figma/API).
* **Cloud Persistence:** Real-time saving and loading of workflow layouts using **Firebase Firestore**.
* **Dynamic Node States:** Visual indicators for node statuses (Pending, In Progress, Approved, etc.) using a custom color-coded design system.

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

*   **Backend Integration:** Connect to a database to persist workflows.
*   **Role-Based Access Control:** Implement user roles and permissions.
*   **Real-Time Collaboration:** Add features for multi-user editing.
*   **Notifications:** Alert users to status changes and updates.