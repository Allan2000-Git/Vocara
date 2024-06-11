"use client";

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    GlowingStarsBackgroundCard,
    GlowingStarsTitle,
} from "@/components/ui/glowing-stars";
import {Loader2Icon, PlusIcon} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formSchema, JobSchemaType } from '@/types/types';
import { generateResponse } from '@/actions/response';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { createInterview } from '@/actions/interview';

function CreateNewInterview() {
    const [open, setOpen] = useState(false);
    const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
    const router = useRouter();

    const form = useForm<JobSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            jobRole: "",
            jobDescription: "",
            jobExperience: "",
            mockResponse: null,
        },
    });

    const handleFormSubmit = async (values: JobSchemaType) => {
        try {
            setIsGeneratingResponse(true);
            const validatedData = formSchema.parse(values);
            const mockResponse = await generateResponse(values);
            validatedData.mockResponse = JSON.parse(mockResponse);
            const result = await createInterview(validatedData);
            router.push(`/dashboard/interview/${result[0].mockId}`)
            toast.success("Room created successfully.");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        } finally {
            form.reset();
            setOpen(false);
            setIsGeneratingResponse(false);
        }
    }

    return (
        <>
            <div
            onClick={() => setOpen(true)}
            className="py-10 antialiased cursor-pointer">
                <GlowingStarsBackgroundCard>
                    <div className="flex items-center">
                        <GlowingStarsTitle>Create New Interview</GlowingStarsTitle>
                        <PlusIcon size={18} color="white" />
                    </div>
                </GlowingStarsBackgroundCard>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Create Your Ideal Job Profile</DialogTitle>
                    <DialogDescription>
                        Provide the details of the job you want to be interviewed for and customize your mock interview experience.
                    </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
                                <FormField
                                control={form.control}
                                name="jobRole"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Job Role/Position</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Frontend Engineer" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="jobDescription"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Job Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Ex: React.js, TypeScript, Redux Toolkit" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="jobExperience"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Job Experience (in years)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: 2" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <Button disabled={isGeneratingResponse} type="submit">
                                    {
                                        isGeneratingResponse ? (
                                            <>
                                                Generating Response
                                                <Loader2Icon className="animate-spin ml-2" size={18} />
                                            </>
                                        ):(
                                            "Start Interview"
                                        )
                                    }
                                </Button>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default CreateNewInterview