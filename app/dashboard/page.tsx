import React from 'react'
import CreateNewInterview from '../_components/CreateNewInterview';

function Dashboard() {
    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Welcome to Your Dashboard 👋</h1>
                <h3 className="mt-5 text-xl font-medium">Create a <span className="gradient_span">New Interview</span> and <span className="gradient_span">Take Your Preparation to the Next Level</span></h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
                <CreateNewInterview />
            </div>
        </div>
    );
}

export default Dashboard