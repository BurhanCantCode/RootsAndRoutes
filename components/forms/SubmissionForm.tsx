"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Check, UploadCloud } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formSchema = z.object({
    name: z.string().optional(),
    isAnonymous: z.boolean().default(false),
    email: z.string().email({ message: "Please enter a valid email address." }),
    storyType: z.enum(["written", "photo", "video"], {
        required_error: "Please select a story type.",
    }),
    title: z.string().min(5, { message: "Title must be at least 5 characters." }),
    content: z.string().min(50, { message: "Story must be at least 50 characters." }),
    termsAccepted: z.literal(true, {
        errorMap: () => ({ message: "You must accept the terms and guidelines." }),
    }),
})

export function SubmissionForm() {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            isAnonymous: false,
            email: "",
            content: "",
            title: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        // Simulate API call
        setTimeout(() => {
            console.log(values)
            setIsSubmitting(false)
            setIsSubmitted(true)
        }, 2000)
    }

    if (isSubmitted) {
        return (
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-serif font-medium">Thank you for sharing!</h3>
                <p className="text-muted-foreground max-w-lg mx-auto">
                    Your story has been submitted and is now under review. We'll notify you by email once it's published.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mt-4">
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
                                <FormLabel>Email Address *</FormLabel>
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
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Story Type *</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col sm:flex-row gap-4"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="written" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Written Story
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="photo" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Photo
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="video" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Video
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
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

                    {/* File Upload Mock */}
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-secondary/20 transition-colors cursor-pointer">
                        <UploadCloud className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm font-medium">Click to upload media (Optional)</p>
                        <p className="text-xs text-muted-foreground mt-1">JPG, PNG, MP4 (Max 10MB)</p>
                    </div>

                    <Button type="submit" className="w-full rounded-full py-6 text-lg" disabled={isSubmitting}>
                        {isSubmitting ? (
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
