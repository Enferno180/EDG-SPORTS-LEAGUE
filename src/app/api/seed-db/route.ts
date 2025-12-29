import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { TEAMS } from '@/lib/data'

export async function GET() {
    try {
        // 1. Clear existing data
        await prisma.attendance.deleteMany()
        await prisma.scoutingNote.deleteMany()
        await prisma.team.deleteMany()
        await prisma.player.deleteMany()
        await prisma.user.deleteMany({
            where: {
                email: {
                    in: ['admin@edg.com', 'coach@edg.com', 'fan@edg.com']
                }
            }
        })

        // 2. Create Admin & Coach Users (Sequential to avoid locks)
        await prisma.user.create({
            data: {
                email: 'admin@edg.com',
                password: '123',
                role: 'ADMIN',
                name: 'League Commissioner'
            }
        })
        await prisma.user.create({
            data: {
                email: 'coach@edg.com',
                password: '123',
                role: 'COACH',
                name: 'Head Coach'
            }
        })
        await prisma.user.create({
            data: {
                email: 'fan@edg.com',
                password: '123',
                role: 'FAN',
                name: 'Super Fan'
            }
        })

        // 3. Seed Teams and Players
        for (const teamData of TEAMS) {
            // Create the Team
            // We use a slug based on the name for easier URLs if needed
            const slug = teamData.name.toLowerCase().replace(/\s+/g, '-')

            await prisma.team.create({
                data: {
                    name: teamData.name,
                    slug: slug,
                    logo: teamData.logo,
                    wins: teamData.wins,
                    losses: teamData.losses,
                    primaryColor: teamData.colors.primary,
                    secondaryColor: teamData.colors.accent,
                    players: {
                        create: teamData.players.map(p => ({
                            name: p.name,
                            number: p.jersey,
                            position: p.pos,
                            height: p.height,
                            weight: "200 lbs", // Default for now
                            ovr: p.overall,
                            archetype: p.archetype,
                            avatar: p.avatar,
                        }))
                    }
                }
            })
        }

        // 4. Seed Mock Prospects
        const MOCK_PROSPECTS = [
            { name: 'Xavier "X" King', pos: 'PG', h: '6\'3"', w: '190 lbs', school: 'Duke', ovr: 88, archetype: 'Shot Creator' },
            { name: 'Malik Johnson', pos: 'SG', h: '6\'5"', w: '205 lbs', school: 'Kentucky', ovr: 85, archetype: 'Sharpshooter' },
            { name: 'Dante Green', pos: 'SF', h: '6\'8"', w: '225 lbs', school: 'Villanova', ovr: 84, archetype: 'Two-Way Wing' },
            { name: 'Marcus Truth', pos: 'PF', h: '6\'10"', w: '240 lbs', school: 'North Carolina', ovr: 82, archetype: 'Post Playmaker' },
            { name: 'Zion Little', pos: 'C', h: '7\'1"', w: '260 lbs', school: 'Gonzaga', ovr: 86, archetype: 'Rim Protector' },
            { name: 'Jalen Rose 2.0', pos: 'PG', h: '6\'4"', w: '195 lbs', school: 'Michigan', ovr: 80, archetype: 'Playmaker' },
            { name: 'Trey Youngster', pos: 'SG', h: '6\'2"', w: '180 lbs', school: 'Oklahoma', ovr: 79, archetype: 'Shot Creator' },
            { name: 'Bronny James Jr.', pos: 'SF', h: '6\'6"', w: '215 lbs', school: 'USC', ovr: 81, archetype: 'Slasher' },
            { name: 'Shaq O\'Neal III', pos: 'C', h: '7\'0"', w: '280 lbs', school: 'LSU', ovr: 83, archetype: 'Paint Beast' },
            { name: 'Cade Cunningham II', pos: 'PG', h: '6\'7"', w: '220 lbs', school: 'Oklahoma State', ovr: 87, archetype: 'Floor General' }
        ];

        console.log('Seeding prospects...');
        await Promise.all(MOCK_PROSPECTS.map(p =>
            prisma.player.create({
                data: {
                    name: p.name,
                    position: p.pos,
                    height: p.h,
                    weight: p.w,
                    school: p.school,
                    ovr: p.ovr,
                    archetype: p.archetype,
                    isProspect: true,
                    teamId: null, // Ensure they are free agents
                    // Default stats
                    // ppg: 0, rpg: 0, apg: 0, spg: 0, bpg: 0,
                    // fgPct: 0, threePtPct: 0, ftPct: 0, tov: 0
                }
            })
        ));

        return NextResponse.json({ message: 'Database seeded successfully with Users, Teams, and Players!' })
    } catch (error) {
        console.error('Seeding error:', error)
        return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 })
    }
}
