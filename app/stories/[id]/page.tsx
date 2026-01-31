import { STORIES } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Facebook, Linkedin, Twitter, Link as LinkIcon } from "lucide-react"
import { StoryCard } from "@/components/stories/StoryCard"
import { Button } from "@/components/ui/button"

export async function generateStaticParams() {
    return STORIES.map((story) => ({
        id: story.id,
    }))
}

export default async function SingleStoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const story = STORIES.find(s => s.id === id)

    if (!story) {
        notFound()
    }

    // Related stories (exclude current)
    const related = STORIES.filter(s => s.id !== story.id).slice(0, 3)

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
                    <Image
                        src={story.image}
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
                        {story.type} Story
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                        {story.title}
                    </h1>
                    <div className="flex items-center justify-center text-muted-foreground gap-4">
                        <span className="font-medium text-foreground">{story.authorName}</span>
                        <span>•</span>
                        <time>December 15, 2024</time>
                    </div>
                </header>

                <div className="prose prose-lg prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary max-w-none mb-16">
                    <p className="lead text-xl md:text-2xl font-serif text-muted-foreground/80 italic mb-8 border-l-4 border-primary pl-6">
                        "{story.excerpt}"
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <h3>Finding the Courage</h3>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                    <p>
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
                    </p>
                    <div className="my-8 relative h-64 md:h-96 rounded-xl overflow-hidden">
                        <Image src="/images/generated/story-context.png" alt="Contextual image" fill className="object-cover" />
                    </div>
                    <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                    </p>
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
                        <StoryCard key={story.id} story={story} />
                    ))}
                </div>
            </section>
        </div>
    )
}
