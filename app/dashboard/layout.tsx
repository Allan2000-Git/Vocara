import React, { ReactNode } from 'react'

function DashboardLayout({children}:{children: ReactNode}) {
    return (
        <div className="mt-[125px] max-w-7xl mx-auto px-8">
            {children}
        </div>
    )
}

export default DashboardLayout