import { json, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const interviews = pgTable("interview", {
    id: uuid('id').default(sql`gen_random_uuid()`).notNull().primaryKey(),
    userId: text("userId").notNull(),
    mockId: text("mockId").notNull(),
    jobRole: text("jobRole").notNull(),
    jobExperience: text("jobExperience").notNull(),
    jobDescription: text("jobDescription").notNull(),
    mockResponse: json('mockResponse').notNull(),
    createdAt: text("createdAt"),
})