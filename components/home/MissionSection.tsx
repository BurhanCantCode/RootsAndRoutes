"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function MissionSection() {
    return (
        <section className="bg-secondary py-20 md:py-32 px-4 relative overflow-hidden">
            {/* Decorative leaf maybe? */}

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                {/* Image Grid */}
                <div className="relative order-2 md:order-1">
                    <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] transform -rotate-2" />
                    <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg transform rotate-1 transition-transform hover:rotate-0 duration-500">
                        <Image
                            src="/images/generated/home-mission.png"
                            alt="Community Discussion"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="order-1 md:order-2 space-y-8">
                    <span className="inline-block text-primary font-bold tracking-wider uppercase text-sm bg-primary/10 px-4 py-1.5 rounded-full">
                        Our Mission
                    </span>

                    <h2 className="font-serif text-3xl md:text-5xl font-medium leading-tight text-foreground">
                        We believe every story matters.
                    </h2>

                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                        <p>
                            Roots and Routes was founded to create a platform where individuals can share their experiences with discrimination—whether based on race, gender, religion, or identity.
                        </p>
                        <p>
                            By amplifying these voices, we aim to build empathy, challenge prejudice, and inspire collective action for a more inclusive world.
                        </p>
                    </div>

                    <Button variant="outline" className="border-2 border-foreground rounded-full px-8 py-6 text-base hover:bg-foreground hover:text-white transition-all" asChild>
                        <Link href="/about">Learn More About Us</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
