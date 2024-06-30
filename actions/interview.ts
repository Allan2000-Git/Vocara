"use server";

import { db } from "@/app/db";
import { answers, interviews } from "@/app/db/schema";
import { AnswerType, InterviewDetails, JobSchemaType } from "@/types/types";
import { currentUser } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { and, asc, eq } from "drizzle-orm";

// Interviews

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
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function getInterviewDetailsById(mockId: string) {
    try {
        const user = await currentUser();
        if (!user) {
            throw new Error("You must be logged in to start an interview.");
        }
        const interview = await db.select().from(interviews).where(
            and(
                eq(interviews.userId, user.id),
                eq(interviews.mockId, mockId)
            )
        );
        if (interview.length === 0) {
            throw new Error('No interview found.');
        }

        return interview[0] as InterviewDetails;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function getInterviewDetails() {
    try {
        const user = await currentUser();
        if (!user) {
            throw new Error("You must be logged in to see your interviews.");
        }
        const interviewList = await db.select().from(interviews).where(eq(interviews.userId, user.id));
        if (interviewList.length === 0) {
            return [];
        }

        return interviewList;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

// Answers

export async function storeAnswer(values: AnswerType) {
    try {
        const user = await currentUser();
        if (!user) {
            throw new Error("You must be logged in to start an interview.");
        }
        console.log(values);
        const newAnswer = await db.insert(answers).values({
            userId: user.id,
            mockId: values.mockId,
            question: values.question,
            possibleAnswer: values.possibleAnswer,
            userAnswer: values.userAnswer,
            feedback: values.feedback,
            overall_rating: values.overall_rating,
            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')
        });

        return newAnswer;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getAnswersById(mockId: string) {
    try {
        const user = await currentUser();
        if (!user) {
            throw new Error("You must be logged in to start an interview.");
        }
        const answer = await db.select().from(answers).where(
            and(
                eq(answers.userId, user.id),
                eq(answers.mockId, mockId)
            )
        ).orderBy(asc(answers.createdAt));

        if (answer.length === 0) {
            throw new Error('No answers found for the given mockId.');
        }

        return answer;
    } catch (error) {
        return error;
    }
}