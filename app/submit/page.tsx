"use client"

import { SubmissionForm } from "@/components/forms/SubmissionForm"

export default function SubmitPage() {
    return (
        <div className="bg-background min-h-screen">
            {/* Hero Banner */}
            <section className="bg-secondary py-16 px-4 text-center">
                <div className="max-w-4xl mx-auto space-y-4">
                    <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground">
                        Share Your Story
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Your experience can help others feel less alone.
                    </p>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    <SubmissionForm />
                </div>
            </section>
        </div>
    )
}
