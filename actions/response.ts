"use server";

import { chatSession } from "@/lib/vocaraAIModel";
import { JobSchemaType } from "@/types/types";

export async function generateResponse(values: JobSchemaType) {
    console.log(values);

    const INPUT_PROMPT = `Generate 5 interview questions and a general answers for a ${values.jobRole} on the candidate's experience in
    ${values.jobDescription}, with ${values.jobExperience} years of professional experience. Focus on assessing their depth of knowledge,
    practical application of skills, problem-solving abilities, and understanding of industry best practices. Ensure the questions reflect the
    expectations for someone with their specific experience level, emphasizing both technical skills and real-world project insights.
    Give the result in JSON format.`

    const result = await chatSession.sendMessage(INPUT_PROMPT);
    const mockResponse = (result.response.text()).replace("```json", "").replace("```","");
    return mockResponse;
}