import React from 'react'
import { Badge } from "@/components/ui/badge"
import { cn } from '@/lib/utils';
import { LightbulbIcon, Volume2Icon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from "@/components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface IQuestionsProps {
    interviewQuestions: [];
    activeQuestionIndex: number;
    setActiveQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

function Questions({interviewQuestions, activeQuestionIndex, setActiveQuestionIndex}: IQuestionsProps) {
    const textToSpeech = (textToSpeak: string) => {
        if (textToSpeak) {
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            speechSynthesis.speak(utterance);
        }
    }

    return (
        <div className="p-5 border rounded-lg shadow-md flex flex-col justify-between">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {
                    interviewQuestions ? interviewQuestions.map((question, index) => (
                        <Badge
                        key={index}
                        variant="outline"
                        className={
                            cn("flex justify-center cursor-pointer py-1.5", {
                                "bg-primary text-white border-none": activeQuestionIndex === index
                            })
                        }
                        onClick={() => setActiveQuestionIndex(index)}
                        >
                            Question #{index+1}
                        </Badge>
                    )) : (
                        [...Array(5)].map((_,index) => (
                            <BadgeSkeleton key={index} />
                        ))
                    )
                }
            </div>
            <div className="my-7">
                {
                    interviewQuestions ? (
                        <>
                            {/* @ts-ignore */}
                            <p>{interviewQuestions[activeQuestionIndex].question}</p>
                            <TooltipProvider delayDuration={50}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Volume2Icon
                                        size={20}
                                        className="mt-3 cursor-pointer"
                                        // @ts-ignore
                                        onClick={() => textToSpeech(interviewQuestions[activeQuestionIndex].question)}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Click here to listen the question verbally</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </>
                    ):(
                        <div className="space-y-2 w-full">
                            <Skeleton className="h-5 rounded-full" />
                            <Skeleton className="h-5 rounded-full" />
                        </div>
                    )
                }
            </div>
            <Alert className="text-yellow-500 border-yellow-500">
                <LightbulbIcon className="h-4 w-4 text-yellow-500" />
                <AlertTitle>Please Note</AlertTitle>
                <AlertDescription>
                    Please click on &apos;Start Recording&apos; whenever you&apos;re ready to begin your response.
                    Feel free to take your time to answer thoughtfully. Once you&apos;re done, click on &apos;Stop Recording.&apos;
                    We will provide you with feedback shortly after completing all the questions.
                </AlertDescription>
            </Alert>
        </div>
    )
}

export default Questions

function BadgeSkeleton() {
    return (
        <Skeleton className="w-[122px] h-[30px] rounded-full" />
    )
}