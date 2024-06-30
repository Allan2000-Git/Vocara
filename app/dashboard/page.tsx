"use client";

import React, { useEffect, useState } from 'react'
import CreateNewInterview from '../_components/CreateNewInterview';
import { getInterviewDetails } from '@/actions/interview';
import { InterviewDetails } from '@/types/types';
import { toast } from 'sonner';
import InterviewCard from '../_components/InterviewCard';
import { Skeleton } from '@/components/ui/skeleton';

function Dashboard() {
    const [allInterviews, setAllInterviews] = useState<InterviewDetails[]>([]);

    const getDetails = async () => {
        try {
            const result = await getInterviewDetails();
            console.log(result)
            setAllInterviews(result as InterviewDetails[]);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred.');
            }
            throw error;
        }
    };

    useEffect(() => {
        getDetails();
    }, []);

    return (
        <div className="my-7">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Welcome to Your Dashboard 👋</h1>
                <h3 className="mt-5 text-xl font-medium">Create a <span className="gradient_span">New Interview</span> and <span className="gradient_span">Take Your Preparation to the Next Level</span></h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
                <CreateNewInterview />
            </div>
            <div className="mt-7">
                <h2 className="text-lg font-semibold">Your Previous Interview</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
                {
                    allInterviews.length > 0 ?
                    allInterviews.map((interview) => (
                        <InterviewCard key={interview.id} interview={interview} />
                    )) :
                    [...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="w-[300px] h-[300px]" />
                    ))
                }
                </div>
            </div>
        </div>
    );
}

export default Dashboard