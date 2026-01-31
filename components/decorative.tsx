import React from 'react';

export function FlowerDoodle({ className, ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className={className} {...props}>
            <circle cx="30" cy="30" r="8" fill="currentColor" />
            <ellipse cx="30" cy="12" rx="6" ry="10" fill="currentColor" />
            <ellipse cx="30" cy="48" rx="6" ry="10" fill="currentColor" />
            <ellipse cx="12" cy="30" rx="10" ry="6" fill="currentColor" />
            <ellipse cx="48" cy="30" rx="10" ry="6" fill="currentColor" />
            <ellipse cx="17" cy="17" rx="6" ry="10" transform="rotate(-45 17 17)" fill="currentColor" />
            <ellipse cx="43" cy="43" rx="6" ry="10" transform="rotate(-45 43 43)" fill="currentColor" />
            <ellipse cx="43" cy="17" rx="6" ry="10" transform="rotate(45 43 17)" fill="currentColor" />
            <ellipse cx="17" cy="43" rx="6" ry="10" transform="rotate(45 17 43)" fill="currentColor" />
        </svg>
    );
}

export function LeafIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} {...props}>
            <path d="M12 22V12M12 12C12 12 12 8 8 4C4 8 4 12 4 12C4 16 8 12 12 12ZM12 12C12 12 12 8 16 4C20 8 20 12 20 12C20 16 16 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}
