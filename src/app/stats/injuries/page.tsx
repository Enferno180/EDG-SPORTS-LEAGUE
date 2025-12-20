'use client';

import React, { useState, useMemo } from 'react';
import { TEAMS } from '@/lib/data';
import { PlayerProfileModal } from '@/components/PlayerProfileModal';
import type { Player } from '@/lib/data';

export default function InjuriesPage() {
    const [injurySearch, setInjurySearch] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const allPlayers = useMemo(() => TEAMS.flatMap(team => team.players), []);

    const filteredInjuries = useMemo(() => {
        return allPlayers.filter(p =>
            p.status === 'Injured' &&
            (p.name.toLowerCase().includes(injurySearch.toLowerCase()) ||
                p.team.toLowerCase().includes(injurySearch.toLowerCase()))
        );
    }, [allPlayers, injurySearch]);

    return (
        <section className="container mx-auto px-5 py-8 min-h-screen">
            <PlayerProfileModal player={selectedPlayer} isOpen={!!selectedPlayer} onClose={() => setSelectedPlayer(null)} />

            <h2 className="section-title mb-6">INJURY REPORT</h2>

            <div className="stats-controls mb-6">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Injured Player..."
                    value={injurySearch}
                    onChange={(e) => setInjurySearch(e.target.value)}
                />
            </div>
            <div className="scrollable-table-container">
                <table className="stats-table">
                    <thead>
                        <tr>
                            <th className="th-cell">PLAYER</th>
                            <th className="th-cell">TEAM</th>
                            <th className="th-cell">POS</th>
                            <th className="th-cell">INJURY</th>
                            <th className="th-cell">STATUS</th>
                            <th className="th-cell">EXP. RETURN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInjuries.length > 0 ? filteredInjuries.map(p => (
                            <tr key={p.id} className="table-row">
                                <td className="td-cell">
                                    <div className="player-cell">
                                        <img src={p.avatar} alt={p.name} className="player-avatar" />
                                        <button onClick={() => setSelectedPlayer(p)} className="text-left hover:text-primary transition-colors">{p.name}</button>
                                    </div>
                                </td>
                                <td className="td-cell text-muted-foreground">{p.team}</td>
                                <td className="td-cell">{p.pos}</td>
                                <td className="td-cell text-accent font-bold">{p.injury}</td>
                                <td className="td-cell"><span className="status-badge status-injured">Injured</span></td>
                                <td className="td-cell">{p.returnTime}</td>
                            </tr>
                        )) : <tr><td colSpan={6} className="text-center p-5 text-muted-foreground">No injuries found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
