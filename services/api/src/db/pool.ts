// Postgres connection pool. Not required for the sample-data endpoints yet, but
// ready for the analysis/persistence work. Lazily created so the API boots without a DB.
import pg from "pg";
import { config } from "../config.js";

let pool: pg.Pool | null = null;

export function getPool(): pg.Pool {
  if (!pool) {
    pool = new pg.Pool({ connectionString: config.databaseUrl, max: 10 });
  }
  return pool;
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
