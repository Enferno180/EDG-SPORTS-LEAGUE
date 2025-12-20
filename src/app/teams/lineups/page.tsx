'use client';

import React, { useState } from 'react';
import { TEAMS } from '@/lib/data';
import { PlayerProfileModal } from '@/components/PlayerProfileModal';
import type { Player } from '@/lib/data';

const POSITION_ORDER = { 'PG': 1, 'SG': 2, 'SF': 3, 'PF': 4, 'C': 5 };

export default function LineupsPage() {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

    return (
        <section className="container mx-auto px-5 py-8 min-h-screen">
            <PlayerProfileModal player={selectedPlayer} isOpen={!!selectedPlayer} onClose={() => setSelectedPlayer(null)} />

            <h2 className="section-title mb-6">STARTING LINEUPS</h2>
            <p className="text-muted-foreground mb-8 text-sm italic">Projected starters based on player overall ratings and position.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {TEAMS.map(team => {
                    // Simple logic: Take top 5 sorted by OVR for now, or ideally 1 of each position
                    // For this mock, we just take the first 5 players
                    // THEN sort them by position
                    const starters = team.players.slice(0, 5).sort((a, b) => {
                        return (POSITION_ORDER[a.pos as keyof typeof POSITION_ORDER] || 99) - (POSITION_ORDER[b.pos as keyof typeof POSITION_ORDER] || 99);
                    });

                    return (
                        <div key={team.name} className="bg-card border border-white/10 rounded-lg overflow-hidden relative">
                            {/* Court Background Effect */}
                            <div className="absolute inset-0 bg-[url('/court-texture.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>

                            <div className="p-4 border-b border-white/10 flex justify-between items-center" style={{ borderLeft: `4px solid ${team.colors.primary}` }}>
                                <h3 className="font-head font-bold text-2xl text-white tracking-wide">{team.name}</h3>
                                <div className="text-xs font-bold px-2 py-1 rounded bg-white/10 text-white/50">OVR: {Math.round(team.players.reduce((acc, p) => acc + p.overall, 0) / team.players.length)}</div>
                            </div>

                            <div className="p-5 grid grid-cols-1 gap-2">
                                {starters.map((player, index) => (
                                    <button
                                        key={player.id}
                                        onClick={() => setSelectedPlayer(player)}
                                        className="flex items-center gap-4 p-2 rounded bg-black/40 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-left w-full group"
                                    >
                                        <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border border-primary/30">
                                            {player.pos}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-white text-sm group-hover:text-primary transition-colors">{player.name}</div>
                                            <div className="text-[10px] text-white/50 uppercase">{player.archetype}</div>
                                        </div>
                                        <div className="text-xl font-bold text-accent italic">{player.overall}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
