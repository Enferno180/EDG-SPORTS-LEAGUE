
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import LeadersClient from '@/app/stats/leaders/client'
// Re-using LeadersClient isn't perfect but allows clicking players for modal. 
// We might want a dedicated TeamRosterClient later, but for now we can reuse "LeadersClient" 
// if we just pass the players list. It renders "League Leaders" though.
// Better to simple create a "TeamRosterClient".

import TeamRosterClient from './client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic';

export default async function TeamDetailPage({ params }: { params: { slug: string } }) {
    const team = await prisma.team.findUnique({
        where: { slug: params.slug },
        include: { players: { include: { team: true }, orderBy: { ovr: 'desc' } } } // Include team in player for Modal context
    })

    if (!team) notFound()

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                <div className="absolute inset-0 bg-black/80 z-10"></div>
                {/* Background Pattern/Image could go here */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-transparent to-black" style={{ backgroundColor: team.primaryColor, opacity: 0.2 }}></div>

                <div className="relative z-20 container mx-auto px-5 h-full flex flex-col md:flex-row items-center justify-center md:justify-start gap-8">
                    <img src={team.logo} className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-full p-2 shadow-2xl mt-8" alt={team.name} />
                    <div className="text-center md:text-left mt-4 md:mt-12">
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-lg" style={{ color: team.primaryColor }}>
                            {team.name}
                        </h1>
                        <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-xl font-bold text-white/80 font-mono">
                            <span>{team.wins}-{team.losses}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                            <span>{team.division}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-zinc-900 border-y border-white/5 py-6">
                <div className="container mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">OFF Rtg</div>
                        <div className="text-2xl font-black text-white">{team.offRating}</div>
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">DEF Rtg</div>
                        <div className="text-2xl font-black text-white">{team.defRating}</div>
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">NET Rtg</div>
                        <div className={`text-2xl font-black ${team.netRating > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {team.netRating > 0 ? '+' : ''}{team.netRating}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">PPG</div>
                        <div className="text-2xl font-black text-white">{team.teamPpg || '--'}</div>
                    </div>
                </div>
            </div>

            {/* Roster Section */}
            <div className="container mx-auto px-5 py-12">
                <h2 className="section-title mb-8">ROSTER</h2>
                <TeamRosterClient players={team.players} teamColor={team.primaryColor} />
            </div>
        </div>
    )
}
