
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

console.log("Runtime DATABASE_URL:", process.env.DATABASE_URL)

async function main() {
    console.log('Provider:', (prisma as any)._engineConfig?.datamodelPath)
    // Just try to connect
    try {
        await prisma.$connect()
        console.log("Connected!")
    } catch (e) {
        console.error("Connect error:", e)
    }
}
main()
