"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Home,
    FileText,
    BookOpen,
    Inbox,
    HelpCircle,
    MessageSquare,
    Settings,
    LogOut
} from "lucide-react"
import { logoutAdmin } from "@/app/actions"

const adminNav = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Homepage", href: "/admin/homepage", icon: Home },
    { label: "About Page", href: "/admin/about", icon: FileText },
    { label: "Stories", href: "/admin/stories", icon: BookOpen },
    { label: "Submissions", href: "/admin/submissions", icon: Inbox },
    { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
    { label: "Contact Forms", href: "/admin/contacts", icon: MessageSquare },
    { label: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 bg-slate-900 text-white flex flex-col fixed left-0 top-0 bottom-0 overflow-y-auto z-[60]">
            <div className="p-6 border-b border-slate-800">
                <h2 className="font-serif text-xl font-bold">Admin Panel</h2>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {adminNav.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-white"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 mt-auto border-t border-slate-800">
                <form action={logoutAdmin}>
                    <button type="submit" className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </form>
            </div>
        </aside>
    )
}
