import Link from "next/link"
import { ArrowLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DonatePage() {
    return (
        <div className="bg-background min-h-screen">
            <section className="bg-secondary py-20 px-4 text-center">
                <div className="max-w-4xl mx-auto space-y-6">
                    <Heart className="w-16 h-16 mx-auto text-primary mb-6" />
                    <h1 className="font-serif text-5xl md:text-6xl font-medium text-foreground">
                        Support Our Mission
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Your contribution helps us continue to amplify voices, foster understanding, and challenge prejudice around the world.
                    </p>
                </div>
            </section>

            <section className="py-24 px-4 max-w-4xl mx-auto text-center">
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-border/50 max-w-2xl mx-auto">
                    <h2 className="font-serif text-3xl font-medium text-foreground mb-6">
                        Donation Portal Coming Soon
                    </h2>
                    <p className="text-lg text-muted-foreground mb-4">
                        We are currently setting up our secure donation processing system. Check back soon for ways to support Roots & Routes financially.
                    </p>
                    <p className="text-lg text-muted-foreground mb-8">
                        For donations, please contact us at:{' '}
                        <a href="mailto:rootsandroutes34@gmail.com" className="text-primary hover:underline font-medium">rootsandroutes34@gmail.com</a>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild variant="outline" className="rounded-full px-8">
                            <Link href="/">Return Home</Link>
                        </Button>
                        <Button asChild className="rounded-full px-8 bg-primary hover:bg-teal-hover text-white">
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
