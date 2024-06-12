"use client";

import { getInterviewDetailsById } from '@/actions/interview';
import { InfoIcon, WebcamIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import Webcam from "react-webcam";
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { InterviewDetails } from '@/types/types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from 'next/link';

function Interview() {
    const {mockId} = useParams();
    const [interviewDetails, setInterviewDetails] = useState<InterviewDetails>();
    const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);

    useEffect(() => {
        const getInterviewDetails = async () => {
            try {
                const result = await getInterviewDetailsById(mockId as string);
                setInterviewDetails(result);
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    toast.error("An unknown error occurred.");
                }
            }
        }

        getInterviewDetails();
    }, [mockId]);

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
                                <p>Position: <span className="font-semibold">{interviewDetails?.jobRole}</span></p>
                            </CardContent>
                            <CardFooter>
                                <p>Years of experience: <span className="font-semibold">{interviewDetails?.jobExperience}</span></p>
                            </CardFooter>
                            <CardFooter>
                                <p>Skills: <span className="font-semibold">{interviewDetails?.jobDescription}</span></p>
                            </CardFooter>
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
                    <div className="w-full">
                    {
                        isWebCamEnabled ? (
                            <div>
                                <Webcam
                                width={400}
                                height={400}
                                mirrored={true}
                                onUserMedia={() => setIsWebCamEnabled(true)}
                                onUserMediaError={() => setIsWebCamEnabled(false)}
                                />
                            </div>
                        ):(
                            <div>
                                <div className="flex flex-col items-center justify-center gap-5 p-10 bg-muted h-[350px] max-h-[400px] rounded-xl">
                                    <WebcamIcon size={36} />
                                    <p className="font-medium">You have disabled your Web Camera</p>
                                </div>
                            </div>
                        )
                    }
                    <Button
                    className="mt-3 w-full bg-zinc-900 hover:bg-zinc-950 transition-all"
                    onClick={() => setIsWebCamEnabled(!isWebCamEnabled)}
                    >
                        {isWebCamEnabled ? "Disable" : "Enable"} access to your web camera and microphone
                    </Button>
                    </div>
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