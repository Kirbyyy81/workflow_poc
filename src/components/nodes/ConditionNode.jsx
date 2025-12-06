// src/components/nodes/ConditionNode.jsx
import React from 'react';
import { GitBranch, HelpCircle } from "lucide-react";
import { Handle, Position } from '@xyflow/react';

/**
 * ConditionNode - Represents branching logic and conditional flows
 * Diamond/rhombus shape for easy visual recognition
 */
export default function ConditionNode({ data, id, selected }) {
    // Map status to colors
    const getStatus = () => {
        const status = data.status?.toLowerCase() || '';
        if (status.includes('active') || status.includes('configured')) return 'active';
        if (status.includes('testing')) return 'processing';
        return 'idle';
    };

    const status = getStatus();

    // Status-based colors
    const getColors = () => {
        switch (status) {
            case 'active':
                return {
                    bg: 'bg-purple-50',
                    border: 'border-purple-400',
                    text: 'text-purple-700',
                };
            case 'processing':
                return {
                    bg: 'bg-blue-50',
                    border: 'border-blue-400',
                    text: 'text-blue-700',
                };
            default:
                return {
                    bg: 'bg-slate-50',
                    border: 'border-slate-300',
                    text: 'text-slate-700',
                };
        }
    };

    const colors = getColors();

    return (
        <div className="relative">
            {/* Diamond Container */}
            <div
                className={`
          relative w-40 h-40 flex items-center justify-center
          ${selected ? 'scale-105' : ''}
          transition-transform duration-200
        `}
            >
                {/* Diamond Shape (rotated square) */}
                <div
                    className={`
            absolute w-28 h-28 rotate-45 
            ${colors.bg} ${colors.border}
            border-2 shadow-md
            ${selected ? 'ring-2 ring-offset-2 ring-purple-400' : ''}
          `}
                />

                {/* Content (not rotated) */}
                <div className="relative z-10 text-center px-4 max-w-[120px]">
                    <div className={`flex items-center justify-center gap-1 mb-1 ${colors.text}`}>
                        <GitBranch className="h-4 w-4" />
                    </div>
                    <div className={`font-semibold text-sm ${colors.text} break-words`}>
                        {data.label || "Condition"}
                    </div>
                    {data.condition && (
                        <div className="text-xs text-slate-600 mt-1 truncate">
                            {data.condition}
                        </div>
                    )}
                </div>
            </div>

            {/* Handles */}
            <Handle
                type="target"
                position={Position.Top}
                id="t-target"
                className="!w-3 !h-3 !bg-purple-400 !border-2 !border-white !-top-1"
            />

            {/* True/Yes Output (Right) */}
            <Handle
                type="source"
                position={Position.Right}
                id="true-output"
                className="!w-3 !h-3 !bg-green-500 !border-2 !border-white"
                style={{ top: '50%' }}
            />

            {/* False/No Output (Left) */}
            <Handle
                type="source"
                position={Position.Left}
                id="false-output"
                className="!w-3 !h-3 !bg-red-500 !border-2 !border-white"
                style={{ top: '50%' }}
            />

            {/* Optional: Additional outputs for multi-case conditions */}
            {data.hasMultipleCases && (
                <Handle
                    type="source"
                    position={Position.Bottom}
                    id="default-output"
                    className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white !-bottom-1"
                />
            )}

            {/* Edge Labels (positioned outside diamond) */}
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 text-xs text-green-600 font-medium">
                Yes
            </div>
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-xs text-red-600 font-medium">
                No
            </div>
        </div>
    );
}
