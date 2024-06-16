import { z } from "zod";

export const formSchema = z.object({
    jobRole: z.string().min(3, {message: "Must have minimum of 3 characters"}).max(50),
    jobDescription: z.string().min(3, {message: "Must have minimum of 3 characters"}).max(500),
    jobExperience: z.string().min(1, {message: "Add minimum experience to job your interviewing"}),
    mockResponse: z.any()
});

export type JobSchemaType = z.infer<typeof formSchema>;

export type InterviewDetails = {
    id: string;
    userId: string;
    mockId: string;
    jobRole: string;
    jobExperience: string;
    jobDescription: string;
    mockResponse: any;
    createdAt: string;
};

export type AnswerType = {
    mockId: string;
    question: string;
    possibleAnswer: string;
    userAnswer: string;
    feedback: string;
    overall_rating: number;
};
