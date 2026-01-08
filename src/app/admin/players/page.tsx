
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const prisma = new PrismaClient()

export default async function AdminPlayersPage({ searchParams }: { searchParams: { q?: string } }) {
    const query = searchParams.q || ''

    const players = await prisma.player.findMany({
        where: {
            name: { contains: query, mode: 'insensitive' }
        },
        orderBy: { name: 'asc' },
        include: { team: true },
        take: 50 // Limit for performance
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Player Manager</h1>
                <Link href="/admin/players/new">
                    <Button>+ New Player</Button>
                </Link>
            </div>

            {/* Search Bar */}
            <form className="flex gap-2">
                <Input
                    name="q"
                    placeholder="Search players..."
                    defaultValue={query}
                    className="max-w-sm"
                />
                <Button type="submit" variant="secondary">Search</Button>
            </form>

            <div className="grid grid-cols-1 gap-4">
                {players.map((player) => (
                    <Link
                        key={player.id}
                        href={`/admin/players/${player.id}`}
                        className="block"
                    >
                        <Card className="hover:bg-zinc-900 transition-colors border-l-4" style={{ borderLeftColor: player.team?.primaryColor || '#333' }}>
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden">
                                        {player.avatar ? (
                                            <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">N/A</div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg">{player.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {player.team?.name || 'Free Agent'} • {player.position}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <div className="text-xs text-muted-foreground uppercase">OVR</div>
                                        <div className="font-black text-xl">{player.ovr}</div>
                                    </div>
                                    <Button variant="ghost" size="sm">Edit →</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
            {players.length === 0 && (
                <div className="text-center text-muted-foreground py-10">
                    No players found.
                </div>
            )}
        </div>
    )
}
