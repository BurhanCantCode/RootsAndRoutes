import { ModerationControls } from "@/components/admin/ModerationControls"
import db from "@/lib/db"
import { ArrowLeft, Mail, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const story = await db.story.findUnique({
        where: { id }
    })

    if (!story) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Link href="/admin/submissions" className="text-sm text-slate-500 hover:text-slate-900 inline-flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Queue
                </Link>
                <ModerationControls storyId={story.id} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                        <div className="mb-6">
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold uppercase tracking-wide">
                                {story.type}
                            </span>
                            <h1 className="text-3xl font-bold text-slate-900 mt-3">{story.title}</h1>
                            <p className="text-lg text-slate-600 mt-2 font-serif italic">
                                {story.excerpt}
                            </p>
                        </div>

                        {story.imageUrl && (
                            <div className="relative aspect-video rounded-lg overflow-hidden mb-8 bg-slate-100">
                                <Image
                                    src={story.imageUrl}
                                    alt={story.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        <div className="prose prose-slate max-w-none">
                            <p className="whitespace-pre-wrap leading-relaxed text-slate-800">
                                {story.content}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Author Details</h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-slate-100 rounded-lg">
                                    <User className="w-4 h-4 text-slate-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900">
                                        {story.authorName}
                                    </p>
                                    {story.isAnonymous && (
                                        <p className="text-xs text-slate-500">Requested Anonymity</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-slate-100 rounded-lg">
                                    <Mail className="w-4 h-4 text-slate-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900 max-w-[200px] break-all">
                                        {story.authorEmail}
                                    </p>
                                    <p className="text-xs text-slate-500">Private (Not shown publicly)</p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 mt-6 pt-4">
                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                    <span className="text-slate-400 block">Submitted</span>
                                    <span className="text-slate-700 font-medium">
                                        {new Date(story.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-400 block">ID</span>
                                    <span className="text-slate-700 font-medium font-mono truncate">
                                        {story.id.substring(0, 8)}...
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
