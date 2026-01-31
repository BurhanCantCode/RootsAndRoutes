"use client"

import { useState } from "react"
import { StoryCard } from "@/components/stories/StoryCard"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define a type that matches the Prisma model output or a shared interface
// For simplicity, we define it here or import. The Prisma type is ideal.
// import { Story } from "@prisma/client" -> this might fail if types aren't generated in client
// So we'll define a compatible interface
interface StoryWithAuthor {
    id: string
    type: "written" | "photo" | "video"
    title: string
    excerpt: string | null
    authorName: string | null
    image: string | null // Mapped from imageUrl
}

export function StoriesList({ initialStories }: { initialStories: StoryWithAuthor[] }) {
    const [filter, setFilter] = useState("all")

    const filteredStories = filter === "all"
        ? initialStories
        : initialStories.filter(story => story.type === filter)

    return (
        <div className="max-w-7xl mx-auto">
            {/* Filter */}
            <div className="flex justify-center mb-12">
                <Tabs defaultValue="all" onValueChange={setFilter} className="w-full max-w-md">
                    <TabsList className="grid w-full grid-cols-4 rounded-full bg-secondary h-12 p-1">
                        <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">All</TabsTrigger>
                        <TabsTrigger value="written" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">Written</TabsTrigger>
                        <TabsTrigger value="photo" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">Photos</TabsTrigger>
                        <TabsTrigger value="video" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">Videos</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStories.map(story => (
                    // We need to adapt the story object to match what StoryCard expects if it differs
                    // StoryCard expects `story: Story` from `lib/data` (mock), we should update StoryCard or map here.
                    // Let's assume StoryCard uses a compatible interface.
                    // Currently StoryCard uses `image` but DB has `imageUrl`. We map it before passing.
                    <StoryCard key={story.id} story={story as any} />
                ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-16">
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                    Load More Stories
                </Button>
            </div>
        </div>
    )
}
