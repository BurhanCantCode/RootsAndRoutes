"use server"

import db from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Define a schema that matches the form
const submissionSchema = z.object({
    name: z.string().optional(),
    isAnonymous: z.boolean(),
    email: z.string().email().optional().or(z.literal("")),
    storyType: z.enum(["written", "photo", "video"]),
    title: z.string().min(5),
    content: z.string().min(50),
    termsAccepted: z.literal(true),
})

export type FormState = {
    message: string
    success: boolean
    fields?: Record<string, any>
    errors?: Record<string, string[]>
}

export async function submitStory(prevState: FormState, formData: FormData): Promise<FormState> {
    // 1. Extract and validate data
    const rawData = {
        name: formData.get("name") as string,
        isAnonymous: formData.get("isAnonymous") === "true",
        email: formData.get("email") as string,
        storyType: formData.get("storyType") as "written" | "photo" | "video",
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        termsAccepted: formData.get("termsAccepted") === "true",
    }

    const validated = submissionSchema.safeParse(rawData)

    if (!validated.success) {
        return {
            success: false,
            message: "This might be due to a validation error, please check your inputs.",
            // Convert Zod errors to a simplified format
            errors: validated.error.flatten().fieldErrors,
            fields: rawData
        }
    }

    try {
        // 2. Save to Database
        await db.story.create({
            data: {
                title: validated.data.title,
                content: validated.data.content,
                type: validated.data.storyType,
                authorEmail: validated.data.email ?? null,
                authorName: validated.data.name || "Anonymous", // Use provided name or default
                isAnonymous: validated.data.isAnonymous,
                // Assign a random placeholder image based on type for now, since we don't have real upload yet
                imageUrl: getRandomImage(validated.data.storyType),
                status: "PENDING", // Default status
            }
        })

        // 3. Revalidate paths
        revalidatePath("/stories")
        revalidatePath("/admin")

        return {
            success: true,
            message: "Your story has been submitted successfully!",
        }
    } catch (error) {
        console.error("Submission error:", error)
        return {
            success: false,
            message: "Failed to submit story. Please try again later.",
            fields: rawData
        }
    }
}

export async function updateStoryStatus(id: string, status: "APPROVED" | "REJECTED") {
    try {
        await db.story.update({
            where: { id },
            data: {
                status,
                publishedAt: status === "APPROVED" ? new Date() : null
            }
        })

        revalidatePath("/admin")
        revalidatePath("/admin/submissions")
        revalidatePath("/stories")
        revalidatePath(`/stories/${id}`)

        return { success: true }
    } catch (error) {
        console.error("Error updating status:", error)
        return { success: false, error: "Failed to update status" }
    }
}

export async function getAdminStats() {
    const [pending, approved, rejected, total] = await Promise.all([
        db.story.count({ where: { status: "PENDING" } }),
        db.story.count({ where: { status: "APPROVED" } }),
        db.story.count({ where: { status: "REJECTED" } }),
        db.story.count()
    ])

    return {
        pending,
        approved,
        rejected,
        total
    }
}

// ... existing imports ...
import { SignJWT } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// ... existing code ...

const ADMIN_SECRET = process.env.ADMIN_PASSWORD || "secret"
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default-jwt-secret")

export async function loginAdmin(prevState: { success: boolean; message?: string }, formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Simple check against env inputs
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        // Create JWT
        const token = await new SignJWT({ email })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(JWT_SECRET)

        // Set Cookie
        const cookieStore = await cookies()
        cookieStore.set('admin-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        })

        return { success: true }
    }

    return { success: false, message: "Invalid credentials" }
}

export async function logoutAdmin() {
    const cookieStore = await cookies()
    cookieStore.delete('admin-token')
    redirect("/admin/login")
}

// Helper to get a nice placeholder image for demo purposes
function getRandomImage(type: string): string {
    // ... existing code ...
    const images = [
        "/images/generated/story-sarah.png",
        "/images/generated/story-james.png",
        "/images/generated/story-anon.png",
        "/images/generated/story-elena.png",
        "/images/generated/story-robert.png",
        "/images/generated/story-fatima.png",
    ]
    return images[Math.floor(Math.random() * images.length)]
}
