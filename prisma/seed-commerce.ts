import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding Commerce Data...')

    // 1. Create Products (Merch)
    const products = [
        {
            name: 'Official Team Jersey (Home)',
            description: 'Authentic home jersey with premium stitching.',
            price: 7999, // $79.99
            category: 'MERCH',
            image: 'https://placehold.co/400x400/png?text=Home+Jersey',
        },
        {
            name: 'Official Team Jersey (Away)',
            description: 'Authentic away jersey with premium stitching.',
            price: 7999,
            category: 'MERCH',
            image: 'https://placehold.co/400x400/png?text=Away+Jersey',
        },
        {
            name: 'Snapback Hat',
            description: 'Adjustable snapback with embroidered logo.',
            price: 2999,
            category: 'ACCESSORY',
            image: 'https://placehold.co/400x400/png?text=Snapback',
        },
        {
            name: 'Training Hoodie',
            description: 'Performance fleece hoodie for warmups.',
            price: 5999,
            category: 'MERCH',
            image: 'https://placehold.co/400x400/png?text=Hoodie',
        }
    ];

    for (const p of products) {
        // Use upsert or simple create - create is fine for seeding if we assume clean slate or unique constraints (none here on name)
        // To be safe against re-runs, we could check first, but let's just create for now.
        await prisma.product.create({ data: p });
    }

    // 2. Create Ticket Types for a Dummy Game
    const gameId = 'game-1'
    const tickets = [
        {
            gameId,
            name: 'General Admission',
            price: 1500, // $15.00
            capacity: 200,
        },
        {
            gameId,
            name: 'VIP Courtside',
            price: 10000, // $100.00
            capacity: 20,
        }
    ];

    for (const t of tickets) {
        await prisma.ticketType.create({ data: t });
    }

    // 3. Create Subscription Plans
    const plans = [
        { name: 'Rookie', price: 999, stripePriceId: 'price_rookie_mock', features: '["Match Access", "Member Badge"]' },
        { name: 'Pro', price: 1999, stripePriceId: 'price_pro_mock', features: '["All Matches", "10% Merch Discount", "Pro Badge"]' },
        { name: 'All-Star', price: 4999, stripePriceId: 'price_allstar_mock', features: '["VIP Seating", "20% Merch Discount", "Meet & Greet"]' },
    ];

    for (const plan of plans) {
        await prisma.subscriptionPlan.create({ data: plan });
    }

    console.log('Seeding Complete.')
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
