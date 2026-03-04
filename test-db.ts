import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const story = await prisma.story.findFirst({
    where: { title: { contains: "The Thing I Hate The Most Is Feeling Invisible" } }
  })
  console.log("Found story:", story)
}
main()
