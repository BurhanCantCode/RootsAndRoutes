import React from 'react';

export function TopBar() {
    return (
        <div className="bg-primary text-primary-foreground py-2 px-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm gap-2 sm:gap-0 text-center sm:text-left">
                <span>We amplify unheard voices against discrimination</span>
                <a href="mailto:contact@rootsandroutes.org" className="hover:underline font-medium">
                    contact@rootsandroutes.org
                </a>
            </div>
        </div>
    );
}
