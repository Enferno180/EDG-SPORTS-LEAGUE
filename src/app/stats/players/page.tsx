'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { TEAMS } from '@/lib/data';
import { PlayerProfileModal } from '@/components/PlayerProfileModal';
import type { Player } from '@/lib/data';
import { calculateOVR } from '@/lib/rating';
import { CaretUp, CaretDown, CaretUpDown, MagnifyingGlass, Funnel } from '@phosphor-icons/react';

export default function PlayersStatsPage() {
    const [playerSearch, setPlayerSearch] = useState('');
    const [positionFilter, setPositionFilter] = useState('ALL');
    const [playerSort, setPlayerSort] = useState({ column: 'ppg', direction: 'desc' as 'asc' | 'desc' });
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

    // 1. Robust Data Processing (Inject Team Name/Logo)
    const allPlayers = useMemo(() => {
        return TEAMS.flatMap(team =>
            team.players.map(p => ({
                ...p,
                teamName: team.name, // Explicit injection to guarantee sort works
                teamLogo: team.logo || '/edg-logo.jpg',
                // Ensure numeric stats are numbers (data safety)
                ppg: Number(p.ppg),
                rpg: Number(p.rpg),
                apg: Number(p.apg),
                spg: Number(p.spg),
                bpg: Number(p.bpg),
                tov: Number(p.tov),
                fgPct: Number(p.fgPct),
                threePtPct: Number(p.threePtPct),
                ftPct: Number(p.ftPct),
                overall: p.attributes ? calculateOVR(p.attributes, p.pos) : p.overall
            }))
        );
    }, []);

    const sortPlayers = (column: string) => {
        setPlayerSort(prev => {
            const isNewColumn = prev.column !== column;

            // Default directions
            // String columns (Name, Team) -> ASC (A-Z) by default
            // Number columns (PPG, RPG) -> DESC (High-Low) by default
            let newDirection: 'asc' | 'desc' = (['name', 'teamName', 'pos'].includes(column)) ? 'asc' : 'desc';

            if (!isNewColumn) {
                // If same column, simple toggle
                newDirection = prev.direction === 'asc' ? 'desc' : 'asc';
            }

            return { column, direction: newDirection };
        });
    };

    const displayPlayers = useMemo(() => {
        const search = playerSearch.toLowerCase();

        return allPlayers
            .filter(p => {
                const matchesName = p.name.toLowerCase().includes(search) || p.teamName.toLowerCase().includes(search);
                const matchesPos = positionFilter === 'ALL' || p.pos === positionFilter;
                return matchesName && matchesPos;
            })
            .sort((a, b) => {
                const col = playerSort.column;
                const dir = playerSort.direction;

                // Get Values safely
                // @ts-ignore
                let valA = a[col];
                // @ts-ignore
                let valB = b[col];

                // 1. String Comparison (Case Insensitive)
                if (['name', 'teamName', 'pos'].includes(col)) {
                    valA = (valA || '').toString().toLowerCase();
                    valB = (valB || '').toString().toLowerCase();

                    if (valA < valB) return dir === 'asc' ? -1 : 1;
                    if (valA > valB) return dir === 'asc' ? 1 : -1;
                }
                // 2. Numeric Comparison
                else {
                    valA = Number(valA);
                    valB = Number(valB);

                    // Push NaNs to bottom
                    if (isNaN(valA)) return 1;
                    if (isNaN(valB)) return -1;

                    // Numeric Sort
                    if (valA < valB) return dir === 'asc' ? -1 : 1;
                    if (valA > valB) return dir === 'asc' ? 1 : -1;
                }

                // 3. TIE BREAKER (Always Alphabetical by Name)
                // This ensures "scrambling" never happens on equal values
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;

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
        <section className="min-h-screen bg-zinc-950 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            <PlayerProfileModal player={selectedPlayer} isOpen={!!selectedPlayer} onClose={() => setSelectedPlayer(null)} />

            <div className="container mx-auto px-5 py-12">

                {/* HEADER */}
                <div className="mb-12">
                    <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-2">
                        Command Center
                        <span className="text-primary text-xl md:text-2xl not-italic font-bold ml-4 tracking-normal align-middle bg-white/5 px-3 py-1 rounded">Player Statistics</span>
                    </h2>
                    <p className="text-zinc-500 font-bold uppercase tracking-widest">League-Wide Individual Performance</p>
                </div>

                {/* CONTROLS */}
                <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden mb-8">
                    <div className="p-4 border-b border-white/10 flex flex-col lg:flex-row justify-between items-center gap-4">

                        {/* SEARCH */}
                        <div className="relative group w-full lg:w-96">
                            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors" size={20} />
                            <input
                                type="text"
                                className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-mono"
                                placeholder="Search Player Name or Team..."
                                value={playerSearch}
                                onChange={(e) => setPlayerSearch(e.target.value)}
                            />
                        </div>

                        {/* POSITION FILTERS */}
                        <div className="flex gap-2 p-1 bg-black/40 rounded-lg overflow-x-auto max-w-full">
                            {['ALL', 'PG', 'SG', 'SF', 'PF', 'C'].map(pos => (
                                <button
                                    key={pos}
                                    onClick={() => setPositionFilter(pos)}
                                    className={`px-4 py-2 text-xs font-bold uppercase rounded-md transition-all whitespace-nowrap ${positionFilter === pos ? 'bg-primary text-black shadow-lg' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                                >
                                    {pos}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="px-4 py-2 bg-white/5 text-xs font-mono text-zinc-400 flex justify-between">
                        <span>SHOWING: <strong className="text-white">{displayPlayers.length}</strong> PLAYERS</span>
                        <span className="flex items-center gap-2"><Funnel /> FILTERING ENABLED</span>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
                    <div className="scrollable-table-container">
                        <table className="stats-table w-full text-sm">
                            <thead>
                                <tr className="bg-white/5">
                                    <th onClick={() => sortPlayers('name')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">PLAYER {getSortIcon('name')}</th>
                                    <th onClick={() => sortPlayers('teamName')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">TEAM {getSortIcon('teamName')}</th>
                                    <th onClick={() => sortPlayers('pos')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">POS {getSortIcon('pos')}</th>
                                    <th onClick={() => sortPlayers('overall')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left text-primary">OVR {getSortIcon('overall')}</th>

                                    <th onClick={() => sortPlayers('ppg')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">PTS {getSortIcon('ppg')}</th>
                                    <th onClick={() => sortPlayers('rpg')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">REB {getSortIcon('rpg')}</th>
                                    <th onClick={() => sortPlayers('apg')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">AST {getSortIcon('apg')}</th>
                                    <th onClick={() => sortPlayers('spg')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">STL {getSortIcon('spg')}</th>
                                    <th onClick={() => sortPlayers('bpg')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">BLK {getSortIcon('bpg')}</th>

                                    <th onClick={() => sortPlayers('fgPct')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">FG% {getSortIcon('fgPct')}</th>
                                    <th onClick={() => sortPlayers('threePtPct')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">3P% {getSortIcon('threePtPct')}</th>
                                    <th onClick={() => sortPlayers('ftPct')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">FT% {getSortIcon('ftPct')}</th>
                                    <th onClick={() => sortPlayers('tov')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left text-red-400">TOV {getSortIcon('tov')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {displayPlayers.map(p => (
                                    <tr key={`${p.teamName}-${p.id}`} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10">
                                                    <img src={p.avatar} alt={p.name} className="object-cover w-full h-full" />
                                                </div>
                                                <button onClick={() => setSelectedPlayer(p as unknown as Player)} className="font-bold text-left hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4">
                                                    {p.name}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-2 text-zinc-400">
                                                <div className="relative w-4 h-4 opacity-70">
                                                    <Image src={p.teamLogo} alt={p.teamName} fill className="object-contain" />
                                                </div>
                                                <span className="text-xs uppercase font-bold tracking-wider">{p.teamName.substring(0, 3)}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 font-mono text-zinc-400 font-bold">{p.pos}</td>
                                        <td className="p-3 font-mono font-black text-lg text-white">{p.overall}</td>

                                        <td className="p-3 font-mono font-bold text-primary">{p.ppg}</td>
                                        <td className="p-3 font-mono text-zinc-400">{p.rpg}</td>
                                        <td className="p-3 font-mono text-zinc-400">{p.apg}</td>
                                        <td className="p-3 font-mono text-zinc-400">{p.spg}</td>
                                        <td className="p-3 font-mono text-zinc-400">{p.bpg}</td>

                                        <td className="p-3 font-mono text-zinc-500">{p.fgPct}%</td>
                                        <td className="p-3 font-mono text-zinc-500">{p.threePtPct}%</td>
                                        <td className="p-3 font-mono text-zinc-500">{p.ftPct}%</td>
                                        <td className="p-3 font-mono text-red-400/70">{p.tov}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
