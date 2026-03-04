"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LeafIcon } from "@/components/decorative"

export function Hero() {
    return (
        <section className="relative overflow-hidden px-4 pt-16 pb-24 md:pt-24 md:pb-32 bg-background">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

                {/* Social Icons */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex gap-4 mb-8 text-muted-foreground"
                >
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                    <a href="https://www.instagram.com/rootsandroutes.global?igsh=MWQ0ODd0NzRjb3dpdQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="flex gap-2 items-center hover:text-primary transition-colors">
                        <Instagram className="h-4 w-4" />
                        <span className="text-sm">@rootsandroutes.global</span>
                    </a>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="font-serif text-5xl md:text-7xl font-medium leading-tight text-foreground max-w-4xl mx-auto mb-6"
                >
                    Every Voice <span className="inline-flex items-center align-middle mx-2 text-primary"><LeafIcon className="w-10 h-10 md:w-16 md:h-16" /></span> Has A Story
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
                >
                    We share personal stories of discrimination to foster understanding and drive change.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 mb-20"
                >
                    <Button className="rounded-full px-8 py-6 text-base bg-foreground hover:bg-neutral-800 text-white" asChild>
                        <Link href="/donate">
                            Donate Now <ArrowUpRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                    <Button variant="outline" className="rounded-full px-8 py-6 text-base border-2 border-foreground text-foreground hover:bg-foreground hover:text-white" asChild>
                        <Link href="/stories">Read Stories</Link>
                    </Button>
                </motion.div>

            </div>
        </section>
    )
}
