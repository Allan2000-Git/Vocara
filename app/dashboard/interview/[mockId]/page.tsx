"use client";

import { InfoIcon} from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from 'next/link';
import { useInterviewContext } from '@/context/InterviewContext';
import { Skeleton } from '@/components/ui/skeleton';
import WebCamera from '@/app/_components/WebCamera';

function Interview() {
    const {mockId} = useParams();
    const {interviewDetails, getInterviewDetails} = useInterviewContext();

    useEffect(() => {
        const fetchDetails = async () => {
            await getInterviewDetails(mockId as string);
        };
        fetchDetails();
    }, [getInterviewDetails, mockId]);

    return (
        <>
            <div className="w-full">
                <h1>Let&apos;s get you started</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 my-7 gap-10">
                    <div className="flex flex-col justify-between">
                        <Card>
                            <CardHeader>
                                <CardTitle>Interview Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {
                                    interviewDetails.jobRole ?
                                    <p>Position: <span className="font-semibold">{interviewDetails.jobRole}</span></p>  :
                                    <Skeleton className="h-5 rounded-full" />
                                }
                            </CardContent>
                            <CardContent>
                                {
                                    interviewDetails.jobExperience ?
                                    <p>Years of experience: <span className="font-semibold">{interviewDetails.jobExperience}</span></p>  :
                                    <Skeleton className="h-5 rounded-full" />
                                }
                            </CardContent>
                            <CardContent>
                                {
                                    interviewDetails.jobDescription ?
                                    <p>Skills: <span className="font-semibold">{interviewDetails.jobDescription}</span></p>  :
                                    <Skeleton className="h-5 rounded-full" />
                                }
                            </CardContent>
                        </Card>
                        <Alert className="text-yellow-500 border-yellow-500">
                            <InfoIcon className="h-4 w-4 text-yellow-500" />
                            <AlertTitle>Please Note</AlertTitle>
                            <AlertDescription>
                                At Vocara, your privacy is our priority. We do not capture videos or photos without your explicit consent.
                                If you have any concerns, please contact our support team.
                            </AlertDescription>
                        </Alert>

                    </div>
                    <WebCamera />
                </div>
                <Link
                href={`/dashboard/interview/${mockId}/start`}>
                    <Button>Start the Interview</Button>
                </Link>
            </div>
        </>
    );
}

export default Interview