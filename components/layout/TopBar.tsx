"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function TopBar() {
    const pathname = usePathname();

    return (
        <div className={cn(
            "bg-primary text-primary-foreground py-2 px-4",
            pathname?.startsWith("/admin") && "md:ml-64 md:w-[calc(100%-16rem)]"
        )}>
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm gap-2 sm:gap-0 text-center sm:text-left">
                <span>We amplify unheard voices against discrimination</span>
                <a href="mailto:contact@rootsandroutes.org" className="hover:underline font-medium">
                    contact@rootsandroutes.org
                </a>
            </div>
        </div>
    );
}
