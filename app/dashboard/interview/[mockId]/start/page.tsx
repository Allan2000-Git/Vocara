"use client";

import Answer from '@/app/_components/Answer';
import Questions from '@/app/_components/Questions';
import { Button } from '@/components/ui/button';
import { useInterviewContext } from '@/context/InterviewContext';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function InterviewQuestions() {
    const {mockId} = useParams();
    const {interviewDetails, getInterviewDetails} = useInterviewContext();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(() => {
        const fetchDetails = async () => {
            await getInterviewDetails(mockId as string);
        };
        fetchDetails();
    }, [getInterviewDetails, mockId]);

    console.log(interviewDetails)

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Questions */}
                <Questions
                interviewQuestions={interviewDetails.mockResponse.interview_questions}
                activeQuestionIndex={activeQuestionIndex}
                setActiveQuestionIndex={setActiveQuestionIndex}
                />

                {/* Answer */}
                <Answer
                interviewQuestions={interviewDetails.mockResponse.interview_questions}
                activeQuestionIndex={activeQuestionIndex}
                setActiveQuestionIndex={setActiveQuestionIndex}
                interviewDetails={interviewDetails}
                />
            </div>
            <div className="flex items-center justify-center gap-5 mt-7">
                {
                    activeQuestionIndex > 0 &&
                    <Button
                    onClick={() => setActiveQuestionIndex(prev => prev - 1)}
                    variant={"outline"}
                    >
                        Previous
                    </Button>
                }
                {
                    activeQuestionIndex != interviewDetails.mockResponse.interview_questions?.length - 1 &&
                    <Button
                    onClick={() => setActiveQuestionIndex(prev => prev + 1)}
                    variant={"outline"}
                    >
                        Next
                    </Button>
                }
                {
                    activeQuestionIndex == interviewDetails.mockResponse.interview_questions?.length - 1 &&
                    <Link href={`/dashboard/interview/${mockId}/feedback`}>
                        <Button variant={"outline"}>End Interview</Button>
                    </Link>
                }
            </div>
        </div>
    )
}

export default InterviewQuestions