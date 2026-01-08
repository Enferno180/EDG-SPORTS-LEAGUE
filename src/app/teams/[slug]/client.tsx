
'use client';

import React, { useState } from 'react';
import { PlayerProfileModal } from '@/components/PlayerProfileModal';

export default function TeamRosterClient({ players, teamColor }: { players: any[], teamColor: string }) {
    const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);

    return (
        <>
            <PlayerProfileModal
                player={selectedPlayer}
                isOpen={!!selectedPlayer}
                onClose={() => setSelectedPlayer(null)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {players.map((player) => (
                    <div
                        key={player.id}
                        onClick={() => setSelectedPlayer(player)}
                        className="group relative bg-[#121212] overflow-hidden rounded border border-white/5 hover:border-white/20 transition-all cursor-pointer hover:-translate-y-1"
                    >
                        {/* Color Strip */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10 group-hover:bg-opacity-100 transition-colors" style={{ backgroundColor: teamColor }}></div>

                        <div className="flex items-center p-4 pl-6 gap-4">
                            <div className="w-16 h-16 rounded-full bg-zinc-800 overflow-hidden shrink-0 border-2 border-transparent group-hover:border-white transition-colors">
                                {player.avatar ? (
                                    <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-white/20">N/A</div>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{player.name}</h3>
                                    <span className="text-xl font-black text-white/20 font-mono">#{player.number}</span>
                                </div>
                                <div className="text-sm text-gray-400 font-medium mb-1">{player.position} • {player.archetype}</div>
                                <div className="flex gap-3 text-xs font-mono text-gray-500">
                                    <span>{player.height}</span>
                                    <span>{player.weight}</span>
                                </div>
                            </div>

                            <div className="text-center pl-4 border-l border-white/5">
                                <div className="text-[10px] uppercase text-gray-500 mb-0.5">OVR</div>
                                <div className="text-2xl font-black text-white">{player.ovr}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
