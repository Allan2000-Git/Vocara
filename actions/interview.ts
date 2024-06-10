"use server";

import { db } from "@/app/db";
import { interviews } from "@/app/db/schema";
import { JobSchemaType } from "@/types/types";
import { currentUser } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { eq } from "drizzle-orm";

export async function createInterview(values: JobSchemaType) {
    try {
        const user = await currentUser();
        if (!user) {
            throw new Error("You must be logged in to start an interview.");
        }
        const newInterview = await db.insert(interviews).values({
            userId: user.id,
            mockId: uuidv4(),
            jobRole: values.jobRole,
            jobDescription: values.jobDescription,
            jobExperience: values.jobExperience,
            mockResponse: values.mockResponse,
            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')
        }).returning({mockId: interviews.mockId});

        return newInterview;
    } catch (error) {
        throw new Error('Something went wrong while start an interview.')
    }
}

export async function getInterviewDetailsById(mockId: string) {
    try {
        const user = await currentUser();
        if (!user) {
            throw new Error("You must be logged in to start an interview.");
        }
        const interview = await db.select().from(interviews).where(eq(interviews.mockId, mockId));
        return interview;
    } catch (error) {
        throw new Error('Something went wrong while start an interview.')
    }
}