// Cloudflare Workers main entry point
// Routes API requests to appropriate handlers

import { onRequestGet, onRequestPost, onRequestDelete as deleteComment } from '../api/comments.js';
import { onRequestGet as getCommentCounts } from '../api/comment-counts.js';
import { onRequestGet as getTeams, onRequestPost as createTeam } from '../api/teams.js';

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        // CORS headers for all responses
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        };

        // Handle CORS preflight requests
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 200,
                headers: corsHeaders
            });
        }

        // Add CORS headers to all responses
        const addCorsHeaders = (response) => {
            const newHeaders = new Headers(response.headers);
            Object.entries(corsHeaders).forEach(([key, value]) => {
                if (!newHeaders.has(key)) {
                    newHeaders.set(key, value);
                }
            });
            return new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: newHeaders
            });
        };

        // Route to appropriate handler
        try {
            if (path.startsWith('/api/comments')) {
                if (request.method === 'GET') {
                    return addCorsHeaders(await onRequestGet({ request, env }));
                } else if (request.method === 'POST') {
                    return addCorsHeaders(await onRequestPost({ request, env }));
                } else if (request.method === 'DELETE') {
                    return addCorsHeaders(await deleteComment({ request, env }));
                } else {
                    return addCorsHeaders(new Response(JSON.stringify({ error: 'Method not allowed' }), {
                        status: 405,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }));
                }
            } else if (path.startsWith('/api/comment-counts')) {
                if (request.method === 'GET') {
                    return addCorsHeaders(await getCommentCounts({ request, env }));
                }
            } else if (path.startsWith('/api/teams')) {
                if (request.method === 'GET') {
                    return addCorsHeaders(await getTeams({ request, env }));
                } else if (request.method === 'POST') {
                    return addCorsHeaders(await createTeam({ request, env }));
                }
            } else if (path.startsWith('/api/hearts')) {
            // Hearts functionality remains in Firebase Realtime Database
            // Return 404 for hearts API endpoints
            return addCorsHeaders(new Response(JSON.stringify({ error: 'Hearts functionality is handled by Firebase Realtime Database' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
        }

            // Route not found
            return addCorsHeaders(new Response(JSON.stringify({ error: 'Route not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            }));

        } catch (error) {
            console.error('Worker error:', error);
            return addCorsHeaders(new Response(JSON.stringify({ error: 'Internal server error' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
        }
    }
};
