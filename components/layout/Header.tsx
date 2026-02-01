"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Sprout } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Stories", href: "/stories" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
]

export function Header() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <header className={cn(
            "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            pathname?.startsWith("/admin") && "md:ml-64 md:w-[calc(100%-16rem)]"
        )}>
            <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight text-primary">
                    <Sprout className="h-6 w-6" />
                    <span>Roots & Routes</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "transition-colors hover:text-primary",
                                pathname === item.href ? "text-primary font-semibold" : "text-muted-foreground"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Button asChild className="rounded-full bg-primary hover:bg-teal-hover text-white">
                        <Link href="/submit">Share Your Story</Link>
                    </Button>
                </nav>

                {/* Mobile Nav */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                            <div className="flex flex-col gap-6 mt-8">
                                <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary" onClick={() => setIsOpen(false)}>
                                    <Sprout className="h-6 w-6" />
                                    <span>Roots & Routes</span>
                                </Link>
                                <nav className="flex flex-col gap-4">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "text-lg font-medium transition-colors hover:text-primary",
                                                pathname === item.href ? "text-primary" : "text-muted-foreground"
                                            )}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                    <Button asChild className="w-full rounded-full bg-primary hover:bg-teal-hover text-white mt-4">
                                        <Link href="/submit" onClick={() => setIsOpen(false)}>Share Your Story</Link>
                                    </Button>
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
