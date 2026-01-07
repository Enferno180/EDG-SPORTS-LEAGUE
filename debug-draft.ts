
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Testing Draft Board Query...')
    try {
        const prospects = await prisma.player.findMany({
            where: {
                isProspect: true
            },
            orderBy: {
                ovr: 'desc'
            },
            include: {
                team: true
            }
        });
        console.log(`✅ Success! Found ${prospects.length} prospects.`);
        if (prospects.length > 0) {
            console.log('Sample:', prospects[0].name, 'Team:', prospects[0].team?.name);
        }
    } catch (e) {
        console.error('❌ Draft Board Query Failed:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
