// src/components/nodes/ApiNode.jsx
import React from 'react';
import { Code, Globe, Zap } from "lucide-react";
import BaseNode from './BaseNode';

/**
 * HTTP Method color mapping
 */
const METHOD_COLORS = {
    'GET': 'text-green-600 bg-green-50 border-green-200',
    'POST': 'text-blue-600 bg-blue-50 border-blue-200',
    'PUT': 'text-orange-600 bg-orange-50 border-orange-200',
    'DELETE': 'text-red-600 bg-red-50 border-red-200',
    'PATCH': 'text-purple-600 bg-purple-50 border-purple-200',
};

/**
 * ApiNode - Represents API endpoints, webhooks, or external service calls
 */
export default function ApiNode({ data, id, selected }) {
    const method = (data.method || 'GET').toUpperCase();
    const methodColor = METHOD_COLORS[method] || METHOD_COLORS['GET'];

    // Map status to BaseNode status types
    const getStatus = () => {
        const status = data.status?.toLowerCase() || '';
        if (status.includes('progress') || status.includes('testing')) return 'processing';
        if (status.includes('completed') || status.includes('live')) return 'active';
        if (status.includes('error') || status.includes('failed')) return 'error';
        return 'idle';
    };

    // Determine icon based on API type
    const getIcon = () => {
        if (data.isWebhook) return <Zap />;
        if (data.isExternal) return <Globe />;
        return <Code />;
    };

    // Build content with endpoint and details
    const content = (
        <div className="space-y-2">
            {data.description && (
                <div className="text-sm text-slate-600">{data.description}</div>
            )}

            {/* HTTP Method Badge */}
            <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-xs font-bold rounded border ${methodColor}`}>
                    {method}
                </span>
                {data.isWebhook && (
                    <span className="px-2 py-0.5 text-xs bg-purple-50 text-purple-600 rounded border border-purple-200">
                        Webhook
                    </span>
                )}
            </div>

            {/* Endpoint URL */}
            {data.endpoint && (
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded text-xs font-mono break-all border border-slate-200">
                    {data.endpoint}
                </div>
            )}

            {/* Authentication */}
            {data.auth && (
                <div className="text-xs text-slate-500 flex items-center gap-1">
                    <span className="font-medium">Auth:</span>
                    <span className="capitalize">{data.auth}</span>
                </div>
            )}
        </div>
    );

    return (
        <BaseNode
            data={data}
            id={id}
            selected={selected}
            icon={getIcon()}
            title={data.label || "API Endpoint"}
            subtitle={data.isWebhook ? "Webhook" : "API"}
            content={content}
            color="green"
            status={getStatus()}
            badge={method}
            footer={
                <div className="flex justify-between items-center text-xs">
                    <span className="capitalize font-medium">{data.status || 'Pending'}</span>
                </div>
            }
            onEdit={data.onEdit ? () => data.onEdit(id) : undefined}
            onDelete={data.onDelete ? () => data.onDelete(id) : undefined}
        />
    );
}
