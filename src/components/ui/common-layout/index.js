import Header from '@/components/header'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const CommonLayout = async ({ children }) => {

    const user = await currentUser();

    return (
        <div className='mx-auto max-w-7xl p-6 lg:px-8'>
            {/* Header Component */}
            <Header
                user={JSON.parse(JSON.stringify(user))}
            />
            {/* Header Component */}

            {/* Main Content */}
            <main>{children}</main>
        </div>
    )
}

export default CommonLayout