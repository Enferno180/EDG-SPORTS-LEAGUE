'use client';

import React, { useState, useMemo } from 'react';
import { TEAMS } from '@/lib/data';
import { PlayerProfileModal } from '@/components/PlayerProfileModal';
import type { Player } from '@/lib/data';
import { calculateOVR } from '@/lib/rating';
import { CaretUp, CaretDown, CaretUpDown } from '@phosphor-icons/react';

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
        setPlayerSort(prev => {
            if (prev.column === column) {
                return {
                    ...prev,
                    direction: prev.direction === 'asc' ? 'desc' : 'asc'
                };
            }
            const isStringCol = ['name', 'team', 'pos'].includes(column);
            return {
                column,
                direction: isStringCol ? 'asc' : 'desc'
            };
        });
    };

    const filteredPlayers = useMemo(() => {
        // Define Position Order
        const posOrder = { 'PG': 1, 'SG': 2, 'SF': 3, 'PF': 4, 'C': 5 };

        return allPlayers
            .filter(p => {
                const search = playerSearch.toLowerCase();
                const matchesName = p.name.toLowerCase().includes(search) || p.team.toLowerCase().includes(search);
                const matchesPos = positionFilter === 'ALL' || p.pos === positionFilter;
                return matchesName && matchesPos;
            })
            .sort((a, b) => {
                const col = playerSort.column;
                let valA: any = a[col as keyof typeof a];
                let valB: any = b[col as keyof typeof b];

                // Special Case: Overall (calculated)
                if (col === 'overall') {
                    valA = getPlayerOVR(a);
                    valB = getPlayerOVR(b);
                }

                // Special Case: Position Check
                if (col === 'pos') {
                    valA = posOrder[a.pos as keyof typeof posOrder] || 99;
                    valB = posOrder[b.pos as keyof typeof posOrder] || 99;
                }

                // Handle null/undefined
                if (valA === null || valA === undefined) return 1;
                if (valB === null || valB === undefined) return -1;

                // Force numeric conversion for stat columns
                const isNumericCol = !['name', 'team', 'pos', 'injury', 'status'].includes(col);
                if (isNumericCol) {
                    valA = Number(valA);
                    valB = Number(valB);
                }

                if (typeof valA === 'string' && typeof valB === 'string') {
                    valA = valA.toLowerCase();
                    valB = valB.toLowerCase();
                }

                if (valA < valB) return playerSort.direction === 'asc' ? -1 : 1;
                if (valA > valB) return playerSort.direction === 'asc' ? 1 : -1;
                return 0;
            });
    }, [allPlayers, playerSearch, positionFilter, playerSort]);

    const getSortIcon = (column: string) => {
        if (playerSort.column !== column) return <CaretUpDown className="opacity-20 ml-1 inline-block" size={16} />;
        return playerSort.direction === 'asc'
            ? <CaretUp className="text-primary ml-1 inline-block" size={16} weight="fill" />
            : <CaretDown className="text-primary ml-1 inline-block" size={16} weight="fill" />;
    };

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
                            <th onClick={() => sortPlayers('name')} className="th-cell sortable cursor-pointer hover:text-primary transition-colors">PLAYER {getSortIcon('name')}</th>
                            <th onClick={() => sortPlayers('team')} className="th-cell sortable cursor-pointer hover:text-primary transition-colors">TEAM {getSortIcon('team')}</th>
                            <th onClick={() => sortPlayers('pos')} className="th-cell sortable cursor-pointer hover:text-primary transition-colors">POS {getSortIcon('pos')}</th>
                            <th onClick={() => sortPlayers('overall')} className="th-cell sortable cursor-pointer hover:text-primary transition-colors">OVR {getSortIcon('overall')}</th>
                            <th onClick={() => sortPlayers('ppg')} className="th-cell sortable cursor-pointer hover:text-primary transition-colors">PPG {getSortIcon('ppg')}</th>
                            <th onClick={() => sortPlayers('rpg')} className="th-cell sortable cursor-pointer hover:text-primary transition-colors">RPG {getSortIcon('rpg')}</th>
                            <th onClick={() => sortPlayers('apg')} className="th-cell sortable cursor-pointer hover:text-primary transition-colors">APG {getSortIcon('apg')}</th>
                            <th onClick={() => sortPlayers('spg')} className="th-cell sortable cursor-pointer hover:text-primary transition-colors">SPG {getSortIcon('spg')}</th>
                            <th onClick={() => sortPlayers('bpg')} className="th-cell sortable cursor-pointer hover:text-primary transition-colors">BPG {getSortIcon('bpg')}</th>
                            <th onClick={() => sortPlayers('fgPct')} className="th-cell sortable cursor-pointer hover:text-primary transition-colors">FG% {getSortIcon('fgPct')}</th>
                            <th onClick={() => sortPlayers('threePtPct')} className="th-cell sortable cursor-pointer hover:text-primary transition-colors">3P% {getSortIcon('threePtPct')}</th>
                            <th onClick={() => sortPlayers('ftPct')} className="th-cell sortable cursor-pointer hover:text-primary transition-colors">FT% {getSortIcon('ftPct')}</th>
                            <th onClick={() => sortPlayers('tov')} className="th-cell sortable cursor-pointer hover:text-primary transition-colors">TOV {getSortIcon('tov')}</th>
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
                                <td className="td-cell font-bold text-lg text-white">{getPlayerOVR(p)}</td>
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
