import db from '../lib/db'

async function main() {
    console.log('🌱 Starting seed via shared db instance...')

    const prisma = db

    // No placeholder stories to seed - real stories are submitted through the app
    console.log(`✅ Seeding finished.`)
    await prisma.$disconnect()
}

main()
    .catch(async (e) => {
        console.error("Critical error in seed:", e)
        process.exit(1)
    })
