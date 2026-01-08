
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const email = 'mwilson@edgsports.org'
    const password = '123' // Default temporary password

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            role: 'ADMIN',
            password: password,
            name: 'M. Wilson'
        },
        create: {
            email,
            password,
            role: 'ADMIN',
            name: 'M. Wilson'
        }
    })

    console.log(`Admin created: ${user.email}`)
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
