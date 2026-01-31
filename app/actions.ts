"use server"

import db from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Define a schema that matches the form
const submissionSchema = z.object({
    name: z.string().optional(),
    isAnonymous: z.boolean(),
    email: z.string().email(),
    storyType: z.enum(["written", "photo", "video"]),
    title: z.string().min(5),
    content: z.string().min(50),
    termsAccepted: z.literal(true),
})

export type FormState = {
    message: string
    success: boolean
    fields?: Record<string, any>
    errors?: Record<string, string[]> // Change errors to allow array of strings per field
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
                authorEmail: validated.data.email,
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

// Helper to get a nice placeholder image for demo purposes
function getRandomImage(type: string): string {
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
