'use client';

import { useState } from 'react';
import { PlayerProfileModal } from '@/components/PlayerProfileModal';
import { Player } from '@/lib/data';

interface DraftBoardClientProps {
    initialProspects: Player[];
}

export default function DraftBoardClient({ initialProspects }: DraftBoardClientProps) {
    const [selectedProspect, setSelectedProspect] = useState<Player | null>(null);
    const [filterPos, setFilterPos] = useState<string>('ALL');

    const filteredProspects = initialProspects.filter(p =>
        filterPos === 'ALL' || p.pos === filterPos
    );

    return (
        <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-white/5 flex gap-4 items-center">
                <span className="text-sm font-bold text-gray-400 uppercase">Filter:</span>
                {['ALL', 'PG', 'SG', 'SF', 'PF', 'C'].map(pos => (
                    <button
                        key={pos}
                        onClick={() => setFilterPos(pos)}
                        className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${filterPos === pos
                            ? 'bg-edg-red text-white'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        {pos}
                    </button>
                ))}
            </div>

            {/* Header */}
            <div className="grid grid-cols-12 bg-white/5 py-3 px-6 text-xs font-bold uppercase text-gray-500 tracking-wider items-center">
                <div className="col-span-1">Rank</div>
                <div className="col-span-4">Player</div>
                <div className="col-span-2">Position</div>
                <div className="col-span-3">School/Origin</div>
                <div className="col-span-2 text-right">OVR Grade</div>
            </div>

            {/* List */}
            {filteredProspects.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                    <h3 className="text-xl font-bold mb-2">No Prospects Found</h3>
                    <p>Try adjusting your filters.</p>
                </div>
            ) : (
                filteredProspects.map((player, index) => (
                    <div
                        key={player.id}
                        onClick={() => setSelectedProspect(player)}
                        className="grid grid-cols-12 py-4 px-6 border-t border-white/5 items-center hover:bg-white/5 transition-colors group cursor-pointer"
                    >
                        <div className="col-span-1 font-black text-xl text-white">
                            {index + 1}
                        </div>
                        <div className="col-span-4">
                            <div className="font-bold text-lg group-hover:text-edg-red transition-colors">{player.name}</div>
                            <div className="text-xs text-gray-500">{player.height} • {player.age} yrs</div>
                        </div>
                        <div className="col-span-2 text-sm font-bold text-gray-400">
                            <span className="bg-black/30 px-2 py-1 rounded">{player.pos}</span>
                        </div>
                        <div className="col-span-3 text-sm text-gray-400">
                            <div className="text-white">{player.team !== 'Free Agent' ? player.team : 'Uncommitted'}</div>
                            <div className="text-xs text-edg-teal">{player.archetype}</div>
                        </div>
                        <div className="col-span-2 text-right">
                            <span className={`text-2xl font-black italic ${player.overall >= 90 ? 'text-edg-red' :
                                player.overall >= 80 ? 'text-edg-teal' : 'text-white'
                                }`}>
                                {player.overall}
                            </span>
                        </div>
                    </div>
                ))
            )}

            {/* Modal */}
            {selectedProspect && (
                <PlayerProfileModal
                    isOpen={true}
                    player={selectedProspect}
                    onClose={() => setSelectedProspect(null)}
                />
            )}
        </div>
    );
}
