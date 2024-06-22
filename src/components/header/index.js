'use client'

import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { AlignJustify } from 'lucide-react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

const Header = ({ user }) => {

    const menuItems = [
        {
            label: 'Home',
            path: '/',
            show: true
        },
        {
            label: 'Login',
            path: '/sign-in',
            show: !user
        },
        {
            label: 'Register',
            path: '/sign-up',
            show: !user
        },
        {
            label: 'Jobs',
            path: '/jobs',
            show: user
        },
        {
            label: 'Activity',
            path: '/activity',
            show: user
        },
        {
            label: 'Membership',
            path: '/membership',
            show: user
        },
        {
            label: 'Account',
            path: '/account',
            show: user
        }
    ]

    return (
        <div>
            <header className='flex h-16 w-full shrink-0 items-center'>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="lg:hidden">
                            <AlignJustify className='h-6 w-6' />
                            <span className='sr-only'>Toggle Navigation Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <Link className='mr-6 hidden lg:flex' href={'#'}>
                            <h3 className='font-extrabold'>JOBSCO</h3>
                        </Link>
                        <div className='grid gap-2 py-6'>
                            <UserButton afterSignOutUrl='/' />
                            {
                                menuItems.map(menuItem => menuItem.show ?
                                    <Link href={menuItem.path} className='flex w-full items-center py-2 text-lg font-semibold'>
                                        {menuItem.label}
                                    </Link>
                                    : null
                                )
                            }
                        </div>
                    </SheetContent>
                </Sheet>
                <Link href={'/'} className='hidden lg:flex mr-6'>
                    <h3 className='font-extrabold'>JOBSCO</h3>
                </Link>
                <nav className='ml-auto hidden lg:flex gap-6'>
                    {
                        menuItems.map(menuItem => menuItem.show ?
                            <Link
                                href={menuItem.path}
                                className='group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium'>
                                {menuItem.label}
                            </Link>
                            : null
                        )
                    }
                    <UserButton afterSignOutUrl='/' />
                </nav>
            </header>

        </div>
    )
}

export default Header