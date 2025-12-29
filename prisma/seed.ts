
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const TEAMS = [
    {
        name: 'Dauphin Ducks',
        logo: '/teams/dauphin-ducks.png',
        wins: 45,
        losses: 12,
        colors: { primary: '#FF7F00', accent: '#008080' }, // Orange & Teal
        players: [
            { name: "Marcus 'The Mountain' Pike", jersey: "00", pos: "C", height: "7'1\"", overall: 96, archetype: "Paint Beast", avatar: "/avatars/marcus_pike.png" },
            { name: "Tyrese Maxey Jr.", jersey: "0", pos: "PG", height: "6'3\"", overall: 92, archetype: "Playmaking Shot Creator", avatar: "/avatars/maxey_jr.png" }
        ]
    },
    {
        name: 'Vine Street Venom',
        logo: '/teams/vine-street-venom.png',
        wins: 38,
        losses: 19,
        colors: { primary: '#6A0DAD', accent: '#00FA9A' }, // Purple & Spring Green
        players: [
            { name: "Kobe 'Viper' Bryant III", jersey: "24", pos: "SG", height: "6'6\"", overall: 94, archetype: "Scoring Machine", avatar: "/avatars/kobe_iii.png" },
            { name: "Darius Garland II", jersey: "10", pos: "PG", height: "6'1\"", overall: 88, archetype: "Offensive Threat", avatar: "/avatars/garland_ii.png" }
        ]
    },
    {
        name: 'Point Breeze Panthers',
        logo: '/teams/point-breeze-panthers.png',
        wins: 30,
        losses: 27,
        colors: { primary: '#000080', accent: '#FFD700' }, // Navy & Gold
        players: [
            { name: "LeBron James IV", jersey: "23", pos: "SF", height: "6'9\"", overall: 91, archetype: "All-Around 2-Way", avatar: "/avatars/lebron_iv.png" },
            { name: "Bronny James III", jersey: "6", pos: "PG", height: "6'4\"", overall: 85, archetype: "Two-Way Guard", avatar: "/avatars/bronny_iii.png" }
        ]
    },
    {
        name: 'Olney Owls',
        logo: '/teams/olney-owls.png',
        wins: 22,
        losses: 35,
        colors: { primary: '#800000', accent: '#F0E68C' }, // Maroon & Khaki
        players: [
            { name: "Chris Paul Jr.", jersey: "3", pos: "PG", height: "6'0\"", overall: 89, archetype: "Floor General", avatar: "/avatars/cp_jr.png" },
            { name: "Deandre Ayton Jr.", jersey: "22", pos: "C", height: "7'0\"", overall: 84, archetype: "Glass Cleaner", avatar: "/avatars/ayton_jr.png" }
        ]
    },
    {
        name: 'Kensington Kobras',
        logo: '/teams/kensington-kobras.png',
        wins: 15,
        losses: 42,
        colors: { primary: '#FF0000', accent: '#000000' }, // Red & Black
        players: [
            { name: "Allen Iverson Reborn", jersey: "3", pos: "SG", height: "6'0\"", overall: 93, archetype: "Ankle Breaker", avatar: "/avatars/ai_reborn.png" },
            { name: "Dikembe Mutombo Jr.", jersey: "55", pos: "C", height: "7'2\"", overall: 86, archetype: "Paint Defender", avatar: "/avatars/mutombo_jr.png" }
        ]
    },
    {
        name: 'Manayunk Martians',
        logo: '/teams/manayunk-martians.png',
        wins: 10,
        losses: 47,
        colors: { primary: '#32CD32', accent: '#4B0082' }, // Lime & Indigo
        players: [
            { name: "Marvin the Baller", jersey: "1", pos: "PG", height: "5'9\"", overall: 99, archetype: "Galaxy Opal", avatar: "/avatars/marvin.png" },
            { name: "Z-Bo 3000", jersey: "50", pos: "PF", height: "6'9\"", overall: 85, archetype: "Post Scorer", avatar: "/avatars/zbo.png" }
        ]
    }
];

async function main() {
    console.log('Starting seed...')

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

    // 2. Create Users
    console.log('Seeding users...')
    // Execute sequentially to avoid SQLite locking issues or engine panics
    await prisma.user.create({
        data: { email: 'admin@edg.com', password: '123', role: 'ADMIN', name: 'League Commissioner' }
    })
    await prisma.user.create({
        data: { email: 'coach@edg.com', password: '123', role: 'COACH', name: 'Head Coach' }
    })
    await prisma.user.create({
        data: { email: 'fan@edg.com', password: '123', role: 'FAN', name: 'Super Fan' }
    })

    // 3. Seed Teams
    console.log('Seeding teams...')
    for (const teamData of TEAMS) {
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
                        number: parseInt(p.jersey),
                        position: p.pos,
                        height: p.height,
                        weight: "200 lbs",
                        ovr: p.overall,
                        archetype: p.archetype,
                        avatar: p.avatar,
                    }))
                }
            }
        })
    }

    // 4. Seed Mock Prospects
    console.log('Seeding prospects...')
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
                isProspect: true // No stats in schema yet
            }
        })
    ));

    console.log('Seeding completed successfully.')
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
