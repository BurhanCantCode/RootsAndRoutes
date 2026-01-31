"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FAQPage() {
    return (
        <div className="bg-background min-h-screen">
            <section className="bg-secondary py-16 px-4 text-center">
                <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">
                    Frequently Asked Questions
                </h1>
                <p className="text-muted-foreground text-lg">
                    Everything you need to know about us
                </p>
            </section>

            <section className="py-16 px-4">
                <div className="max-w-2xl mx-auto space-y-8">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        <AccordionItem value="item-1" className="border rounded-xl px-4 bg-white/50">
                            <AccordionTrigger className="text-lg font-medium hover:no-underline">How can I help?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                You can help by sharing your own story, donating to support our platform, or simply reading and sharing these stories with your community to foster understanding.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="border rounded-xl px-4 bg-white/50">
                            <AccordionTrigger className="text-lg font-medium hover:no-underline">Where does my donation go?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Donations go directly towards maintaining our platform, reviewing submissions, and organizing community outreach programs.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="border rounded-xl px-4 bg-white/50">
                            <AccordionTrigger className="text-lg font-medium hover:no-underline">How do I submit my story?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                You can submit your story through our submission form. Click "Share Your Story" in the navigation, review the guidelines, and fill out the form. All submissions are reviewed before being published.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4" className="border rounded-xl px-4 bg-white/50">
                            <AccordionTrigger className="text-lg font-medium hover:no-underline">Who reviews submitted content?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Our content team, comprised of diverse individuals trained in sensitivity and editorial guidelines, reviews each submission.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-5" className="border rounded-xl px-4 bg-white/50">
                            <AccordionTrigger className="text-lg font-medium hover:no-underline">Can I submit anonymously?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                Yes, you can choose to remain anonymous when submitting your story. We will only use your name internally if needed for verification, but it will not be published.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="text-center pt-12 border-t mt-12">
                        <p className="mb-6 font-serif text-xl">Still have questions?</p>
                        <Button className="rounded-full px-8" asChild>
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
