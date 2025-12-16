-- D1 Database Schema for Comments System
-- Migration from Firestore to D1

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,                    -- Firestore document ID
    name TEXT NOT NULL,                     -- Comment author name
    text TEXT NOT NULL,                     -- Comment content
    timestamp INTEGER NOT NULL,             -- Unix timestamp
    author_id TEXT NOT NULL,                -- Generated author ID for tracking
    card_id TEXT NOT NULL,                  -- Original card ID from Firestore
    team_id TEXT NOT NULL,                  -- Team ID (same as card_id in this system)
    deleted BOOLEAN DEFAULT FALSE,           -- Soft delete flag
    migrated_from TEXT DEFAULT 'firestore', -- Migration source
    migration_date INTEGER,                 -- Migration timestamp
    created_at INTEGER DEFAULT (strftime('%s', 'now')),  -- D1 creation time
    updated_at INTEGER DEFAULT (strftime('%s', 'now'))  -- D1 update time
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_comments_team_id ON comments(team_id);
CREATE INDEX IF NOT EXISTS idx_comments_timestamp ON comments(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_comments_deleted ON comments(deleted);
CREATE INDEX IF NOT EXISTS idx_comments_card_id ON comments(card_id);

-- Composite index for active comments by team
CREATE INDEX IF NOT EXISTS idx_comments_team_active ON comments(team_id, deleted, timestamp DESC);

-- Hearts functionality will remain in Firebase Realtime Database
-- No hearts table needed in D1

-- Migration tracking table
CREATE TABLE IF NOT EXISTS migration_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    operation TEXT NOT NULL,                -- Operation type (e.g., 'firestore_to_d1')
    status TEXT NOT NULL,                   -- Status (e.g., 'started', 'completed', 'failed')
    records_count INTEGER DEFAULT 0,        -- Number of records processed
    error_message TEXT,                     -- Error details if failed
    created_at INTEGER DEFAULT (strftime('%s', 'now'))
);
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
-- D1 Database Schema for Students System
-- Migration from students.json to D1

-- Students table
CREATE TABLE IF NOT EXISTS students (
    name TEXT PRIMARY KEY,                  -- Student name
    img TEXT,                               -- Image path
    reflections TEXT,                       -- 소감 field (reflections/thoughts)
    created_at INTEGER DEFAULT (strftime('%s', 'now')),  -- D1 creation time
    updated_at INTEGER DEFAULT (strftime('%s', 'now'))   -- D1 update time
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_students_name ON students(name);

-- Migration tracking table for students
CREATE TABLE IF NOT EXISTS students_migration_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    operation TEXT NOT NULL,                -- Operation type (e.g., 'json_to_d1')
    status TEXT NOT NULL,                   -- Status (e.g., 'started', 'completed', 'failed')
    records_count INTEGER DEFAULT 0,        -- Number of records processed
    error_message TEXT,                     -- Error details if failed
    created_at INTEGER DEFAULT (strftime('%s', 'now'))
);