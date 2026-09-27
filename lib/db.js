import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

const dataDir = path.join(process.cwd(), "data");
fs.mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(path.join(dataDir, "counter.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS counter (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    value INTEGER NOT NULL
  )
`);
db.exec(`INSERT OR IGNORE INTO counter (id, value) VALUES (1, 0)`);

export function getCount() {
  const row = db.prepare("SELECT value FROM counter WHERE id = 1").get();
  return row.value;
}

export function incrementCount() {
  db.prepare("UPDATE counter SET value = value + 1 WHERE id = 1").run();
  return getCount();
}
