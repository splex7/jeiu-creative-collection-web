CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  name TEXT,
  text TEXT,
  timestamp INTEGER,
  author_id TEXT,
  card_id TEXT,
  team_id TEXT,
  deleted INTEGER DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_comments_team_id
  ON comments(team_id);

CREATE INDEX IF NOT EXISTS idx_comments_deleted
  ON comments(deleted);
