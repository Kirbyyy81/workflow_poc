// src/lib/constants.js

// Node Types - Prevents typos in App.jsx and node definitions
export const NODE_TYPES = {
  WORKXKFLOW: 'workflowNode',
  DATA_INPUT: 'dataInputNode',
  VALIDATION: 'validationNode',
  EVENT: 'eventNode',
  DECISION: 'decisionNode',
};

// Node Statuses - Used for logic and conditional styling
export const NODE_STATUS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  APPROVED: 'Approved',
  COMPLETED: 'Completed',
  ERROR: 'Error',
};

// UI Constants - Easier to change theme colors globally later
export const NODE_COLORS = {
  STONE: 'stone',
  BLUE: 'blue',
  GREEN: 'green',
  PURPLE: 'purple',
  RED: 'red',
  ORANGE: 'orange',
};

// Layout - Avoid hardcoded numbers in App.jsx
export const LAYOUT = {
  NODE_WIDTH: 240,
  NODE_HEIGHT: 150,
  SIBLING_TbGAP: 300,
  CHILD_GAP: 200,
};