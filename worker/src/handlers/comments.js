// D1 Comments API for Cloudflare Workers
// Replaces Firestore functionality with D1 database

export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const teamId = url.searchParams.get('teamId');
    
    if (!teamId) {
        return new Response(JSON.stringify({ error: 'teamId is required' }), {
            status: 400,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        });
    }

    try {
        // Get active comments for a team, ordered by timestamp (newest first)
        const result = await env.DB.prepare(`
            SELECT id, name, text, timestamp, author_id, card_id, team_id, deleted, migrated_from, migration_date
            FROM comments 
            WHERE team_id = ? AND deleted = 0
            ORDER BY timestamp DESC
        `).bind(teamId).all();

        return new Response(JSON.stringify({ comments: result.results }), {
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=30', // Cache for 30 seconds
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch comments' }), {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        });
    }
}

export async function onRequestPost(context) {
    const { request, env } = context;
    
    try {
        const data = await request.json();
        const { name, text, authorId, cardId, teamId } = data;

        // Validate required fields
        if (!name || !text || !authorId || !cardId || !teamId) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            });
        }

        // Generate unique ID (similar to Firestore)
        const commentId = generateCommentId();
        const timestamp = Date.now();

        // Insert new comment
        const result = await env.DB.prepare(`
            INSERT INTO comments (id, name, text, timestamp, author_id, card_id, team_id, deleted, migrated_from, migration_date, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, 0, 'd1', NULL, ?, ?)
        `).bind(
            commentId,
            name,
            text,
            timestamp,
            authorId,
            cardId,
            teamId,
            Math.floor(timestamp / 1000), // Unix timestamp for created_at
            Math.floor(timestamp / 1000)  // Unix timestamp for updated_at
        ).run();

        if (result.success) {
            return new Response(JSON.stringify({ 
                success: true, 
                id: commentId,
                timestamp: timestamp
            }), {
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            });
        } else {
            throw new Error('Failed to insert comment');
        }
    } catch (error) {
        console.error('Error creating comment:', error);
        return new Response(JSON.stringify({ error: 'Failed to create comment' }), {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        });
    }
}

export async function onRequestDelete(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const commentId = url.searchParams.get('commentId');
    const teamId = url.searchParams.get('teamId');

    console.log(`DELETE request: commentId=${commentId}, teamId=${teamId}`);

    if (!commentId || !teamId) {
        return new Response(JSON.stringify({ error: 'commentId and teamId are required' }), {
            status: 400,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        });
    }

    try {
        // Soft delete comment (set deleted = 1)
        const result = await env.DB.prepare(`
            UPDATE comments 
            SET deleted = 1, updated_at = ?
            WHERE id = ? AND team_id = ?
        `).bind(
            Math.floor(Date.now() / 1000),
            commentId,
            teamId
        ).run();

        console.log(`DELETE result: success=${result.success}, changes=${result.changes}, success=${result.success}, changes>0=${result.changes > 0}`);

        if (result.success === true) {
            console.log('DELETE successful');
            return new Response(JSON.stringify({ success: true }), {
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            });
        } else {
            console.log('DELETE failed');
            return new Response(JSON.stringify({ error: 'Comment not found or already deleted', result }), {
                status: 404,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            });
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        return new Response(JSON.stringify({ error: 'Failed to delete comment' }), {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        });
    }
}

// Helper function to generate comment ID (similar to Firestore auto-generated IDs)
function generateCommentId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 20; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
