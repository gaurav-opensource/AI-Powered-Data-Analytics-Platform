import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing in .env");
}

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

// Handle idle client errors
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Generic query function with correct type constraint
export const query = <T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> => {
  return pool.query<T>(text, params);
};

// Get a client for transactions
export const getClient = (): Promise<PoolClient> => {
  return pool.connect();
};
