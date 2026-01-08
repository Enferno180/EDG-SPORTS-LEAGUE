
'use client';

import React, { useState, useMemo } from 'react';
import { PlayerProfileModal } from '@/components/PlayerProfileModal';

// Define a type that matches what Prisma returns + what the Modal expects
// We might need to map Prisma Player to the shape expected by Modal if it differs
// For now assuming we pass enough data.
// The Modal likely expects 'teams' string name, but Prisma has 'team: { name: string }'
// We will handle that mapping in the server component or here.

export default function LeadersClient({ players }: { players: any[] }) {
    const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);

    const leagueLeaders = useMemo(() => {
        const categories = [
            { id: 'leaders-ppg', key: 'ppg', label: 'SCORING (PPG)' },
            { id: 'leaders-rpg', key: 'rpg', label: 'REBOUNDS (RPG)' },
            { id: 'leaders-apg', key: 'apg', label: 'ASSISTS (APG)' },
            { id: 'leaders-spg', key: 'spg', label: 'STEALS (SPG)' },
            { id: 'leaders-bpg', key: 'bpg', label: 'BLOCKS (BPG)' },
            { id: 'leaders-fg', key: 'fgPct', label: 'FG%' },
            { id: 'leaders-3p', key: 'threePtPct', label: '3P%' },
        ];
        return categories.map(cat => ({
            ...cat,
            players: [...players]
                .sort((a, b) => (b[cat.key] || 0) - (a[cat.key] || 0))
                .slice(0, 5) // Show top 5
        }))
    }, [players]);

    return (
        <section className="container mx-auto px-5 py-8 min-h-screen">
            <PlayerProfileModal
                player={selectedPlayer}
                isOpen={!!selectedPlayer}
                onClose={() => setSelectedPlayer(null)}
            />

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
                                                <div className="w-8 h-8 rounded-full border border-border overflow-hidden bg-zinc-800">
                                                    {p.avatar && <img src={p.avatar} className="w-full h-full object-cover" alt={p.name} />}
                                                </div>
                                                <div>
                                                    <button onClick={() => setSelectedPlayer(p)} className={`text-left hover:text-primary transition-colors ${index === 0 ? 'text-primary text-base font-bold' : 'text-gray-200 text-sm font-medium'}`}>{p.name}</button>
                                                    <div className="text-xs text-muted-foreground">{p.team?.name || p.team}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2 text-right font-head text-lg">
                                            {typeof p[cat.key] === 'number' && cat.key.includes('Pct') ? p[cat.key].toFixed(1) + '%' : p[cat.key]}
                                        </td>
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
