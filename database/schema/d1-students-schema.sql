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