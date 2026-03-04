"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Linkedin } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="bg-background">
            {/* Hero Banner */}
            <section className="bg-secondary py-20 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto space-y-6"
                >
                    <h1 className="font-serif text-5xl md:text-6xl font-medium text-foreground">
                        About Roots & Routes
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        The story behind our mission to amplify voices and foster understanding.
                    </p>
                </motion.div>
            </section>

            {/* Mission */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg transform -rotate-1">
                        <Image
                            src="/images/about_mission.png"
                            alt="Team working together"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="font-serif text-4xl font-medium text-foreground">Our Mission</h2>
                        <div className="text-lg text-muted-foreground space-y-4 leading-relaxed">
                            <p>
                                We exist to create a safe space where individuals can share their personal experiences with discrimination.
                            </p>
                            <p>
                                Through storytelling, we aim to build empathy, challenge prejudice, and inspire collective action for a more inclusive world. We believe that hearing someone's story is the first step towards understanding their reality.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision */}
            <section className="py-20 px-4 bg-cream">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 space-y-6">
                        <h2 className="font-serif text-4xl font-medium text-foreground">Our Vision</h2>
                        <p className="text-2xl font-serif text-primary leading-tight">
                            "A world where every person is heard, respected, and valued regardless of their background, identity, or beliefs."
                        </p>
                    </div>
                    <div className="order-1 md:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg transform rotate-1">
                        <Image
                            src="/images/about_mission_vision.png"
                            alt="Visionary horizon"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-24 px-4 bg-background">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <h2 className="font-serif text-4xl font-medium text-foreground">Our Story</h2>
                    <div className="text-lg text-muted-foreground space-y-6 leading-relaxed text-left">
                        <p>
                            Roots and Routes began with a simple idea: to bring unseen stories into the light. The founders wanted to create a space where these unseen experiences could be shared, recognized, and remembered. This website is that space: a platform for voices too often overlooked. Some stories are brief, some long; some polished, some raw. All are welcome, all matter. Roots and Routes exists to give attention to the unheard—and to ensure that their stories continue to travel, connect, and inspire.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 px-4 bg-secondary">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl font-medium text-foreground mb-4">Meet The Team</h2>
                        <p className="text-muted-foreground">The people working behind the scenes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto">
                        {[
                            { name: "Gamze Nur Demir", role: "Co-Founder", image: "/images/team-gamze.jpg", linkedin: "https://linkedin.com/in/gamze-nur-demir" },
                            { name: "Melissa Okeke", role: "Co-Founder", image: "/images/team-melissa.jpg", linkedin: "https://www.linkedin.com/in/melissaokeke" }
                        ].map((member) => (
                            <div key={member.name} className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-secondary">
                                    <Image src={member.image} alt={member.name} fill className="object-cover" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                                <p className="text-primary font-medium mb-3">{member.role}</p>
                                <p className="text-center text-sm text-muted-foreground mb-6">
                                    Passionate about social justice and storytelling. Committed to making a difference.
                                </p>
                                <div className="flex gap-4">
                                    <a href="https://www.instagram.com/rootsandroutes.global?igsh=MWQ0ODd0NzRjb3dpdQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
