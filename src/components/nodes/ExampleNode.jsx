import React from 'react';
import { Shield, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import BaseNode from './BaseNode';

/**
 * ValidationNode - For validation and testing steps
 */
export function ValidationNode({ data, id, selected }) {
  const getStatus = () => {
    const status = data.status?.toLowerCase() || '';
    if (status.includes('pass')) return 'active';
    if (status.includes('fail')) return 'error';
    if (status.includes('running')) return 'processing';
    return 'idle';
  };

  return (
    <BaseNode
      data={data}
      id={id}
      selected={selected}
      icon={<Shield />}
      title={data.label || "Validation"}
      subtitle={data.description}
      color="red"
      status={getStatus()}
      badge="Validation"
      inputs={[
        { position: 'top', id: 'top', color: '#ef4444' },
        { position: 'left', id: 'left', color: '#ef4444' }
      ]}
      outputs={[
        { position: 'bottom', id: 'bottom', color: '#ef4444' },
        { position: 'right', id: 'right', color: '#ef4444' }
      ]}
      content={
        data.testResults && (
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>{data.testResults.passed || 0} passed</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-3 w-3 text-red-500" />
              <span>{data.testResults.failed || 0} failed</span>
            </div>
          </div>
        )
      }
      footer={
        <div className="flex justify-between items-center text-xs">
          <span className="capitalize font-medium">{data.status || 'Pending'}</span>
          {data.onDelete && (
            <button
              onClick={() => data.onDelete(id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      }
    />
  );
}

/**
 * EventNode - For time-based events and milestones
 */
export function EventNode({ data, id, selected }) {
  const getStatus = () => {
    const now = new Date();
    const eventDate = new Date(data.eventDate);

    if (eventDate < now) return 'active'; // completed
    if (eventDate.toDateString() === now.toDateString()) return 'warning'; // today
    return 'idle'; // upcoming
  };

  return (
    <BaseNode
      data={data}
      id={id}
      selected={selected}
      icon={<Calendar />}
      title={data.label || "Event"}
      subtitle={data.eventDate ? new Date(data.eventDate).toLocaleDateString() : ''}
      color="blue"
      status={getStatus()}
      badge="Event"
      inputs={[
        { position: 'left', id: 'left', color: '#3b82f6' }
      ]}
      outputs={[
        { position: 'right', id: 'right', color: '#3b82f6' }
      ]}
      content={
        <div className="space-y-2 text-xs">
          {data.description && (
            <div>{data.description}</div>
          )}
          {data.attendees && (
            <div className="text-gray-600">
              Attendees: {data.attendees}
            </div>
          )}
          {data.location && (
            <div className="text-gray-600">
              Location: {data.location}
            </div>
          )}
        </div>
      }
      footer={
        <div className="flex justify-between items-center text-xs">
          <span className="capitalize font-medium">{data.status || 'Upcoming'}</span>
          {data.onDelete && (
            <button
              onClick={() => data.onDelete(id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      }
    />
  );
}

/**
 * DecisionNode - For decision points and branching logic
 */
export function DecisionNode({ data, id, selected }) {
  return (
    <BaseNode
      data={data}
      id={id}
      selected={selected}
      icon={<AlertCircle />}
      title={data.label || "Decision"}
      subtitle={data.question}
      color="orange"
      status={data.decided ? 'active' : 'idle'}
      badge="Decision"
      inputs={[
        { position: 'top', id: 'top', color: '#f97316' }
      ]}
      outputs={[
        { position: 'bottom', id: 'yes', color: '#22c55e' },
        { position: 'right', id: 'no', color: '#ef4444' }
      ]}
      content={
        <div className="space-y-2 text-xs">
          {data.description && (
            <div>{data.description}</div>
          )}
          {data.criteria && (
            <div className="p-2 bg-stone-100 rounded">
              <div className="font-semibold mb-1">Criteria:</div>
              {data.criteria.map((criterion, i) => (
                <div key={i}>• {criterion}</div>
              ))}
            </div>
          )}
        </div>
      }
      footer={
        <div className="flex justify-between items-center text-xs">
          <span className="text-green-600">✓ Yes</span>
          <span className="text-red-600">✗ No</span>
        </div>
      }
    />
  );
}

/**
 * ExampleUsage - Shows how to register and use these nodes
 */
/*
// In App.jsx:

import { ValidationNode, EventNode, DecisionNode } from './components/nodes/ExampleNodes';

const nodeTypes = {
  workflowNode: WorkflowNode,
  dataInputNode: DataInputNode,
  validationNode: ValidationNode,
  eventNode: EventNode,
  decisionNode: DecisionNode,
};

// Creating a validation node:
const validationNode = {
  id: 'validation-1',
  type: 'validationNode',
  position: { x: 100, y: 100 },
  data: {
    label: 'API Tests',
    status: 'Running',
    description: 'Testing API endpoints',
    testResults: {
      passed: 45,
      failed: 2
    },
    onDelete: deleteNode,
  }
};

// Creating an event node:
const eventNode = {
  id: 'event-1',
  type: 'eventNode',
  position: { x: 300, y: 100 },
  data: {
    label: 'Product Launch',
    eventDate: '2025-12-01',
    description: 'Launch new product features',
    attendees: 'Team, Stakeholders',
    location: 'Conference Room A',
    onDelete: deleteNode,
  }
};

// Creating a decision node:
const decisionNode = {
  id: 'decision-1',
  type: 'decisionNode',
  position: { x: 500, y: 100 },
  data: {
    label: 'Approve Design?',
    question: 'Does the design meet requirements?',
    description: 'Review design against checklist',
    criteria: [
      'Meets accessibility standards',
      'Follows brand guidelines',
      'Mobile responsive'
    ],
    decided: false,
    onDelete: deleteNode,
  }
};
*/