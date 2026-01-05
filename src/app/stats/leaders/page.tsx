'use client';

import React, { useState, useMemo } from 'react';
import { TEAMS } from '@/lib/data';
import { PlayerProfileModal } from '@/components/PlayerProfileModal';
import type { Player } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default function LeadersPage() {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const allPlayers = useMemo(() => TEAMS.flatMap(team => team.players), []);

    const leagueLeaders = useMemo(() => {
        const categories = [
            { id: 'leaders-ppg', key: 'ppg', label: 'SCORING (PPG)' },
            { id: 'leaders-rpg', key: 'rpg', label: 'REBOUNDS (RPG)' },
            { id: 'leaders-apg', key: 'apg', label: 'ASSISTS (APG)' },
            { id: 'leaders-spg', key: 'spg', label: 'STEALS (SPG)' },
            { id: 'leaders-bpg', key: 'bpg', label: 'BLOCKS (BPG)' },
            // We can even add the new stats here if we want!
            { id: 'leaders-fg', key: 'fgPct', label: 'FG%' },
            { id: 'leaders-3p', key: 'threePtPct', label: '3P%' },
        ];
        return categories.map(cat => ({
            ...cat,
            players: [...allPlayers].sort((a, b) => (b[cat.key as keyof Player] as number) - (a[cat.key as keyof Player] as number)).slice(0, 5) // Show top 5
        }))
    }, [allPlayers]);

    return (
        <section className="container mx-auto px-5 py-8 min-h-screen">
            <PlayerProfileModal player={selectedPlayer} isOpen={!!selectedPlayer} onClose={() => setSelectedPlayer(null)} />

            <h2 className="section-title mb-8">LEAGUE LEADERS</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leagueLeaders.map(cat => (
                    <div className="leader-list-box" key={cat.id}>
                        <div className="leader-list-header">
                            <h4 className="leader-list-title">{cat.label}</h4>
                        </div>
                        <table className="w-full">
                            <tbody>
                                {cat.players.map((p, index) => (
                                    <tr key={p.id} className="border-b border-border/30 last:border-0">
                                        <td className="p-2 w-8 text-muted-foreground">{index + 1}</td>
                                        <td className="p-2">
                                            <div className="flex items-center gap-2">
                                                <img src={p.avatar} className="w-8 h-8 rounded-full border border-border" alt={p.name} />
                                                <div>
                                                    <button onClick={() => setSelectedPlayer(p)} className={`text-left hover:text-primary transition-colors ${index === 0 ? 'text-accent text-base font-bold' : 'text-gray-200 text-sm font-medium'}`}>{p.name}</button>
                                                    <div className="text-xs text-muted-foreground">{p.team}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2 text-right font-head text-lg">{(p[cat.key as keyof Player] as any)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </section>
    );
}
