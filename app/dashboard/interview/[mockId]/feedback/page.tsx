"use client";

import { getAnswersById } from '@/actions/interview';
import { useInterviewContext } from '@/context/InterviewContext';
import { AnswerType } from '@/types/types';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import MarkdownPreview from "@uiw/react-markdown-preview";
import FeedbackStats from '@/app/_components/FeedbackStats';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { Skeleton } from '@/components/ui/skeleton';

function Feedback() {
    const {mockId} = useParams();
    const { width, height } = useWindowSize();

    const [interviewFeedbackDetails, setInterviewFeedbackDetails] = useState<AnswerType[]>([]);

    const getFeedbackDetails = useCallback(async () => {
        try {
            const result = await getAnswersById(mockId as string);
            setInterviewFeedbackDetails(result as AnswerType[]);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred.');
            }
            throw error;
        }
    }, [mockId]);

    const overallTotalRating = interviewFeedbackDetails.reduce((accumulator, currVal) => accumulator + currVal.overall_rating, 0);
    const aboveAverage = interviewFeedbackDetails.filter(feedback => feedback.overall_rating > 2).length;

    // Calculate the improvement percentage
    const calculateImprovementPercentage = (countAboveTwo: number, total_questions: number) => {
        return (((5 - countAboveTwo) / total_questions) * 100);
    };
    const improvementPercentage = calculateImprovementPercentage(aboveAverage, 5);

    useEffect(() => {
        getFeedbackDetails();
    }, [getFeedbackDetails, mockId]);

    return (
        <div>
            <Confetti
            width={width}
            height={height}
            recycle={false}
            />
            <div className="text-center space-y-3">
                <h1 className="text-4xl font-bold text-green-500">Congratulations !!</h1>
                <h2 className="text-lg font-medium text-secondary">You have successfully completed your interview</h2>
            </div>
            <FeedbackStats
            overallTotalRating={overallTotalRating}
            aboveAverage={aboveAverage}
            improvementPercentage={improvementPercentage}
            />
            <p className="my-7">Below is a brief feedback on your performance</p>
            <div className="w-full">
                    {
                        interviewFeedbackDetails.length > 0 ?
                        interviewFeedbackDetails.map((mockInterview) => (
                            <Accordion
                            key={mockInterview.id}
                            type="single"
                            collapsible
                            className="my-5"
                            >
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="">{mockInterview.question}</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="font-medium text-lg">Points: {mockInterview.overall_rating}/{process.env.MAX_QUESTION || 5}</p>
                                    </AccordionContent>
                                    <AccordionContent>
                                        <MarkdownPreview
                                        source={mockInterview.feedback}
                                        wrapperElement={{
                                            "data-color-mode": "light"
                                        }}
                                        className="font-markdown"
                                        />
                                    </AccordionContent>
                                    <AccordionContent>
                                        <p className="text-secondary">Tips: {mockInterview.possibleAnswer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                        </Accordion>
                    )):(
                        <Skeleton className="w-full h-[65px]" />
                    )
                }
            </div>
        </div>
    )
}

export default Feedback