// src/lib/constants.js

export const NODE_TYPES = {
  WORKFLOW: 'workflowNode',
  DATA_INPUT: 'dataInputNode',
  VALIDATION: 'validationNode',
  EVENT: 'eventNode',
  DECISION: 'decisionNode',
  BASE: 'baseNode', 
};

export const NODE_STATUS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  APPROVED: 'Approved',
  COMPLETED: 'Completed',
  ERROR: 'Error',
  IDLE: 'Idle',
};

// The keys used in your data objects
export const NODE_COLORS = {
  STONE: 'stone',
  BLUE: 'blue',
  GREEN: 'green',
  PURPLE: 'purple',
  RED: 'red',
  ORANGE: 'orange',
};

// The actual UI implementation of those colors
export const NODE_COLOR_SCHEMES = {
  [NODE_COLORS.STONE]: { 
    bg: 'bg-stone-50', 
    border: 'border-stone-200', 
    headerText: 'text-stone-900', 
    accent: 'text-stone-500', 
    selectedBorder: 'border-stone-400' 
  },
  [NODE_COLORS.BLUE]: { 
    bg: 'bg-stone-50', 
    border: 'border-stone-200', 
    headerText: 'text-slate-900', 
    accent: 'text-slate-500', 
    selectedBorder: 'border-slate-400' 
  },
  [NODE_COLORS.GREEN]: { 
    bg: 'bg-stone-50', 
    border: 'border-stone-200', 
    headerText: 'text-emerald-900', 
    accent: 'text-emerald-600', 
    selectedBorder: 'border-emerald-400' 
  },
  [NODE_COLORS.PURPLE]: { 
    bg: 'bg-stone-50', 
    border: 'border-stone-200', 
    headerText: 'text-violet-900', 
    accent: 'text-violet-600', 
    selectedBorder: 'border-violet-400' 
  },
  [NODE_COLORS.ORANGE]: { 
    bg: 'bg-stone-50', 
    border: 'border-stone-200', 
    headerText: 'text-orange-900', 
    accent: 'text-orange-600', 
    selectedBorder: 'border-orange-400' 
  },
  [NODE_COLORS.RED]: { 
    bg: 'bg-stone-50', 
    border: 'border-stone-200', 
    headerText: 'text-red-900', 
    accent: 'text-red-600', 
    selectedBorder: 'border-red-400' 
  },
};

export const LAYOUT = {
  NODE_WIDTH: 240,
  NODE_HEIGHT: 150,
  SIBLING_GAP: 350,
  CHILD_GAP: 200,
};