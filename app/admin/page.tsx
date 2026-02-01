import { ArrowRight } from "lucide-react"
import Link from "next/link"
import db from "@/lib/db"
import { getAdminStats } from "@/app/actions"
import type { Story } from "@prisma/client"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    const stats = await getAdminStats()

    // Fetch recent pending submissions for the list
    const recentSubmissions = await db.story.findMany({
        where: { status: "PENDING" },
        take: 5,
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                <p className="text-slate-500 mt-2">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Pending Stories</h3>
                    <p className="text-4xl font-bold text-slate-900 mt-2">{stats.pending}</p>
                    <Link href="/admin/submissions" className="text-sm text-primary font-medium mt-4 inline-flex items-center hover:underline">
                        Review queue <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Published</h3>
                    <p className="text-4xl font-bold text-slate-900 mt-2">{stats.approved}</p>
                    <div className="text-sm text-green-600 font-medium mt-4">
                        Live on site
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Rejections</h3>
                    <p className="text-4xl font-bold text-slate-900 mt-2">{stats.rejected}</p>
                    <Link href="/admin/submissions" className="text-sm text-primary font-medium mt-4 inline-flex items-center hover:underline">
                        View history <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
            </div>

            {/* Recent Submissions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Recent Pending Submissions</h3>
                    <Link href="/admin/submissions" className="text-sm text-primary hover:underline">View All</Link>
                </div>
                <div className="divide-y divide-slate-100">
                    {recentSubmissions.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">
                            No pending stories. All caught up! 🎉
                        </div>
                    ) : (
                        recentSubmissions.map((sub: Story) => (
                            <div key={sub.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div>
                                    <p className="font-medium text-slate-900">{sub.title}</p>
                                    <p className="text-sm text-slate-500">by {sub.authorName} • {new Date(sub.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        {sub.status}
                                    </span>
                                    {/* We'll link to a detailed review page later, for now just list */}
                                    <Link href={`/admin/submissions/${sub.id}`} className="text-sm font-medium text-slate-600 hover:text-slate-900">
                                        Review
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
