
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const prisma = new PrismaClient()

export default async function AdminTeamsPage() {
    const teams = await prisma.team.findMany({
        orderBy: { name: 'asc' },
        include: { _count: { select: { players: true } } }
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Team Manager</h1>
                {/* <Button>Create New Team</Button> */} {/* Not needed for now since we have fixed league */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => (
                    <Card key={team.id} className="overflow-hidden border-2" style={{ borderColor: team.primaryColor }}>
                        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0 text-white" style={{ backgroundColor: team.primaryColor }}>
                            <CardTitle className="text-lg font-bold">{team.name}</CardTitle>
                            <img src={team.logo} alt={team.name} className="h-8 w-8 object-contain bg-white rounded-full p-0.5" />
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Record</span>
                                <span className="font-mono font-bold text-lg">{team.wins} - {team.losses}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Roster Size</span>
                                <span>{team._count.players} Players</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Rating</span>
                                <span className={`font-bold ${team.netRating > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {team.netRating > 0 ? '+' : ''}{team.netRating}
                                </span>
                            </div>

                            <Link href={`/admin/teams/${team.id}`} className="block">
                                <Button className="w-full" variant="outline">
                                    Manage Team
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
