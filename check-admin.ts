
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.findUnique({
        where: { email: 'admin@edg.com' }
    })

    if (admin) {
        console.log('Default Admin found:', admin.email)
        console.log('Role:', admin.role)
        console.log('Password:', admin.password) // Safe to log in this private terminal context for debugging
    } else {
        console.log('No default admin found.')
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
