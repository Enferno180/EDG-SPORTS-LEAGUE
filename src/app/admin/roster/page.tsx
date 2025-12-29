import prisma from '@/lib/prisma'
import RosterManager from './RosterManager'

export default async function AdminRosterPage() {
    const teams = await prisma.team.findMany({
        include: {
            players: true
        },
        orderBy: {
            name: 'asc'
        }
    })

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-black text-white italic mb-2 tracking-tighter">ROSTER MANAGER</h1>
            <p className="text-gray-400 mb-8">Manage team rosters, release players, and sign free agents.</p>

            <RosterManager teams={teams} />
        </div>
    )
}
