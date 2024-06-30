import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { InterviewDetails } from '@/types/types';
import { Button } from '@/components/ui/button';
import moment from 'moment';
import Link from 'next/link';

interface InterviewCardProps {
    interview: InterviewDetails;
}

function InterviewCard({interview}:InterviewCardProps) {
    const dateString = interview.createdAt.toString();
    const cleanedDateString = dateString.replace(/(\d+)(th|st|nd|rd)/, '$1');
    const createdAt = moment(cleanedDateString, "MMMM D YYYY, h:mm:ss a").format("MMM Do YYYY");

    return (
        <Card>
            <CardHeader>
                <CardTitle>{interview.jobRole}</CardTitle>
                <CardDescription>{interview.jobDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="font-medium">{interview.jobExperience} years of experience</p>
                <p className="text-sm text-gray-600">Done on: {createdAt}</p>
            </CardContent>
            <CardFooter>
                <Link href={`/dashboard/interview/${interview.mockId}/feedback`}>
                    <Button>Go to Feedback</Button>
                </Link>
            </CardFooter>
        </Card>

    )
}

export default InterviewCard