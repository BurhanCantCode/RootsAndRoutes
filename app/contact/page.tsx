"use client"

import { ContactForm } from "@/components/forms/ContactForm"
import { Linkedin, Instagram, Mail } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="bg-background min-h-screen">
            <section className="bg-secondary py-16 px-4 text-center">
                <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">
                    Get in Touch
                </h1>
                <p className="text-muted-foreground text-lg">
                    We'd love to hear from you
                </p>
            </section>

            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">

                    {/* Contact Info */}
                    <div className="bg-primary text-primary-foreground p-8 md:p-12 rounded-2xl flex flex-col justify-between">
                        <div>
                            <h2 className="font-serif text-2xl font-bold mb-8">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <Mail className="w-6 h-6 mt-1 opacity-80" />
                                    <div>
                                        <h3 className="font-medium mb-1">Email</h3>
                                        <a href="mailto:contact@rootsandroutes.org" className="hover:underline opacity-90">contact@rootsandroutes.org</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h3 className="font-medium mb-4">Follow Us</h3>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div>
                        <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Send us a message</h2>
                        <ContactForm />
                    </div>
                </div>
            </section>
        </div>
    )
}
