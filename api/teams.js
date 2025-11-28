// Teams API endpoint
// Fetches teams data from D1 database

export async function onRequestGet({ request, env }) {
    try {
        // Query all teams from D1 database
        const result = await env.DB.prepare(`
            SELECT 
                id,
                team_name,
                project_name,
                members,
                panel_submitted,
                description,
                platform,
                final_video_url,
                mid_video_url,
                presenters,
                final_presentation_url,
                deployment_url,
                mid_presentation_url,
                class_name,
                created_at,
                updated_at
            FROM teams 
            ORDER BY class_name, id
        `).all();

        // Transform database rows back to original JSON structure
        const teamsData = {};
        
        result.results.forEach(team => {
            const className = team.class_name; // 'a반' or 'b반'
            
            if (!teamsData[className]) {
                teamsData[className] = [];
            }
            
            // Convert JSON strings back to arrays
            const members = JSON.parse(team.members || '[]');
            const presenters = JSON.parse(team.presenters || '[]');
            
            // Map database fields back to original JSON structure
            teamsData[className].push({
                id: team.id,
                조이름: team.team_name,
                프로젝트명: team.project_name,
                조원: members,
                판넬제출여부: team.panel_submitted ? 'Y' : '',
                작품설명: team.description,
                예상플랫폼: team.platform,
                최종발표영상: team.final_video_url,
                중간발표영상: team.mid_video_url,
                최종발표자: presenters,
                최종발표자료: team.final_presentation_url,
                "최종배포 URL": team.deployment_url,
                중간발표자료: team.mid_presentation_url
            });
        });

        return new Response(JSON.stringify(teamsData), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
        });

    } catch (error) {
        console.error('Teams API error:', error);
        return new Response(JSON.stringify({ 
            error: 'Failed to fetch teams data',
            details: error.message 
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

// Optional: Add POST endpoint for creating new teams
export async function onRequestPost({ request, env }) {
    try {
        const teamData = await request.json();
        
        // Validate required fields
        const requiredFields = ['id', 'team_name', 'project_name', 'class_name'];
        for (const field of requiredFields) {
            if (!teamData[field]) {
                return new Response(JSON.stringify({ 
                    error: `Missing required field: ${field}` 
                }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        }

        // Insert new team
        const result = await env.DB.prepare(`
            INSERT INTO teams (
                id, team_name, project_name, members, panel_submitted,
                description, platform, final_video_url, mid_video_url,
                presenters, final_presentation_url, deployment_url,
                mid_presentation_url, class_name
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
            teamData.id,
            teamData.team_name,
            teamData.project_name,
            JSON.stringify(teamData.members || []),
            teamData.panel_submitted || 0,
            teamData.description || null,
            teamData.platform || null,
            teamData.final_video_url || null,
            teamData.mid_video_url || null,
            JSON.stringify(teamData.presenters || []),
            teamData.final_presentation_url || null,
            teamData.deployment_url || null,
            teamData.mid_presentation_url || null,
            teamData.class_name
        ).run();

        return new Response(JSON.stringify({ 
            success: true,
            team_id: teamData.id,
            changes: result.changes 
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error('Teams POST error:', error);
        return new Response(JSON.stringify({ 
            error: 'Failed to create team',
            details: error.message 
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
