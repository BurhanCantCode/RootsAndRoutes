import db from '../lib/db'

async function main() {
    console.log('🌱 Starting seed via shared db instance...')

    // Use the imported db instance
    const prisma = db

    // Helper to wait for connection
    // db is already a client instance

    const stories = [
        {
            title: "The Day Everything Changed at Work",
            excerpt: "I never thought my natural hair would be a topic of discussion in a corporate boardroom, until it was. The comments were subtle at first, then overt.",
            content: "I never thought my natural hair would be a topic of discussion in a corporate boardroom, until it was. The comments were subtle at first, then overt. It started with 'You look different today' and escalated to 'Is that professional?'. This story explores the microaggressions faced by women of color in corporate settings and the journey to self-acceptance.",
            authorName: "Sarah M.",
            authorEmail: "sarah@example.com",
            type: "written",
            imageUrl: "/images/generated/story-sarah.png",
            status: "APPROVED"
        },
        {
            title: "After years of silence, I'm speaking up",
            excerpt: "Growing up in a small town, sticking out wasn't safe. Now I'm reclaiming my narrative and refusing to be small anymore.",
            content: "Growing up in a small town, sticking out wasn't safe. I learned to be quiet, to blend in, to not make waves. But silence has a cost. It eats away at your identity. This is the story of how I found my voice and decided that my story constraints were worth breaking.",
            authorName: "James K.",
            authorEmail: "james@example.com",
            type: "video",
            imageUrl: "/images/generated/story-james.png",
            status: "APPROVED"
        },
        {
            title: "Growing up between two cultures",
            excerpt: "Too foreign for home, too foreign for here. The eternal struggle of the third culture kid is feeling like you belong nowhere.",
            content: "Too foreign for home, too foreign for here. The eternal struggle of the third culture kid is feeling like you belong nowhere. But in that spaces between, there is a unique perspective. A bridge between worlds that allows for empathy and understanding that others might miss.",
            authorName: "Anonymous",
            authorEmail: "anon@example.com",
            isAnonymous: true,
            type: "photo",
            imageUrl: "/images/generated/story-anon.png",
            status: "APPROVED"
        },
        {
            title: "My accent is not a measure of my intelligence",
            excerpt: "Just because I speak with an accent doesn't mean I don't understand the complex theories we are discussing.",
            content: "Just because I speak with an accent doesn't mean I don't understand the complex theories we are discussing. In fact, doing it in a second language requires more cognitive processing. This story challenges the biases we hold about language and intelligence.",
            authorName: "Elena R.",
            authorEmail: "elena@example.com",
            type: "written",
            imageUrl: "/images/generated/story-elena.png",
            status: "APPROVED"
        },
        {
            title: "Age is just a number, not a competence level",
            excerpt: "Being the oldest person in the tech startup wasn't easy. I had to prove I could still keep up with the 'kids'.",
            content: "Being the oldest person in the tech startup wasn't easy. I had to prove I could still keep up with the 'kids'. But experience brings wisdom, stability, and mentorship. We need intergenerational teams to build truly robust products.",
            authorName: "Robert T.",
            authorEmail: "robert@example.com",
            type: "written",
            imageUrl: "/images/generated/story-robert.png",
            status: "APPROVED"
        },
        {
            title: "Faith in the workplace",
            excerpt: "Navigating prayer times and dietary restrictions in a secular office environment.",
            content: "Navigating prayer times and dietary restrictions in a secular office environment can be tricky. But allowing for these expressions of faith creates a more inclusive and psychologically safe environment for everyone.",
            authorName: "Fatima A.",
            authorEmail: "fatima@example.com",
            type: "photo",
            imageUrl: "/images/generated/story-fatima.png",
            status: "APPROVED"
        }
    ]

    console.log("Preparing to seed data...")

    for (const story of stories) {
        try {
            await prisma.story.create({
                data: {
                    title: story.title,
                    excerpt: story.excerpt,
                    content: story.content,
                    authorName: story.authorName,
                    authorEmail: story.authorEmail,
                    type: story.type as any,
                    imageUrl: story.imageUrl,
                    status: story.status as any,
                    isAnonymous: story.isAnonymous || false
                }
            })
            console.log(`Created story: ${story.title}`)
        } catch (e) {
            console.log(`Skipped (or error) story: ${story.title}`, (e as Error).message)
        }
    }

    console.log(`✅ Seeding finished.`)
    // No need to disconnect explicitly as it's a shared instance that might be used elsewhere or invalid to close
    // But for CLI script ending, it's fine.
    await prisma.$disconnect()
}

main()
    .catch(async (e) => {
        console.error("Critical error in seed:", e)
        process.exit(1)
    })
