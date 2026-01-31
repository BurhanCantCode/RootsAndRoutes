import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
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
                    <p className="text-4xl font-bold text-slate-900 mt-2">5</p>
                    <Link href="/admin/submissions" className="text-sm text-primary font-medium mt-4 inline-flex items-center hover:underline">
                        Review queue <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Published</h3>
                    <p className="text-4xl font-bold text-slate-900 mt-2">47</p>
                    <div className="text-sm text-green-600 font-medium mt-4">
                        +12 this month
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Unread Messages</h3>
                    <p className="text-4xl font-bold text-slate-900 mt-2">3</p>
                    <Link href="/admin/contacts" className="text-sm text-primary font-medium mt-4 inline-flex items-center hover:underline">
                        View inbox <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
            </div>

            {/* Recent Submissions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Recent Submissions</h3>
                    <Link href="/admin/submissions" className="text-sm text-primary hover:underline">View All</Link>
                </div>
                <div className="divide-y divide-slate-100">
                    {[
                        { title: "The Day Everything Changed", author: "Sarah M.", date: "Jan 15, 2024", status: "Pending" },
                        { title: "Growing up different", author: "Anonymous", date: "Jan 14, 2024", status: "Pending" },
                        { title: "My hidden struggle", author: "Mike R.", date: "Jan 12, 2024", status: "Approved" },
                    ].map((sub, i) => (
                        <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div>
                                <p className="font-medium text-slate-900">{sub.title}</p>
                                <p className="text-sm text-slate-500">by {sub.author} • {sub.date}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${sub.status === 'Pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-green-100 text-green-800'
                                    }`}>
                                    {sub.status}
                                </span>
                                <Link href={`/admin/submissions/${i}`} className="text-sm font-medium text-slate-600 hover:text-slate-900">
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
