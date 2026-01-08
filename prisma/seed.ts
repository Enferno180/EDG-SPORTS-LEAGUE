
import { PrismaClient } from '@prisma/client'
import { TEAMS } from '../src/lib/data'

const prisma = new PrismaClient()

async function main() {
    console.log('Starting Soul Transfer (Seed)...')

    // 1. Clear existing data to avoid duplicates (The "Purge" before the "Upload")
    // Deleting in correct order to handle foreign keys
    try {
        await prisma.attendance.deleteMany()
        await prisma.scoutingNote.deleteMany()
        await prisma.orderItem.deleteMany() // Clear orders related to users if any hard reset needed (optional, effectively just clearing game data here mainly)
        // We won't clear Users/Orders indiscriminately to preserve Admin value if it existed, 
        // but for this specific "Soul Transfer" of Teams/Players, we wipe them.

        await prisma.game.deleteMany() // Delete games first as they reference teams
        await prisma.player.deleteMany()
        await prisma.team.deleteMany()

        console.log('Old mannequins removed.')
    } catch (e) {
        console.log('Fresh database or error clearing:', e)
    }

    // 2. Seed Teams & Players
    console.log(`Injecting ${TEAMS.length} teams...`)

    for (const teamData of TEAMS) {
        console.log(`Processing: ${teamData.name}`)

        const slug = teamData.name.toLowerCase().replace(/\s+/g, '-')

        await prisma.team.create({
            data: {
                name: teamData.name,
                slug: slug,
                logo: teamData.logo,
                division: teamData.division,
                wins: teamData.wins,
                losses: teamData.losses,
                offRating: teamData.offRating,
                defRating: teamData.defRating,
                netRating: teamData.netRating,
                primaryColor: teamData.colors.primary,
                secondaryColor: teamData.colors.accent,

                players: {
                    create: teamData.players.map(p => ({
                        // Basic Info
                        name: p.name,
                        number: p.jersey,
                        position: p.pos,
                        height: p.height,
                        weight: "200 lbs", // Default as data.ts might not have it for all, or we could add random variation if strictly needed, but 200 is safe
                        ovr: p.overall,
                        archetype: p.archetype,
                        avatar: p.avatar,

                        // Status
                        // status: p.status, // mapped via inference if needed, or we just store 'injury' text in a note? 
                        // The schema doesn't have a status Enum yet, but it has 'injury' string potentially?
                        // Schema has: isProspect, waiverSignedAt... 
                        // Let's check schema: NO 'status' field in Player model. 
                        // But we have `ScoutingNote`? No, we probably want to add data for injuries if meaningful.
                        // For now, we'll skip 'status' text unless we add it to schema. 
                        // Wait, user asked for "Mannequins" to represent advertisement. 
                        // The attributes are the key.

                        // Stats
                        mpg: p.mpg,
                        ppg: p.ppg,
                        rpg: p.rpg,
                        apg: p.apg,
                        spg: p.spg,
                        bpg: p.bpg,
                        tov: p.tov,
                        fgPct: p.fgPct,
                        threePtPct: p.threePtPct,
                        ftPct: p.ftPct,

                        // Attributes (Flattened from p.attributes)
                        insideScoring: p.attributes.insideScoring,
                        midRangeScoring: p.attributes.midRangeScoring,
                        threePointScoring: p.attributes.threePointScoring,
                        passing: p.attributes.passing,
                        ballHandling: p.attributes.ballHandling,
                        perimeterDefense: p.attributes.perimeterDefense,
                        postDefense: p.attributes.postDefense,
                        steals: p.attributes.steals,
                        blocks: p.attributes.blocks,
                        rebounding: p.attributes.rebounding,
                        athleticism: p.attributes.athleticism,
                        dunking: p.attributes.dunking,

                        // Badges (Stored as JSON)
                        badges: p.badges as any, // Cast to any to satisfy Prisma Json type

                        // Drill Scores (Mocking/Defaulting if not in data.ts, but user said 'mock players' have them. 
                        // data.ts attributes are 0-99. Drills in schema are raw numbers (seconds, inches).
                        // We will leave drills null for now or calculate them? 
                        // Best to leave null rather then fake it poorly. The 0-99 attributes are what populate the UI charts.
                    }))
                }
            }
        })
    }

    // 3. User Accounts (Ensuring Admin exists)
    // We only create if not exists to avoid unique constraint errors if we didn't fully wipe users
    const adminEmail = 'admin@edg.com'
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } })
    if (!existingAdmin) {
        await prisma.user.create({
            data: { email: adminEmail, password: '123', role: 'ADMIN', name: 'League Commissioner' }
        })
        console.log('Admin account created.')
    }

    // John Doe Scorekeeper
    const scorerEmail = 'john.doe@example.com'
    const existingScorer = await prisma.user.findUnique({ where: { email: scorerEmail } })
    if (!existingScorer) {
        await prisma.user.create({
            data: { email: scorerEmail, password: '123', role: 'SCOREKEEPER', name: 'Official Scorekeeper' }
        })
    }

    console.log('Soul Transfer Complete. The mannequins are alive.')
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
