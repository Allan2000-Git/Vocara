"use client";

import { getInterviewDetailsById } from '@/actions/interview';
import { InterviewDetails } from '@/types/types';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface InterviewContextType {
    getInterviewDetails: (mockId: string) => Promise<InterviewDetails>;
    interviewDetails: InterviewDetails;
    // setInterviewDetails: React.Dispatch<React.SetStateAction<InterviewDetails>>;
}

const defaultInterviewDetails: InterviewDetails = {
    id: '',
    userId: '',
    mockId: '',
    jobRole: '',
    jobExperience: '',
    jobDescription: '',
    mockResponse: {},
    createdAt: '',
};

const defaultContextValue: InterviewContextType = {
    getInterviewDetails: async (mockId: string) => {
        throw new Error('getInterviewDetails function not implemented');
    },
    interviewDetails: defaultInterviewDetails,
    // setInterviewDetails: () => {},
};

export const InterviewContext = createContext<InterviewContextType>(defaultContextValue);

export const InterviewContextProvider = ({children}:any) => {
    const [interviewDetails, setInterviewDetails] = useState<InterviewDetails>(defaultInterviewDetails);

    const getInterviewDetails = useCallback(async (mockId: string) => {
        try {
            const result = await getInterviewDetailsById(mockId);
            setInterviewDetails(result);
            return result;
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred.');
            }
            throw error;
        }
    }, []);

    return (
        <InterviewContext.Provider value={{interviewDetails, getInterviewDetails}}>
            {children}
        </InterviewContext.Provider>
    );
}

export const useInterviewContext = () => {
    return useContext(InterviewContext);
}