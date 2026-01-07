
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import path from 'path'

// Load .env.local explicitly since we are running via tsx, not next
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
// Also load .env as fallback (dotenv won't overwrite existing keys)
dotenv.config()

const prisma = new PrismaClient()

async function main() {
    console.log('Attempting to connect to the database...')
    try {
        await prisma.$connect()
        console.log('✅ Connection successful!')

        // Try a simple query
        const userCount = await prisma.user.count()
        console.log(`✅ Database is responding. Found ${userCount} users (Individual Accounts).`)

        const users = await prisma.user.findMany({
            select: { id: true, name: true, email: true, role: true }
        })
        console.log('User Accounts Found:', users)

        const teamCount = await prisma.team.count()
        console.log(`✅ Found ${teamCount} teams.`)

    } catch (e) {
        console.error('❌ Error connecting to the database:', e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
