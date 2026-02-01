"use client"

import { updateStoryStatus } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

export function ModerationControls({ storyId }: { storyId: string }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleStatus = (status: "APPROVED" | "REJECTED") => {
        startTransition(async () => {
            const result = await updateStoryStatus(storyId, status)
            if (result.success) {
                toast.success(`Story ${status.toLowerCase()}!`)
                router.push("/admin/submissions")
            } else {
                toast.error("Something went wrong.")
            }
        })
    }

    return (
        <div className="flex items-center gap-3">
            <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => handleStatus("REJECTED")}
                disabled={isPending}
            >
                <X className="w-4 h-4 mr-2" />
                Reject
            </Button>
            <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => handleStatus("APPROVED")}
                disabled={isPending}
            >
                <Check className="w-4 h-4 mr-2" />
                Approve & Publish
            </Button>
        </div>
    )
}
