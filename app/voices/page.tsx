import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function MeetTheVoicesPage() {
    return (
        <div className="bg-background min-h-screen">
            <section className="bg-secondary py-20 px-4 text-center">
                <div className="max-w-4xl mx-auto space-y-6">
                    <h1 className="font-serif text-5xl md:text-6xl font-medium text-foreground">
                        Meet the Voices Behind Documentary
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Every story has a voice. Get to know the brave individuals who shared their experiences in our documentary "Inside Still Human."
                    </p>
                </div>
            </section>

            <section className="py-16 px-4 max-w-4xl mx-auto text-center">
                <p className="text-muted-foreground mb-8">
                    Content mapping for the document "Inside Still Human: Meet the Voices Behind Documentary" will be placed here once the details are provided.
                </p>
                <Link href="/" className="inline-flex items-center text-primary hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>
            </section>
        </div>
    )
}
