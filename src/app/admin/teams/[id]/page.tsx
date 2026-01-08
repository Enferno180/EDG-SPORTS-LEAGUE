
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

async function updateTeam(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    const wins = parseInt(formData.get('wins') as string)
    const losses = parseInt(formData.get('losses') as string)
    const logo = formData.get('logo') as string

    await prisma.team.update({
        where: { id },
        data: { wins, losses, logo }
    })

    revalidatePath(`/admin/teams/${id}`)
    revalidatePath('/admin/teams')
}

export default async function TeamDetailPage({ params }: { params: { id: string } }) {
    const team = await prisma.team.findUnique({
        where: { id: params.id },
        include: { players: { orderBy: { ovr: 'desc' } } }
    })

    if (!team) notFound()

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/teams">
                    <Button variant="ghost" size="sm">← Back</Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Manage Team: {team.name}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Team Details Form */}
                <Card className="lg:col-span-1 border-2" style={{ borderColor: team.primaryColor }}>
                    <CardHeader className="text-white" style={{ backgroundColor: team.primaryColor }}>
                        <CardTitle className="flex items-center gap-3">
                            <img src={team.logo} className="w-10 h-10 bg-white rounded-full p-1" />
                            Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form action={updateTeam} className="space-y-4">
                            <input type="hidden" name="id" value={team.id} />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Wins</Label>
                                    <Input name="wins" type="number" defaultValue={team.wins} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Losses</Label>
                                    <Input name="losses" type="number" defaultValue={team.losses} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Logo URL</Label>
                                <Input name="logo" defaultValue={team.logo} />
                            </div>

                            <Button type="submit" className="w-full">Save Changes</Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Roster List */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Roster ({team.players.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-1">
                            {team.players.map(player => (
                                <Link
                                    key={player.id}
                                    href={`/admin/players/${player.id}`}
                                    className="flex items-center justify-between p-3 hover:bg-zinc-900 rounded-lg group transition-colors border border-transparent hover:border-zinc-800"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
                                            {player.avatar && <img src={player.avatar} className="w-full h-full object-cover" />}
                                        </div>
                                        <div>
                                            <div className="font-bold">{player.name}</div>
                                            <div className="text-xs text-blue-400">{player.position} • {player.archetype}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm font-mono">
                                        <div className="text-center w-12">
                                            <div className="text-xs text-gray-500">OVR</div>
                                            <div className="font-bold text-lg text-white">{player.ovr}</div>
                                        </div>
                                        <div className="text-center w-12 hidden sm:block">
                                            <div className="text-xs text-gray-500">PPG</div>
                                            <div>{player.ppg}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
