-- Migration: Create students table
-- Created on: 2025-12-17
-- Description: Add students table to store student information in D1 database

CREATE TABLE IF NOT EXISTS students (
    name TEXT PRIMARY KEY,                  -- Student name
    img TEXT,                               -- Image path
    reflections TEXT,                       -- Reflections ("소감" field)
    url TEXT,                               -- Profile or project URL (added for clickable name feature)
    created_at INTEGER DEFAULT (strftime('%s', 'now')),  -- Creation timestamp
    updated_at INTEGER DEFAULT (strftime('%s', 'now'))   -- Update timestamp
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_students_name ON students(name);

-- Migration tracking
CREATE TABLE IF NOT EXISTS students_migration_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    operation TEXT NOT NULL,                -- Operation type
    status TEXT NOT NULL,                   -- Status (e.g., 'started', 'completed', 'failed')
    records_count INTEGER DEFAULT 0,        -- Number of records processed
    error_message TEXT,                     -- Error details if failed
    created_at INTEGER DEFAULT (strftime('%s', 'now'))
);