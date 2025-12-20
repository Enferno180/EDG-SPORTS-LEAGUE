'use client';

import React, { useState, useMemo } from 'react';
import { TEAMS } from '@/lib/data';
import { PlayerProfileModal } from '@/components/PlayerProfileModal';
import type { Player } from '@/lib/data';
import { calculateOVR } from '@/lib/rating';

export default function PlayersStatsPage() {
    const [playerSearch, setPlayerSearch] = useState('');
    const [positionFilter, setPositionFilter] = useState('ALL');
    const [playerSort, setPlayerSort] = useState({ column: 'ppg', direction: 'desc' as 'asc' | 'desc' });
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

    const allPlayers = useMemo(() => TEAMS.flatMap(team => team.players), []);

    const getPlayerOVR = (p: Player) => {
        if (p.attributes) {
            return calculateOVR(p.attributes, p.pos);
        }
        return p.overall;
    };

    const sortPlayers = (column: string) => {
        setPlayerSort(currentSort => {
            if (currentSort.column === column) {
                return { ...currentSort, direction: currentSort.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { column, direction: (['name', 'team', 'pos'].includes(column) ? 'asc' : 'desc') as 'asc' | 'desc' };
        });
    };

    const filteredPlayers = useMemo(() => {
        return allPlayers
            .filter(p => {
                const search = playerSearch.toLowerCase();
                const matchesName = p.name.toLowerCase().includes(search) || p.team.toLowerCase().includes(search);
                const matchesPos = positionFilter === 'ALL' || p.pos === positionFilter;
                return matchesName && matchesPos;
            })
            .sort((a, b) => {
                let valA = playerSort.column === 'overall' ? getPlayerOVR(a) : a[playerSort.column as keyof typeof a];
                let valB = playerSort.column === 'overall' ? getPlayerOVR(b) : b[playerSort.column as keyof typeof b];

                if (valA === null || valA === undefined) return 1;
                if (valB === null || valB === undefined) return -1;

                if (typeof valA === 'string' && typeof valB === 'string') {
                    valA = valA.toLowerCase();
                    valB = valB.toLowerCase();
                }
                if (valA < valB) return playerSort.direction === 'asc' ? -1 : 1;
                if (valA > valB) return playerSort.direction === 'asc' ? 1 : -1;
                return 0;
            });
    }, [allPlayers, playerSearch, positionFilter, playerSort]);

    return (
        <section className="container mx-auto px-5 py-8 min-h-screen">
            <PlayerProfileModal player={selectedPlayer} isOpen={!!selectedPlayer} onClose={() => setSelectedPlayer(null)} />

            <h2 className="section-title mb-6">PLAYER STATISTICS</h2>

            <div className="stats-controls mb-6">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Player Name or Team..."
                    value={playerSearch}
                    onChange={(e) => setPlayerSearch(e.target.value)}
                />
                <select
                    className="filter-select"
                    value={positionFilter}
                    onChange={(e) => setPositionFilter(e.target.value)}
                >
                    <option value="ALL">All Positions</option>
                    <option value="PG">Point Guard (PG)</option>
                    <option value="SG">Shooting Guard (SG)</option>
                    <option value="SF">Small Forward (SF)</option>
                    <option value="PF">Power Forward (PF)</option>
                    <option value="C">Center (C)</option>
                </select>
            </div>

            <div className="scrollable-table-container">
                <table className="stats-table">
                    <thead>
                        <tr>
                            <th onClick={() => sortPlayers('name')} className="th-cell sortable">PLAYER</th>
                            <th onClick={() => sortPlayers('team')} className="th-cell sortable">TEAM</th>
                            <th onClick={() => sortPlayers('pos')} className="th-cell sortable">POS</th>
                            <th onClick={() => sortPlayers('overall')} className="th-cell sortable">OVR</th>
                            <th onClick={() => sortPlayers('ppg')} className="th-cell sortable">PPG</th>
                            <th onClick={() => sortPlayers('rpg')} className="th-cell sortable">RPG</th>
                            <th onClick={() => sortPlayers('apg')} className="th-cell sortable">APG</th>
                            <th onClick={() => sortPlayers('spg')} className="th-cell sortable">SPG</th>
                            <th onClick={() => sortPlayers('bpg')} className="th-cell sortable">BPG</th>
                            <th onClick={() => sortPlayers('fgPct')} className="th-cell sortable">FG%</th>
                            <th onClick={() => sortPlayers('threePtPct')} className="th-cell sortable">3P%</th>
                            <th onClick={() => sortPlayers('ftPct')} className="th-cell sortable">FT%</th>
                            <th onClick={() => sortPlayers('tov')} className="th-cell sortable">TOV</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPlayers.map(p => (
                            <tr key={p.id} className="table-row">
                                <td className="td-cell">
                                    <div className="player-cell">
                                        <img src={p.avatar} alt={p.name} className="player-avatar" />
                                        <button onClick={() => setSelectedPlayer(p)} className="text-left hover:text-primary transition-colors">{p.name}</button>
                                    </div>
                                </td>
                                <td className="td-cell text-muted-foreground text-sm">{p.team}</td>
                                <td className="td-cell">{p.pos}</td>
                                <td className="td-cell text-accent font-bold text-lg">{getPlayerOVR(p)}</td>
                                <td className="td-cell">{p.ppg}</td>
                                <td className="td-cell">{p.rpg}</td>
                                <td className="td-cell">{p.apg}</td>
                                <td className="td-cell">{p.spg}</td>
                                <td className="td-cell">{p.bpg}</td>
                                <td className="td-cell">{p.fgPct}%</td>
                                <td className="td-cell">{p.threePtPct}%</td>
                                <td className="td-cell">{p.ftPct}%</td>
                                <td className="td-cell">{p.tov}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="table-footnote">*League-wide player statistics.</p>
        </section>
    );
}
