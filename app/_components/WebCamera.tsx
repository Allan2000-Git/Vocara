"use client";

import { Button } from '@/components/ui/button';
import { WebcamIcon } from 'lucide-react';
import React, { useState } from 'react'
import Webcam from 'react-webcam';

function WebCamera() {
    const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);

    return (
        <div className="w-full">
            {
                isWebCamEnabled ? (
                    <div className="w-full">
                        <Webcam
                        width="100%"
                        height="400px"
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
    )
}

export default WebCamera