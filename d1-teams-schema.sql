-- D1 Database Schema for Teams System
-- Migration from data.json to D1

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
    id TEXT PRIMARY KEY,                    -- Team ID (e.g., "team_a_01")
    team_name TEXT NOT NULL,                -- 조이름
    project_name TEXT NOT NULL,             -- 프로젝트명
    members TEXT,                           -- 조원 (JSON array string)
    panel_submitted BOOLEAN DEFAULT FALSE,  -- 판넬제출여부 (Y -> true, empty -> false)
    description TEXT,                       -- 작품설명
    platform TEXT,                         -- 예상플랫폼
    final_video_url TEXT,                   -- 최종발표영상
    mid_video_url TEXT,                     -- 중간발표영상
    presenters TEXT,                        -- 최종발표자 (JSON array string)
    final_presentation_url TEXT,            -- 최종발표자료
    deployment_url TEXT,                    -- 최종배포 URL
    mid_presentation_url TEXT,              -- 중간발표자료
    class_name TEXT NOT NULL,               -- 반 이름 (a반, b반)
    created_at INTEGER DEFAULT (strftime('%s', 'now')),  -- D1 creation time
    updated_at INTEGER DEFAULT (strftime('%s', 'now'))   -- D1 update time
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_teams_class_name ON teams(class_name);
CREATE INDEX IF NOT EXISTS idx_teams_team_name ON teams(team_name);
CREATE INDEX IF NOT EXISTS idx_teams_project_name ON teams(project_name);
CREATE INDEX IF NOT EXISTS idx_teams_panel_submitted ON teams(panel_submitted);

-- Composite index for teams by class and panel submission
CREATE INDEX IF NOT EXISTS idx_teams_class_panel ON teams(class_name, panel_submitted);

-- Migration tracking table for teams
CREATE TABLE IF NOT EXISTS teams_migration_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    operation TEXT NOT NULL,                -- Operation type (e.g., 'json_to_d1')
    status TEXT NOT NULL,                   -- Status (e.g., 'started', 'completed', 'failed')
    records_count INTEGER DEFAULT 0,        -- Number of records processed
    error_message TEXT,                     -- Error details if failed
    created_at INTEGER DEFAULT (strftime('%s', 'now'))
);
