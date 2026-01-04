'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { TEAMS } from '@/lib/data';
import { CaretUp, CaretDown, CaretUpDown, Trophy, Fire, ShieldCheck, TrendUp } from '@phosphor-icons/react';

export const dynamic = 'force-dynamic';

export default function TeamStatsPage() {
    const [teamSort, setTeamSort] = useState({ column: 'wins', direction: 'desc' as 'asc' | 'desc' });
    const [filterDivision, setFilterDivision] = useState('ALL');

    // 1. Process Base Stats
    const allTeamStats = useMemo(() => {
        return TEAMS.map(team => {
            const teamPlayers = team.players;

            // Fallbacks for empty teams
            if (teamPlayers.length === 0) {
                return {
                    name: team.name,
                    wins: team.wins,
                    losses: team.losses,
                    division: team.division,
                    ppg: 0,
                    oppPpg: 0,
                    diff: 0,
                    streak: 'L0',
                    streakValue: -1,
                    abbreviation: team.name.substring(0, 3).toUpperCase(),
                    color: team.colors.primary,
                    logo: team.logo || '/edg-logo.jpg',
                    apg: 0, rpg: 0, spg: 0, bpg: 0, tov: 0,
                    fgPct: 0, threePtPct: 0, ftPct: 0
                };
            }

            // Calculations
            const ppg = teamPlayers.reduce((acc, p) => acc + p.ppg, 0);
            const apg = teamPlayers.reduce((acc, p) => acc + p.apg, 0);
            const rpg = teamPlayers.reduce((acc, p) => acc + p.rpg, 0);
            const spg = teamPlayers.reduce((acc, p) => acc + p.spg, 0);
            const bpg = teamPlayers.reduce((acc, p) => acc + p.bpg, 0);
            const tov = teamPlayers.reduce((acc, p) => acc + p.tov, 0);

            // Averages for Percentages (All players included)
            const fgPct = teamPlayers.reduce((acc, p) => acc + p.fgPct, 0) / (teamPlayers.length || 1);
            const threePtPct = teamPlayers.reduce((acc, p) => acc + p.threePtPct, 0) / (teamPlayers.length || 1);
            const ftPct = teamPlayers.reduce((acc, p) => acc + p.ftPct, 0) / (teamPlayers.length || 1);


            const pointDiff = (team.wins - team.losses) * 0.5; // Estimated Diff
            const oppPpg = ppg - pointDiff;

            // Streak Calculation
            const isWinStreak = team.wins > team.losses;
            const streakCount = (Math.abs(team.wins - team.losses) % 5) + 1;
            const streakLabel = `${isWinStreak ? 'W' : 'L'}${streakCount}`;
            const streakValue = isWinStreak ? streakCount : -streakCount;

            const initials = team.name.split(' ').map(n => n[0]).join('').substring(0, 2);

            return {
                name: team.name,
                wins: team.wins,
                losses: team.losses,
                division: team.division,
                ppg: parseFloat(ppg.toFixed(1)),
                oppPpg: parseFloat(oppPpg.toFixed(1)),
                diff: parseFloat(pointDiff.toFixed(1)),
                streak: streakLabel,
                streakValue: streakValue,
                initials: initials,
                color: team.colors.primary,
                logo: team.logo || '/edg-logo.jpg',
                apg: parseFloat(apg.toFixed(1)),
                rpg: parseFloat(rpg.toFixed(1)),
                spg: parseFloat(spg.toFixed(1)),
                bpg: parseFloat(bpg.toFixed(1)),
                tov: parseFloat(tov.toFixed(1)),
                fgPct: parseFloat(fgPct.toFixed(1)),
                threePtPct: parseFloat(threePtPct.toFixed(1)),
                ftPct: parseFloat(ftPct.toFixed(1))
            };
        });
    }, []);

    // 2. Identify League Leaders (Hero Cards)
    const leaders = useMemo(() => {
        const sortedByWins = [...allTeamStats].sort((a, b) => b.wins - a.wins);
        const sortedByOffense = [...allTeamStats].sort((a, b) => b.ppg - a.ppg);
        const sortedByDefense = [...allTeamStats].sort((a, b) => a.oppPpg - b.oppPpg); // Lower is better
        const sortedByStreak = [...allTeamStats].sort((a, b) => b.streakValue - a.streakValue);

        return {
            alpha: sortedByWins[0],
            offense: sortedByOffense[0],
            defense: sortedByDefense[0],
            hot: sortedByStreak[0]
        };
    }, [allTeamStats]);


    // 3. Filter and Sort for Table
    const displayTeams = useMemo(() => {
        let data = [...allTeamStats];

        // Filter
        if (filterDivision !== 'ALL') {
            data = data.filter(t => t.division.includes(filterDivision));
        }

        // Sort
        return data.sort((a, b) => {
            const field = teamSort.column;

            if (field === 'streak') {
                return teamSort.direction === 'asc'
                    ? a.streakValue - b.streakValue
                    : b.streakValue - a.streakValue;
            }

            // Numeric Sort
            if (['wins', 'ppg', 'oppPpg', 'diff', 'apg', 'rpg', 'spg', 'bpg', 'tov', 'fgPct', 'threePtPct', 'ftPct'].includes(field)) {
                // @ts-ignore
                const valA = a[field]; const valB = b[field];
                return teamSort.direction === 'asc' ? valA - valB : valB - valA;
            }

            // String Sort
            // @ts-ignore
            const valA = a[field] ?? ''; const valB = b[field] ?? '';
            if (valA < valB) return teamSort.direction === 'asc' ? -1 : 1;
            if (valA > valB) return teamSort.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [allTeamStats, filterDivision, teamSort]);

    const sortTeams = (column: string) => {
        setTeamSort(currentSort => {
            if (currentSort.column === column) {
                return { ...currentSort, direction: currentSort.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { column, direction: (['name', 'streak'].includes(column) ? 'asc' : 'desc') as 'asc' | 'desc' };
        });
    };

    const getSortIcon = (column: string) => {
        if (teamSort.column !== column) return <CaretUpDown className="opacity-20 ml-1 inline-block" size={16} />;
        return teamSort.direction === 'asc'
            ? <CaretUp className="text-white ml-1 inline-block" size={16} weight="fill" />
            : <CaretDown className="text-white ml-1 inline-block" size={16} weight="fill" />;
    };

    return (
        <section className="min-h-screen bg-zinc-950 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            <div className="container mx-auto px-5 py-12">

                {/* HEADER */}
                <div className="mb-12">
                    <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-2">
                        Command Center
                        <span className="text-primary text-xl md:text-2xl not-italic font-bold ml-4 tracking-normal align-middle bg-white/5 px-3 py-1 rounded">Team Statistics</span>
                    </h2>
                    <p className="text-zinc-500 font-bold uppercase tracking-widest">Live Analytics & Performance Metrics</p>
                </div>

                {/* HERO STAT CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {/* CARD 1: THE ALPHA */}
                    <div className="bg-zinc-900/80 border border-white/10 p-6 rounded-xl relative overflow-hidden group hover:border-primary/50 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Trophy size={80} weight="fill" className="text-yellow-500" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4 text-yellow-500 font-bold uppercase tracking-wider text-xs">
                                <Trophy size={16} weight="fill" /> League Leader
                            </div>
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-12 relative">
                                    <Image src={leaders.alpha.logo} alt={leaders.alpha.name} fill className="object-contain" />
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-white leading-none">{leaders.alpha.wins}-{leaders.alpha.losses}</div>
                                    <div className="text-[10px] text-zinc-400 font-bold uppercase">{leaders.alpha.name}</div>
                                </div>
                            </div>
                            <div className="h-1 w-full bg-white/10 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-yellow-500 w-3/4"></div>
                            </div>
                        </div>
                    </div>

                    {/* CARD 2: OFFENSE */}
                    <div className="bg-zinc-900/80 border border-white/10 p-6 rounded-xl relative overflow-hidden group hover:border-primary/50 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Fire size={80} weight="fill" className="text-orange-500" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4 text-orange-500 font-bold uppercase tracking-wider text-xs">
                                <Fire size={16} weight="fill" /> Scoring Machine
                            </div>
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-12 relative">
                                    <Image src={leaders.offense.logo} alt={leaders.offense.name} fill className="object-contain" />
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-white leading-none">{leaders.offense.ppg} <span className="text-xs text-zinc-500">PPG</span></div>
                                    <div className="text-[10px] text-zinc-400 font-bold uppercase">{leaders.offense.name}</div>
                                </div>
                            </div>
                            <div className="h-1 w-full bg-white/10 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-orange-500 w-[90%]"></div>
                            </div>
                        </div>
                    </div>

                    {/* CARD 3: DEFENSE */}
                    <div className="bg-zinc-900/80 border border-white/10 p-6 rounded-xl relative overflow-hidden group hover:border-primary/50 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ShieldCheck size={80} weight="fill" className="text-blue-500" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4 text-blue-500 font-bold uppercase tracking-wider text-xs">
                                <ShieldCheck size={16} weight="fill" /> Iron Shield
                            </div>
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-12 relative">
                                    <Image src={leaders.defense.logo} alt={leaders.defense.name} fill className="object-contain" />
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-white leading-none">{leaders.defense.oppPpg} <span className="text-xs text-zinc-500">OPP PPG</span></div>
                                    <div className="text-[10px] text-zinc-400 font-bold uppercase">{leaders.defense.name}</div>
                                </div>
                            </div>
                            <div className="h-1 w-full bg-white/10 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-blue-500 w-[85%]"></div>
                            </div>
                        </div>
                    </div>

                    {/* CARD 4: HEAT CHECK */}
                    <div className="bg-zinc-900/80 border border-white/10 p-6 rounded-xl relative overflow-hidden group hover:border-primary/50 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendUp size={80} weight="fill" className="text-green-500" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4 text-green-500 font-bold uppercase tracking-wider text-xs">
                                <TrendUp size={16} weight="fill" /> Heat Check
                            </div>
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-12 relative">
                                    <Image src={leaders.hot.logo} alt={leaders.hot.name} fill className="object-contain" />
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-white leading-none">{leaders.hot.streak} <span className="text-xs text-zinc-500">STREAK</span></div>
                                    <div className="text-[10px] text-zinc-400 font-bold uppercase">{leaders.hot.name}</div>
                                </div>
                            </div>
                            <div className="h-1 w-full bg-white/10 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-green-500 w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* FILTER & TABLE SECTION */}
                <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">

                    {/* CONTROLS */}
                    <div className="p-4 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex gap-2 p-1 bg-black/40 rounded-lg">
                            {['ALL', 'NORTH', 'SOUTH', 'EAST', 'WEST'].map(div => (
                                <button
                                    key={div}
                                    onClick={() => setFilterDivision(div)}
                                    className={`px-4 py-2 text-xs font-bold uppercase rounded-md transition-all ${filterDivision === div ? 'bg-primary text-black shadow-lg' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                                >
                                    {div}
                                </button>
                            ))}
                        </div>
                        <div className="text-xs font-mono text-zinc-500">
                            SHOWING: <span className="text-white font-bold">{displayTeams.length} TEAMS</span>
                        </div>
                    </div>

                    <div className="scrollable-table-container">
                        <table className="stats-table w-full text-sm">
                            <thead>
                                <tr className="bg-white/5">
                                    <th onClick={() => sortTeams('name')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">TEAM {getSortIcon('name')}</th>
                                    <th onClick={() => sortTeams('wins')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">W-L {getSortIcon('wins')}</th>
                                    <th onClick={() => sortTeams('ppg')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left text-primary">PTS {getSortIcon('ppg')}</th>
                                    <th onClick={() => sortTeams('rpg')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">REB {getSortIcon('rpg')}</th>
                                    <th onClick={() => sortTeams('apg')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">AST {getSortIcon('apg')}</th>
                                    <th onClick={() => sortTeams('spg')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">STL {getSortIcon('spg')}</th>
                                    <th onClick={() => sortTeams('bpg')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">BLK {getSortIcon('bpg')}</th>
                                    <th onClick={() => sortTeams('tov')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">TOV {getSortIcon('tov')}</th>
                                    <th onClick={() => sortTeams('fgPct')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">FG% {getSortIcon('fgPct')}</th>
                                    <th onClick={() => sortTeams('threePtPct')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">3P% {getSortIcon('threePtPct')}</th>
                                    <th onClick={() => sortTeams('ftPct')} className="th-cell sortable cursor-pointer hover:text-white p-3 text-left">FT% {getSortIcon('ftPct')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {displayTeams.map(t => (
                                    <tr key={t.name} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-3 flex items-center gap-3">
                                            <div className="relative w-8 h-8 flex-shrink-0 bg-black/40 rounded-full p-1 border border-white/10 overflow-hidden group-hover:border-primary/50 transition-colors">
                                                <Image
                                                    src={t.logo}
                                                    alt={t.name}
                                                    fill
                                                    className="object-contain p-0.5"
                                                />
                                            </div>
                                            <div className="font-bold">{t.name}</div>
                                        </td>
                                        <td className="p-3 font-mono text-zinc-300">{t.wins}-{t.losses}</td>
                                        <td className="p-3 font-mono font-bold text-primary">{t.ppg}</td>
                                        <td className="p-3 font-mono text-zinc-400">{t.rpg}</td>
                                        <td className="p-3 font-mono text-zinc-400">{t.apg}</td>
                                        <td className="p-3 font-mono text-zinc-400">{t.spg}</td>
                                        <td className="p-3 font-mono text-zinc-400">{t.bpg}</td>
                                        <td className="p-3 font-mono text-zinc-400">{t.tov}</td>
                                        <td className="p-3 font-mono text-zinc-400">{t.fgPct}%</td>
                                        <td className="p-3 font-mono text-zinc-400">{t.threePtPct}%</td>
                                        <td className="p-3 font-mono text-zinc-400">{t.ftPct}%</td>
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
