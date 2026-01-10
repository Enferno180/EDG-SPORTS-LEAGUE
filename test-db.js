
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://neondb_owner:Serenity!jr!1516@ep-purple-darkness-a46cmokd-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
        }
    }
});

async function main() {
    try {
        await prisma.$connect();
        console.log('Successfully connected to database!');
        const userCount = await prisma.user.count();
        console.log(`User count: ${userCount}`);
        await prisma.$disconnect();
        process.exit(0);
    } catch (e) {
        console.error('Connection failed:', e);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();
