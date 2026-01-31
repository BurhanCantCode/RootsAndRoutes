import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StoryCard, Story } from "@/components/stories/StoryCard"
import { MessageCircle } from "lucide-react"

const FEATURED_STORIES: Story[] = [
    {
        id: "1",
        type: "written",
        title: "The Day Everything Changed at Work",
        excerpt: "I never thought my natural hair would be a topic of discussion in a corporate boardroom, until it was.",
        authorName: "Sarah M.",
        image: "/images/generated/story-sarah.png"
    },
    {
        id: "2",
        type: "video",
        title: "After years of silence, I'm speaking up",
        excerpt: "Growing up in a small town, sticking out wasn't safe. Now I'm reclaiming my narrative.",
        authorName: "James K.",
        image: "/images/generated/story-james.png"
    },
    {
        id: "3",
        type: "photo",
        title: "Growing up between two cultures",
        excerpt: "Too foreign for home, too foreign for here. The eternal struggle of the third culture kid.",
        authorName: "Anonymous",
        image: "/images/generated/story-anon.png"
    }
]

export function FeaturedStories() {
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {FEATURED_STORIES.map(story => (
                        <StoryCard key={story.id} story={story} />
                    ))}
                </div>

                <div className="text-center">
                    <Button variant="outline" className="border-2 border-foreground rounded-full px-10 py-6 text-base hover:bg-foreground hover:text-white transition-all" asChild>
                        <Link href="/stories">View All Stories</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
