import { Button } from "@/components/ui/button"
import { StoriesList } from "@/components/stories/StoriesList"
import db from "@/lib/db"

export const dynamic = 'force-dynamic' // Ensure it fetches fresh data

export default async function StoriesPage() {
    // Fetch stories from database
    const stories = await db.story.findMany({
        orderBy: { createdAt: 'desc' },
        where: { status: { not: "REJECTED" } } // Show PENDING for now so user sees their submission, or strictly APPROVED
    })

    // Map Prisma result to the shape expected by UI
    const mappedStories = stories.map(s => ({
        id: s.id,
        type: s.type as "written" | "photo" | "video",
        title: s.title,
        excerpt: s.excerpt || s.content.substring(0, 150) + "...",
        authorName: s.authorName || "Anonymous",
        image: s.imageUrl || "/images/generated/story-context.png" // Fallback
    }))

    return (
        <div className="bg-background min-h-screen">
            {/* Hero */}
            <section className="bg-secondary py-20 px-4 text-center">
                <div className="max-w-4xl mx-auto space-y-6">
                    <h1 className="font-serif text-5xl md:text-6xl font-medium text-foreground">
                        Stories of Resilience
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Real experiences shared by real people. Read, listen, and learn.
                    </p>
                    <Button className="rounded-full px-8 py-6 text-base bg-primary text-white hover:bg-teal-hover shadow-lg" asChild>
                        <a href="/submit">Share Your Story</a>
                    </Button>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 px-4">
                <StoriesList initialStories={mappedStories} />
            </section>
        </div>
    )
}
