"use client"

import { ArrowUpRight, BookOpen } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BlogPage() {
    return (
        <div className="bg-background min-h-screen">
            <section className="bg-secondary py-20 px-4 text-center">
                <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">
                    News & Updates
                </h1>
                <p className="text-muted-foreground text-lg">
                    Read our articles and stay informed
                </p>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white border rounded-2xl p-8 md:p-12 text-center shadow-sm space-y-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-8 h-8 text-primary" />
                        </div>

                        <h2 className="font-serif text-3xl font-bold">We publish on Substack</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Our articles, updates, and deep-dives on discrimination and social justice live on our Substack newsletter. Subscribe to get full access to the newsletter and website.
                        </p>

                        <div className="pt-4">
                            <Button size="lg" className="rounded-full px-8 bg-[#FF6719] hover:bg-[#FF6719]/90 text-white font-semibold" asChild>
                                <Link href="https://substack.com" target="_blank">
                                    Visit Our Substack <ArrowUpRight className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
