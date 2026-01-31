"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Facebook, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LeafIcon, FlowerDoodle } from "@/components/decorative"

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
                    <div className="flex gap-3">
                        <Facebook className="h-4 w-4 hover:text-primary transition-colors cursor-pointer" />
                        <Linkedin className="h-4 w-4 hover:text-primary transition-colors cursor-pointer" />
                        <Twitter className="h-4 w-4 hover:text-primary transition-colors cursor-pointer" />
                    </div>
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

                {/* Images Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-center w-full max-w-6xl mx-auto"
                >
                    {/* Left Image - Tilted Left */}
                    <div className="relative group md:translate-y-12">
                        <FlowerDoodle className="absolute -top-10 -left-10 text-coral w-20 h-20 z-10 hidden md:block animate-pulse" />
                        <div className="relative aspect-[3/4] w-full transform md:-rotate-3 transition-transform duration-500 hover:rotate-0 hover:scale-105 rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/images/generated/hero-portrait.png"
                                alt="Portrait"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Center Image - Straight */}
                    <div className="relative z-20">
                        <div className="relative aspect-[4/5] w-full transform transition-transform duration-500 hover:scale-105 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                            <Image
                                src="/images/generated/hero-community.png"
                                alt="Community grouping"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Image - Tilted Right */}
                    <div className="relative md:translate-y-12">
                        <div className="relative aspect-[3/4] w-full transform md:rotate-3 transition-transform duration-500 hover:rotate-0 hover:scale-105 rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/images/generated/hero-friends.png"
                                alt="Friends laughing"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
