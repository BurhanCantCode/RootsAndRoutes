"use client"

import { useState } from "react"
import { StoryCard } from "@/components/stories/StoryCard"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { STORIES } from "@/lib/data"

export default function StoriesPage() {
    const [filter, setFilter] = useState("all")

    const filteredStories = filter === "all"
        ? STORIES
        : STORIES.filter(story => story.type === filter)

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
                    <Button className="rounded-full px-8 py-6 text-base bg-primary text-white hover:bg-teal-hover shadow-lg">
                        Share Your Story
                    </Button>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 px-4">
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
                            <StoryCard key={story.id} story={story} />
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="text-center mt-16">
                        <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                            Load More Stories
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
