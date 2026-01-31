import Link from "next/link"
import Image from "next/image"
import { PlayCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Story {
    id: string
    type: string
    title: string
    excerpt: string
    authorName: string
    image: string
}

export function StoryCard({ story, className }: { story: Story, className?: string }) {
    return (
        <div className={cn("bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-border/50", className)}>
            {/* Image */}
            <div className="aspect-video relative overflow-hidden">
                <Image
                    src={story.image}
                    fill
                    alt={story.title}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {story.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                        <PlayCircle className="w-12 h-12 text-white opacity-90 group-hover:scale-110 transition-transform" />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
                    {story.type}
                </span>
                <h3 className="text-xl font-serif font-bold mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {story.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3 mb-6 flex-grow">
                    {story.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                    <span className="text-sm text-muted-foreground font-medium">— {story.authorName}</span>
                    <Link href={`/stories/${story.id}`} className="text-primary font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
