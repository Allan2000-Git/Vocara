// @ts-nocheck

"use client";

import React, { useEffect, useState } from 'react'
import WebCamera from './WebCamera'
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CircleStopIcon, Loader2Icon, SparklesIcon } from 'lucide-react';
import { generateFeedback } from '@/actions/response';
import { storeAnswer } from '@/actions/interview';
import { InterviewDetails } from '@/types/types';

interface IAnswerProps {
    interviewQuestions: [];
    activeQuestionIndex: number;
    setActiveQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    interviewDetails: InterviewDetails;
}

function Answer({interviewQuestions, activeQuestionIndex, setActiveQuestionIndex, interviewDetails}: IAnswerProps) {
    const [answer, setAnswer] = useState("");
    const [isStoringAnswerToDB, setIsStoringAnswerToDB] = useState(false);

    const {
        error,
        interimResult,
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    const recordAnswer = () => {
        if(isRecording) {
            stopSpeechToText();
        } else {
            setResults([]);
            setAnswer("");
            startSpeechToText();
        }
    }

    const saveAnswer = async () => {
        try {
            if(answer.length === 0) {
                toast.error("No answer was recorded. Please try again.");
                return;
            }
            if(answer.length < 10) {
                toast.error("Your answer was too short. Please confirm your answer before proceeding.");
                return;
            }
            setIsStoringAnswerToDB(true);
            let mockResponse = await generateFeedback(interviewQuestions[activeQuestionIndex].question, answer);
            mockResponse = JSON.parse(mockResponse);
            const result = await storeAnswer({
                mockId: interviewDetails.mockId,
                question: interviewQuestions[activeQuestionIndex].question,
                possibleAnswer: interviewQuestions[activeQuestionIndex].answer_example,
                userAnswer: answer,
                feedback: mockResponse.feedback,
                overall_rating: mockResponse.overall_rating
            });
            toast.success("Answer has been stored successfully.");
            if(activeQuestionIndex >= 0 && activeQuestionIndex < 5){
                setActiveQuestionIndex(prev => prev + 1);
            } else {
                toast.success("You have answered all the questions.");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        } finally {
            setIsStoringAnswerToDB(false);
            setResults([]);
            setAnswer("");
        }
    }

    useEffect(() => {
        if(results.length > 0){
            results.map((result) => setAnswer(prev => prev + result.transcript));
        }
    },[results])

    if (error) return toast.error("Web Speech API is not available in this browser 🤷");

    return (
        <div>
            <WebCamera />
            <div className="mt-7 flex items-center justify-center gap-3">
                <Button
                className={`${isRecording && "bg-red-500 hover:bg-red-600"}`}
                onClick={recordAnswer}
                >
                    {isRecording ? <span className="flex items-center gap-3"><CircleStopIcon size={18} /> Stop Recording</span> : <span className="flex items-center gap-3"><SparklesIcon size={18} /> Start Recording</span>}
                </Button>
                <Button
                onClick={saveAnswer}
                disabled={isRecording || isStoringAnswerToDB}
                >
                    {
                        isStoringAnswerToDB ? (
                            <>
                                Saving Answer
                                <Loader2Icon className="animate-spin ml-2" size={18} />
                            </>
                        ):(
                            "Save Answer"
                        )
                    }
                </Button>
            </div>
        </div>
    )
}

export default Answer