import prisma from '@/lib/prisma';
import ScorekeeperInterface from './ScorekeeperInterface';

export const dynamic = 'force-dynamic';

export default async function LiveScorePage() {
    const teams = await prisma.team.findMany({
        include: {
            players: true
        },
        orderBy: {
            name: 'asc'
        }
    });

    return <ScorekeeperInterface teams={teams} />;
}
