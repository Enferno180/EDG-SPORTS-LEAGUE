
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic';

export default async function TeamsPage() {
    const teams = await prisma.team.findMany({
        orderBy: { name: 'asc' }
    })

    return (
        <section className="container mx-auto px-5 py-8 min-h-screen">
            <h2 className="section-title mb-8">TEAMS</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teams.map((team) => (
                    <Link key={team.id} href={`/teams/${team.slug}`} className="block group">
                        <Card className="overflow-hidden border-2 transition-transform duration-300 group-hover:-translate-y-1 bg-zinc-900/50" style={{ borderColor: team.primaryColor }}>
                            <CardHeader className="p-6 pb-2 text-center" style={{ backgroundColor: team.primaryColor + '20' }}> {/* 20% opacity bg */}
                                <div className="mx-auto w-24 h-24 bg-white rounded-full p-2 mb-4 shadow-lg flex items-center justify-center">
                                    <img src={team.logo} alt={team.name} className="w-full h-full object-contain" />
                                </div>
                                <CardTitle className="text-xl font-bold uppercase tracking-wider text-white">{team.name}</CardTitle>
                                <p className="text-xs font-bold text-white/50">{team.division}</p>
                            </CardHeader>
                            <CardContent className="p-4 text-center">
                                <div className="inline-block px-4 py-1 rounded bg-black/40 text-lg font-mono font-bold text-white mb-2">
                                    {team.wins} - {team.losses}
                                </div>
                                <div className={`text-xs font-bold ${team.netRating > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {team.netRating > 0 ? '+' : ''}{team.netRating} Net Rtg
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}
