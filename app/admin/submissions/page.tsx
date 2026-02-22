import { ArrowRight } from "lucide-react"
import Link from "next/link"
import db from "@/lib/db"
import type { Story } from "@prisma/client"

export const dynamic = 'force-dynamic'

export default async function SubmissionsPage() {
    const submissions = await db.story.findMany({
        where: { status: "PENDING" },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Review Queue</h1>
                    <p className="text-slate-500 mt-2">Stories waiting for your approval.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {submissions.length === 0 ? (
                        <div className="p-12 text-center">
                            <h3 className="text-lg font-medium text-slate-900">All caught up!</h3>
                            <p className="text-slate-500 mt-2">There are no pending stories to review.</p>
                            <Link href="/admin" className="text-primary hover:underline mt-4 inline-block">
                                Back to Dashboard
                            </Link>
                        </div>
                    ) : (
                        submissions.map((sub: Story) => (
                            <Link
                                key={sub.id}
                                href={`/admin/submissions/${sub.id}`}
                                className="block hover:bg-slate-50 transition-colors"
                            >
                                <div className="px-6 py-6 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wide
                                                ${sub.types.includes('written') ? 'bg-blue-100 text-blue-700' :
                                                    sub.types.includes('photo') ? 'bg-purple-100 text-purple-700' :
                                                        'bg-pink-100 text-pink-700'}`}>
                                                {sub.types.join(", ")}
                                            </span>
                                            <span className="text-sm text-slate-400">
                                                {new Date(sub.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900">{sub.title}</h3>
                                        <p className="text-sm text-slate-500 line-clamp-1">{sub.excerpt}</p>
                                        <p className="text-xs text-slate-400 mt-2">
                                            By {sub.authorName} {sub.isAnonymous && "(Anonymous)"}
                                        </p>
                                    </div>
                                    <div className="pl-4">
                                        <ArrowRight className="w-5 h-5 text-slate-300" />
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
