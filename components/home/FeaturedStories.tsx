import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StoryCard } from "@/components/stories/StoryCard"
import { MessageCircle } from "lucide-react"
import db from "@/lib/db"

export async function FeaturedStories() {
    const stories = await db.story.findMany({
        where: { status: "APPROVED" },
        orderBy: { createdAt: 'desc' },
        take: 3
    })

    const mappedStories = stories.map(s => ({
        id: s.id,
        type: s.types[0] as "written" | "photo" | "video",
        title: s.title,
        excerpt: s.excerpt || s.content.substring(0, 150) + "...",
        authorName: s.isAnonymous ? "Anonymous" : (s.authorName || "Anonymous"),
        image: s.imageUrl || "/images/anonymous_profile.png"
    }))

    return (
        <section className="py-24 px-4 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 px-4">
                    <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">
                        Voices That <MessageCircle className="inline-block w-8 h-8 md:w-10 md:h-10 text-primary -mt-2 rotate-12" /> Inspire Change
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Read powerful accounts from real people who are breaking the silence.
                    </p>
                </div>

                {mappedStories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {mappedStories.map(story => (
                            <StoryCard key={story.id} story={story} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground mb-16 py-12">
                        <p className="text-lg">No stories yet. Be the first to share yours!</p>
                    </div>
                )}

                <div className="text-center">
                    <Button variant="outline" className="border-2 border-foreground rounded-full px-10 py-6 text-base hover:bg-foreground hover:text-white transition-all" asChild>
                        <Link href="/stories">View All Stories</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
