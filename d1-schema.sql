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
