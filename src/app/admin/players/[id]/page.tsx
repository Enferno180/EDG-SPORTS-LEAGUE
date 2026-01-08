
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

async function updatePlayer(formData: FormData) {
    'use server'
    const id = formData.get('id') as string

    // Basic Info
    const name = formData.get('name') as string
    const height = formData.get('height') as string
    const weight = formData.get('weight') as string
    const position = formData.get('position') as string
    const teamId = formData.get('teamId') as string
    const archetype = formData.get('archetype') as string

    // Stats / Ratings
    const ovr = parseInt(formData.get('ovr') as string)
    const ppg = parseFloat(formData.get('ppg') as string)
    const rpg = parseFloat(formData.get('rpg') as string)
    const apg = parseFloat(formData.get('apg') as string)

    // Attributes
    const speed = parseInt(formData.get('speed') as string) || 60
    const dunking = parseInt(formData.get('dunking') as string) || 60
    const threePoint = parseInt(formData.get('threePointScoring') as string) || 60
    // ... add more as needed, but let's start with big ones

    await prisma.player.update({
        where: { id },
        data: {
            name, height, weight, position,
            teamId: teamId === 'NONE' ? null : teamId,
            archetype,
            ovr, ppg, rpg, apg,
            // Map simple attributes directly
            // Note: We should ideally map ALL attributes, but for 'The Remote' demo, we do key ones
            athleticism: speed, // Mapping speed to athleticism for simplicity in this form or separate
            dunking,
            threePointScoring: threePoint
        }
    })

    revalidatePath(`/admin/players/${id}`)
    revalidatePath('/admin/players')
    revalidatePath(`/admin/teams`)
}

export default async function PlayerEditPage({ params }: { params: { id: string } }) {
    const player = await prisma.player.findUnique({
        where: { id: params.id },
        include: { team: true }
    })

    const teams = await prisma.team.findMany({ orderBy: { name: 'asc' } })

    if (!player) notFound()

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/players">
                    <Button variant="ghost" size="sm">← All Players</Button>
                </Link>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold tracking-tight">{player.name}</h1>
                    <p className="text-muted-foreground">{player.team?.name || 'Free Agent'} • #{player.number}</p>
                </div>
            </div>

            <form action={updatePlayer} className="space-y-8">
                <input type="hidden" name="id" value={player.id} />

                {/* General Info */}
                <Card>
                    <CardHeader><CardTitle>General Info</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input name="name" defaultValue={player.name} />
                        </div>
                        <div className="space-y-2">
                            <Label>Archetype</Label>
                            <Input name="archetype" defaultValue={player.archetype || ''} />
                        </div>
                        <div className="space-y-2">
                            <Label>Height</Label>
                            <Input name="height" defaultValue={player.height} />
                        </div>
                        <div className="space-y-2">
                            <Label>Weight</Label>
                            <Input name="weight" defaultValue={player.weight} />
                        </div>
                        <div className="space-y-2">
                            <Label>Position</Label>
                            <Input name="position" defaultValue={player.position} />
                        </div>
                        <div className="space-y-2">
                            <Label>Team</Label>
                            <select
                                name="teamId"
                                defaultValue={player.teamId || 'NONE'}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="NONE">Free Agent</option>
                                {teams.map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* Ratings & Stats */}
                <Card>
                    <CardHeader><CardTitle>Ratings & Stats</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label className="text-yellow-500 font-bold">OVR Rating</Label>
                            <Input name="ovr" type="number" defaultValue={player.ovr} className="text-lg font-bold" />
                        </div>
                        <div className="space-y-2">
                            <Label>PPG</Label>
                            <Input name="ppg" type="number" step="0.1" defaultValue={player.ppg} />
                        </div>
                        <div className="space-y-2">
                            <Label>RPG</Label>
                            <Input name="rpg" type="number" step="0.1" defaultValue={player.rpg} />
                        </div>
                        <div className="space-y-2">
                            <Label>APG</Label>
                            <Input name="apg" type="number" step="0.1" defaultValue={player.apg} />
                        </div>
                    </CardContent>
                </Card>

                {/* Key Attributes (The "Ferrari" Controls) */}
                <Card>
                    <CardHeader><CardTitle>Skill Attributes (The Engine)</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                            <Label>Athleticism / Speed</Label>
                            <div className="flex items-center gap-2">
                                <Input name="speed" type="number" defaultValue={player.athleticism} max={99} />
                                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500" style={{ width: `${player.athleticism}%` }} />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label>3-Point Shooting</Label>
                            <div className="flex items-center gap-2">
                                <Input name="threePointScoring" type="number" defaultValue={player.threePointScoring} max={99} />
                                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500" style={{ width: `${player.threePointScoring}%` }} />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label>Dunking</Label>
                            <div className="flex items-center gap-2">
                                <Input name="dunking" type="number" defaultValue={player.dunking} max={99} />
                                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500" style={{ width: `${player.dunking}%` }} />
                                </div>
                            </div>
                        </div>

                        {/* Note: I'm only exposing 3 for the demo to keep it clean, but backend supports all. */}
                    </CardContent>
                </Card>

                <div className="flex gap-4">
                    <Button type="submit" size="lg" className="flex-1">Save Changes</Button>
                    <Button type="button" variant="destructive">Release Player</Button>
                </div>

                {/* Badges Display (Read Only for now) */}
                <Card className="opacity-75">
                    <CardHeader><CardTitle>Badges (JSON Data)</CardTitle></CardHeader>
                    <CardContent>
                        <pre className="text-xs bg-black p-4 rounded overflow-auto">
                            {JSON.stringify(player.badges, null, 2)}
                        </pre>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}
