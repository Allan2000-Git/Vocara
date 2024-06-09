import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/app/db/schema";

const connectionString = process.env.DATABASE_URL || "postgres://postgres:allan@localhost:5432/vocara";

const client = postgres(connectionString);
export const db = drizzle(client, {schema});