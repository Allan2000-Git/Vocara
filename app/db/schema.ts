import { integer, json, pgTable, text, uuid } from 'drizzle-orm/pg-core';
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

export const answers = pgTable("answer", {
    id: uuid('id').default(sql`gen_random_uuid()`).notNull().primaryKey(),
    userId: text("userId").notNull(),
    mockId: text("mockId").notNull(),
    question: text("question").notNull(),
    possibleAnswer: text("possibleAnswer").notNull(),
    userAnswer: text("userAnswer").notNull(),
    feedback: json("feedback").notNull(),
    overall_rating: integer("overall_rating").notNull(),
    createdAt: text("createdAt"),
})