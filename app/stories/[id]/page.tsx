import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Facebook, Linkedin, Twitter, Link as LinkIcon } from "lucide-react"
import { StoryCard } from "@/components/stories/StoryCard"
import { Button } from "@/components/ui/button"
import db from "@/lib/db"

export default async function SingleStoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    // Fetch story from DB
    const story = await db.story.findUnique({
        where: { id }
    })

    if (!story || story.status !== "APPROVED") {
        notFound()
    }

    // Fetch related stories (just get 3 random recent ones for now)
    const relatedDb = await db.story.findMany({
        where: { id: { not: id }, status: "APPROVED" },
        take: 3,
        orderBy: { createdAt: 'desc' }
    })

    const related = relatedDb.map(s => ({
        id: s.id,
        type: s.types[0] as "written" | "photo" | "video",
        title: s.title,
        excerpt: s.excerpt || s.content.substring(0, 150) + "...",
        authorName: s.authorName || "Anonymous",
        image: s.imageUrl || "/images/generated/story-context.png"
    }))

    return (
        <div className="bg-background min-h-screen pb-24">

            {/* Back Link */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <Link href="/stories" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Stories
                </Link>
            </div>

            {/* Featured Image */}
            <div className="max-w-4xl mx-auto px-4 mb-12">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                    {/* Fallback image if none */}
                    <Image
                        src={story.imageUrl || "/images/generated/story-context.png"}
                        alt={story.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Article Content */}
            <article className="max-w-3xl mx-auto px-4">
                <header className="mb-12 text-center">
                    <span className="inline-block bg-secondary text-primary px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                        {story.types.join(" & ")} Story
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                        {story.title}
                    </h1>
                    <div className="flex items-center justify-center text-muted-foreground gap-4">
                        <span className="font-medium text-foreground">
                            {story.isAnonymous ? "Anonymous" : (story.authorName || "Anonymous")}
                        </span>
                        <span>•</span>
                        <time>{new Date(story.createdAt).toLocaleDateString()}</time>
                    </div>
                </header>

                <div className="prose prose-lg prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary max-w-none mb-16 whitespace-pre-line">
                    <p className="lead text-xl md:text-2xl font-serif text-muted-foreground/80 italic mb-8 border-l-4 border-primary pl-6">
                        "{story.excerpt || story.content.substring(0, 100)}"
                    </p>
                    {/* Render content directly for now (text only support) */}
                    <p>
                        {story.content}
                    </p>

                    <div className="my-8 relative h-64 md:h-96 rounded-xl overflow-hidden">
                        <Image src="/images/generated/story-context.png" alt="Contextual image" fill className="object-cover" />
                    </div>
                </div>

                {/* Share */}
                <div className="border-t border-b border-border py-8 mb-16">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="font-serif text-lg font-medium">Share this story:</span>
                        <div className="flex gap-4">
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Facebook className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Twitter className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <Linkedin className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full">
                                <LinkIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Stories */}
            <section className="max-w-7xl mx-auto px-4 pt-8 border-t border-border/40">
                <h2 className="font-serif text-3xl font-medium mb-12 text-center">More Stories Like This</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {related.map(story => (
                        <StoryCard key={story.id} story={story as any} />
                    ))}
                </div>
            </section>
        </div>
    )
}
