import React from 'react';
import { PlugZapIcon, SmileIcon, TargetIcon } from 'lucide-react';
import FeedbackStatsSkeleton from './FeedbackStatsSkeleton';

interface FeedbackStatsProps {
    overallTotalRating: number;
    aboveAverage: number;
    improvementPercentage: number;
}

function FeedbackStats({overallTotalRating, aboveAverage, improvementPercentage}:FeedbackStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {
                overallTotalRating ? (
                    <div className="mt-10 bg-blue-200 rounded-lg p-5 font-semibold flex place-items-end justify-between">
                        <div>
                            Overall Points
                            <span className="block mt-2 text-3xl text-blue-800 font-bold">{overallTotalRating / 5}/5</span>
                        </div>
                        <TargetIcon size={40} className="text-blue-800" />
                    </div>
                ):(
                    <FeedbackStatsSkeleton />
                )
            }
            {
                aboveAverage ? (
                    <div className="mt-10 bg-green-200 rounded-lg p-5 font-semibold flex place-items-end justify-between">
                        <div>
                            Above Average
                            <span className="block mt-2 text-3xl text-green-800 font-bold">{aboveAverage}/5</span>
                        </div>
                        <SmileIcon size={40} className="text-green-800" />
                    </div>
                ):(
                    <FeedbackStatsSkeleton />
                )
            }
            {
                improvementPercentage && aboveAverage ? (
                    <div className="mt-10 bg-red-200 rounded-lg p-5 font-semibold flex place-items-end justify-between">
                        <div>
                            Improvement
                            <span className="block mt-2 text-3xl text-red-800 font-bold">{improvementPercentage}%</span>
                        </div>
                        <PlugZapIcon size={40} className="text-red-800" />
                    </div>
                ):(
                    <FeedbackStatsSkeleton />
                )
            }
        </div>
    )
}

export default FeedbackStats