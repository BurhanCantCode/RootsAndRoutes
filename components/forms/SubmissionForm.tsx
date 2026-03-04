"use client"

import { useState, useRef, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Check, UploadCloud, X, FileImage, Film } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { submitStory } from "@/app/actions"
import { supabase } from "@/lib/supabase"

const formSchema = z.object({
    name: z.string().optional(),
    isAnonymous: z.boolean(),
    email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal("")),
    storyType: z.array(z.enum(["written", "photo", "video"])).min(1, { message: "Please select at least one story type." }),
    title: z.string().min(5, { message: "Title must be at least 5 characters." }),
    content: z.string().min(50, { message: "Story must be at least 50 characters." }),
    termsAccepted: z.literal(true).refine((val) => val === true, {
        message: "You must accept the terms and guidelines."
    }),
})

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/mov"]
const MAX_FILE_SIZE_MB = 50

export function SubmissionForm() {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [mediaFile, setMediaFile] = useState<File | null>(null)
    const [mediaPreview, setMediaPreview] = useState<string | null>(null)
    const [uploadError, setUploadError] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            isAnonymous: false,
            email: "",
            content: "",
            title: "",
            storyType: ["written"],
        },
    })

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setUploadError(null)

        const isImage = ACCEPTED_IMAGE_TYPES.includes(file.type)
        const isVideo = ACCEPTED_VIDEO_TYPES.includes(file.type)

        if (!isImage && !isVideo) {
            setUploadError("Unsupported file type. Please upload JPG, PNG, WEBP, MP4, WEBM, or MOV.")
            return
        }

        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setUploadError(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`)
            return
        }

        setMediaFile(file)
        setMediaPreview(URL.createObjectURL(file))
    }

    function removeMedia() {
        setMediaFile(null)
        setMediaPreview(null)
        setUploadError(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    async function uploadMedia(file: File): Promise<{ imageUrl?: string; videoUrl?: string }> {
        const isVideo = ACCEPTED_VIDEO_TYPES.includes(file.type)
        const folder = isVideo ? "videos" : "images"
        const ext = file.name.split(".").pop()
        const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

        const { error } = await supabase.storage
            .from("story-media")
            .upload(path, file, { upsert: false })

        if (error) throw new Error(error.message)

        const { data: urlData } = supabase.storage.from("story-media").getPublicUrl(path)

        if (isVideo) return { videoUrl: urlData.publicUrl }
        return { imageUrl: urlData.publicUrl }
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            let imageUrl: string | undefined
            let videoUrl: string | undefined

            if (mediaFile) {
                setIsUploading(true)
                try {
                    const urls = await uploadMedia(mediaFile)
                    imageUrl = urls.imageUrl
                    videoUrl = urls.videoUrl
                } catch (err) {
                    setUploadError("Media upload failed. Please try again or submit without media.")
                    setIsUploading(false)
                    return
                }
                setIsUploading(false)
            }

            const formData = new FormData()
            if (values.name) formData.append("name", values.name)
            formData.append("isAnonymous", String(values.isAnonymous))
            formData.append("email", values.email ?? "")
            values.storyType.forEach(type => formData.append("storyTypes", type))
            formData.append("title", values.title)
            formData.append("content", values.content)
            formData.append("termsAccepted", String(values.termsAccepted))
            if (imageUrl) formData.append("imageUrl", imageUrl)
            if (videoUrl) formData.append("videoUrl", videoUrl)

            const result = await submitStory({ message: "", success: false }, formData)
            if (result.success) {
                setIsSubmitted(true)
            } else {
                alert("Something went wrong: " + result.message)
            }
        })
    }

    const isImage = mediaFile && ACCEPTED_IMAGE_TYPES.includes(mediaFile.type)
    const isVideo = mediaFile && ACCEPTED_VIDEO_TYPES.includes(mediaFile.type)

    if (isSubmitted) {
        return (
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-serif font-medium">Thank you for sharing!</h3>
                <p className="text-muted-foreground max-w-lg mx-auto">
                    Your story has been submitted and is now under review. {form.getValues("email") ? "We'll notify you by email once it's published." : "Check back soon to see it live!"}
                </p>
                <Button onClick={() => { setIsSubmitted(false); form.reset(); removeMedia() }} variant="outline" className="mt-4">
                    Submit Another Story
                </Button>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-border">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/* Guidelines Section */}
                    <div className="bg-secondary/50 p-6 rounded-xl border border-secondary mb-8">
                        <h3 className="font-serif text-lg font-bold mb-4 flex items-center">
                            📋 Content Guidelines
                        </h3>
                        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-2 mb-6">
                            <li>Be respectful and avoid offensive language</li>
                            <li>No racist, sexist, or discriminatory content</li>
                            <li>Share your own authentic experience</li>
                            <li>You may remain anonymous if preferred</li>
                            <li>Read our <a href="https://www.canva.com/design/DAG0HHv2KIg/ST_qmsocumXqdkBaPDivOQ/view?utm_content=DAG0HHv2KIg&utm_campaign=designshare&utm_medium=link&utm_source=viewer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Terms of Use</a></li>
                        </ul>

                        <FormField
                            control={form.control}
                            name="termsAccepted"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md bg-white">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            I have read and agree to the Terms of Use and Guidelines
                                        </FormLabel>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Name (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isAnonymous"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm h-[76px] mt-0">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Submit Anonymously</FormLabel>
                                    </div>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="you@example.com" {...field} />
                                </FormControl>
                                <FormDescription>
                                    We'll only use this to follow up on your submission.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="storyType"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">Story Type *</FormLabel>
                                    <FormDescription>
                                        Select all that apply to your submission.
                                    </FormDescription>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {["written", "photo", "video"].map((type) => (
                                        <FormField
                                            key={type}
                                            control={form.control}
                                            name="storyType"
                                            render={({ field }) => {
                                                const label = type === "written" ? "Written Story" : (type as string).charAt(0).toUpperCase() + (type as string).slice(1);
                                                return (
                                                    <FormItem
                                                        key={type}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(type as any)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, type])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value: "written" | "photo" | "video") => value !== type
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal capitalize cursor-pointer">
                                                            {label}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Story Title *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Give your story a title..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Story *</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Share your experience here..."
                                        className="min-h-[200px] resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* File Upload */}
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Media (Optional)</p>
                        <p className="text-xs text-muted-foreground">Upload a photo or video to accompany your story. Max {MAX_FILE_SIZE_MB}MB.</p>

                        {!mediaFile ? (
                            <label
                                htmlFor="media-upload"
                                className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-secondary/20 transition-colors cursor-pointer"
                            >
                                <UploadCloud className="w-10 h-10 text-muted-foreground mb-3" />
                                <p className="text-sm font-medium">Click to upload media</p>
                                <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WEBP, MP4, WEBM, MOV</p>
                                <input
                                    id="media-upload"
                                    ref={fileInputRef}
                                    type="file"
                                    accept={[...ACCEPTED_IMAGE_TYPES, ...ACCEPTED_VIDEO_TYPES].join(",")}
                                    className="sr-only"
                                    onChange={handleFileChange}
                                />
                            </label>
                        ) : (
                            <div className="border rounded-lg overflow-hidden">
                                {isImage && mediaPreview && (
                                    <div className="relative">
                                        <img
                                            src={mediaPreview}
                                            alt="Preview"
                                            className="w-full max-h-64 object-cover"
                                        />
                                    </div>
                                )}
                                {isVideo && mediaPreview && (
                                    <video
                                        src={mediaPreview}
                                        controls
                                        className="w-full max-h-64"
                                    />
                                )}
                                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-t">
                                    <div className="flex items-center gap-2 text-sm text-slate-700 min-w-0">
                                        {isImage ? <FileImage className="w-4 h-4 shrink-0 text-slate-500" /> : <Film className="w-4 h-4 shrink-0 text-slate-500" />}
                                        <span className="truncate">{mediaFile.name}</span>
                                        <span className="text-slate-400 shrink-0">({(mediaFile.size / 1024 / 1024).toFixed(1)}MB)</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={removeMedia}
                                        className="ml-3 p-1 rounded hover:bg-slate-200 transition-colors shrink-0"
                                        aria-label="Remove file"
                                    >
                                        <X className="w-4 h-4 text-slate-500" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {uploadError && (
                            <p className="text-sm text-red-600">{uploadError}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full rounded-full py-6 text-lg" disabled={isPending || isUploading}>
                        {isUploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading media...
                            </>
                        ) : isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            "Submit Story"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
