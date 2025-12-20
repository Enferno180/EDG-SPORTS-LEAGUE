'use client';

import React, { useState } from 'react';
import { TEAMS } from '@/lib/data';
import { PlayerProfileModal } from '@/components/PlayerProfileModal';
import type { Player } from '@/lib/data';

const POSITION_ORDER = { 'PG': 1, 'SG': 2, 'SF': 3, 'PF': 4, 'C': 5 };

export default function RostersPage() {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

    return (
        <section className="container mx-auto px-5 py-8 min-h-screen">
            <PlayerProfileModal player={selectedPlayer} isOpen={!!selectedPlayer} onClose={() => setSelectedPlayer(null)} />

            <h2 className="section-title mb-6">TEAM ROSTERS</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEAMS.map(team => {
                    const sortedPlayers = [...team.players].sort((a, b) => {
                        return (POSITION_ORDER[a.pos as keyof typeof POSITION_ORDER] || 99) - (POSITION_ORDER[b.pos as keyof typeof POSITION_ORDER] || 99);
                    });

                    return (
                        <div key={team.name} className="bg-card border border-white/10 rounded-lg overflow-hidden flex flex-col hover:border-primary/50 transition-colors group">
                            {/* Header */}
                            <div className="p-4 flex items-center gap-4" style={{ backgroundColor: team.colors.primary }}>
                                <div className="bg-black/30 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg border-2 border-white/20">
                                    {team.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-head font-bold text-xl text-white tracking-wide">{team.name.toUpperCase()}</h3>
                                </div>
                            </div>

                            {/* Roster List */}
                            <div className="p-4 flex-1 bg-black/40">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-white/40 text-[10px] uppercase tracking-wider border-b border-white/10">
                                            <th className="text-left pb-2">Pos</th>
                                            <th className="text-left pb-2">Player</th>
                                            <th className="text-right pb-2">OVR</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-mono">
                                        {sortedPlayers.map(player => (
                                            <tr key={player.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                                <td className="py-2 text-primary w-10">{player.pos}</td>
                                                <td className="py-2">
                                                    <button
                                                        onClick={() => setSelectedPlayer(player)}
                                                        className="text-white hover:text-primary transition-colors text-left w-full"
                                                    >
                                                        {player.name}
                                                    </button>
                                                </td>
                                                <td className="py-2 text-right text-accent font-bold">{player.overall}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
