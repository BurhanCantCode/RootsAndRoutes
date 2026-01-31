import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTABanner() {
    return (
        <section className="bg-primary py-24 px-4 text-primary-foreground relative overflow-hidden">
            {/* Background decorative doodles or texture could go here */}

            <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
                <h2 className="font-serif text-4xl md:text-5xl font-medium leading-tight text-white">
                    Your Story Matters
                </h2>
                <p className="text-teal-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Have you experienced discrimination? Your voice can help others feel less alone and drive meaningful change.
                </p>

                <div className="pt-4">
                    <Button className="bg-white text-primary hover:bg-neutral-100 rounded-full px-10 py-7 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1" asChild>
                        <Link href="/submit">Share Your Story</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
