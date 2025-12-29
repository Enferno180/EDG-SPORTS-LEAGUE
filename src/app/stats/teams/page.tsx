'use client';

import React, { useState, useMemo } from 'react';
import { TEAMS } from '@/lib/data';

import { CaretUp, CaretDown, CaretUpDown } from '@phosphor-icons/react';

export default function TeamStatsPage() {
    const [teamSort, setTeamSort] = useState({ column: 'wins', direction: 'desc' as 'asc' | 'desc' });

    const teamStats = useMemo(() => {
        return TEAMS.map(team => {
            const teamPlayers = team.players;
            if (teamPlayers.length === 0) {
                return { name: team.name, ppg: '0.0', oppPpg: '0.0', diff: '0.0', streak: 'L0', abbreviation: team.name.substring(0, 3).toUpperCase(), color: team.colors.primary };
            }
            // Fix: Sum of player PPGs, not average
            const ppg = teamPlayers.reduce((acc, p) => acc + p.ppg, 0);

            // Fix: Synthetic OppPPG calculation. 
            // Assumption: Point Diff = (Wins - Losses) * 0.5 (conservative estimate)
            // PPG - OppPPG = Diff  =>  OppPPG = PPG - Diff
            const pointDiff = (team.wins - team.losses) * 0.5;
            const oppPpg = ppg - pointDiff;

            const streak = `${team.wins > team.losses ? 'W' : 'L'}${Math.abs(team.wins - team.losses) % 4 + 1}`;

            // Generate initials for fallback
            const initials = team.name.split(' ').map(n => n[0]).join('').substring(0, 2);

            return {
                name: team.name,
                wins: team.wins,
                losses: team.losses,
                ppg: ppg.toFixed(1),
                oppPpg: oppPpg.toFixed(1),
                diff: pointDiff.toFixed(1),
                streak: streak,
                initials: initials,
                color: team.colors.primary
            };
        }).sort((a, b) => {
            const field = teamSort.column;
            // Handle numeric sort specifically
            if (['wins', 'ppg', 'oppPpg', 'diff'].includes(field)) {
                const valA = parseFloat(String(a[field as keyof typeof a]));
                const valB = parseFloat(String(b[field as keyof typeof b]));
                return teamSort.direction === 'asc' ? valA - valB : valB - valA;
            }

            const valA = a[field as keyof typeof a] ?? 0;
            const valB = b[field as keyof typeof b] ?? 0;

            if (valA < valB) return teamSort.direction === 'asc' ? -1 : 1;
            if (valA > valB) return teamSort.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [teamSort]);

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
        <section className="container mx-auto px-5 py-8 min-h-screen">
            <h2 className="section-title mb-6">TEAM STATISTICS</h2>

            <div className="scrollable-table-container">
                <table className="stats-table">
                    <thead>
                        <tr>
                            <th onClick={() => sortTeams('name')} className="th-cell sortable cursor-pointer hover:text-white">TEAM {getSortIcon('name')}</th>
                            <th onClick={() => sortTeams('wins')} className="th-cell sortable cursor-pointer hover:text-white">W-L {getSortIcon('wins')}</th>
                            <th onClick={() => sortTeams('ppg')} className="th-cell sortable cursor-pointer hover:text-white">PTS/G {getSortIcon('ppg')}</th>
                            <th onClick={() => sortTeams('oppPpg')} className="th-cell sortable cursor-pointer hover:text-white">OPP PTS/G {getSortIcon('oppPpg')}</th>
                            <th onClick={() => sortTeams('diff')} className="th-cell sortable cursor-pointer hover:text-white">DIFF {getSortIcon('diff')}</th>
                            <th onClick={() => sortTeams('streak')} className="th-cell sortable cursor-pointer hover:text-white">STREAK {getSortIcon('streak')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamStats.map(t => (
                            <tr key={t.name} className="table-row">
                                <td className="team-cell">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border border-white/20"
                                        style={{ backgroundColor: t.color, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                                    >
                                        {t.initials}
                                    </div>
                                    {t.name}
                                </td>
                                <td className="td-cell font-mono">{t.wins}-{t.losses}</td>
                                <td className="td-cell">{t.ppg}</td>
                                <td className="td-cell">{t.oppPpg}</td>
                                <td className={`td-cell ${parseFloat(t.diff) > 0 ? 'text-green-400' : 'text-red-400'}`}>{parseFloat(t.diff) > 0 ? '+' : ''}{t.diff}</td>
                                <td className="td-cell">{t.streak}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
