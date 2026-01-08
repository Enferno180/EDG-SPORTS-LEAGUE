
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Verifying Soul Transfer...')

    // Check N. Allen (The Ferrari)
    const nAllen = await prisma.player.findFirst({
        where: { name: 'N. Allen' },
        include: { team: true }
    })

    if (!nAllen) {
        console.error('CRITICAL: N. Allen not found!')
        return
    }

    console.log(`Found Player: ${nAllen.name}`)
    console.log(`Team: ${nAllen.team?.name}`)
    console.log(`Archetype: ${nAllen.archetype}`) // Should be "2-Way 3-Level Scorer"
    console.log(`Badges: ${JSON.stringify(nAllen.badges)}`) // Should have Gold badges

    if (!nAllen.badges || (nAllen.badges as any[]).length === 0) {
        console.error('CRITICAL: Badges missing!')
    } else {
        console.log('SUCCESS: Badges transferred.')
    }

    const teamCount = await prisma.team.count()
    console.log(`Total Teams: ${teamCount} (Expected 16)`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
