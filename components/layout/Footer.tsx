"use client"

import React from 'react';
import Link from 'next/link';
import { Sprout, Linkedin, Instagram } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Footer() {
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();

    return (
        <footer className={cn(
            "bg-light-green border-t border-border/50",
            pathname?.startsWith("/admin") && "md:ml-64 md:w-[calc(100%-16rem)]"
        )}>
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                {/* ... rest of footer ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Column 1: Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary">
                            <Sprout className="h-6 w-6" />
                            <span>Roots & Routes</span>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed max-w-xs">
                            Amplifying voices, fostering change. We share personal stories of discrimination to drive meaningful understanding.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="font-serif text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
                        <ul className="space-y-3">
                            {['Home', 'About', 'Stories', 'Donate'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div>
                        <h3 className="font-serif text-lg font-semibold mb-4 text-foreground">Support</h3>
                        <ul className="space-y-3">
                            {['Contact', 'FAQ', 'Privacy Policy', 'Terms of Use'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={`/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Connect */}
                    <div>
                        <h3 className="font-serif text-lg font-semibold mb-4 text-foreground">Connect</h3>
                        <div className="flex gap-4 mb-6">
                            <a href="#" className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <a href="mailto:contact@rootsandroutes.org" className="hover:underline">contact@rootsandroutes.org</a>
                        </p>
                    </div>
                </div>

                <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {currentYear} Roots and Routes. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/terms" className="hover:text-primary">Terms of Use</Link>
                        <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
