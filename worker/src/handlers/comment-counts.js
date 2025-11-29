// D1 Comment Counts API for Cloudflare Workers
// Provides comment counts for all teams

export async function onRequestGet(context) {
    const { env } = context;

    try {
        // Get comment counts for all teams
        const result = await env.DB.prepare(`
            SELECT team_id, COUNT(*) as count
            FROM comments 
            WHERE deleted = FALSE
            GROUP BY team_id
        `).all();

        // Convert to object format for easy lookup
        const countsByTeam = {};
        result.results.forEach(row => {
            countsByTeam[row.team_id] = row.count;
        });

        return new Response(JSON.stringify({ counts: countsByTeam }), {
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=60' // Cache for 1 minute
            }
        });
    } catch (error) {
        console.error('Error fetching comment counts:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch comment counts' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
