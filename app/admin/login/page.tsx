"use client"

import { loginAdmin } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sprout } from "lucide-react"
import { useActionState } from "react"

export default function AdminLoginPage() {
    const [state, formAction, isPending] = useActionState(loginAdmin, { success: false, message: "" })

    if (state?.success) {
        // Client-side redirect after success (or middleware redirects on refresh)
        // But better to redirect in action? Action returns object. 
        // Let's use window location or router for immediate effect if action didn't redirect.
        // Actually, action set cookie, so redirecting client side is fine.
        if (typeof window !== 'undefined') window.location.href = "/admin"
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-100 p-8 space-y-8">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                        <Sprout className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
                    <p className="text-slate-500">Sign in to manage Roots & Routes</p>
                </div>

                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input name="email" type="email" placeholder="admin@rootsandroutes.org" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input name="password" type="password" required />
                    </div>

                    {state?.message && !state.success && (
                        <p className="text-red-500 text-sm font-medium">{state.message}</p>
                    )}

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "Signing in..." : "Sign in"}
                    </Button>
                </form>

                <div className="text-center text-sm text-slate-400">
                    Secure Admin Portal
                </div>
            </div>
        </div>
    )
}
