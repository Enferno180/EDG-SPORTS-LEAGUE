'use client';

import React, { useMemo } from 'react';
import { TEAMS } from '@/lib/data';

export default function StandingsPage() {
    const teamRecords = useMemo(() => {
        const records: { [key: string]: any } = {};
        TEAMS.forEach(team => {
            records[team.name] = { wins: team.wins, losses: team.losses, division: team.division };
        });
        return records;
    }, []);

    const teamStandings = useMemo(() => {
        if (Object.keys(teamRecords).length === 0) return [];
        const divisions = Array.from(new Set(TEAMS.map(t => t.division)));
        return divisions.map(divName => ({
            name: divName,
            teams: TEAMS.filter(team => team.division === divName)
                .map(team => ({ name: team.name, wins: team.wins, losses: team.losses }))
                .sort((a, b) => b.wins - a.wins)
        }));
    }, [teamRecords]);

    const getTeamLogo = (teamName: string) => TEAMS.find(t => t.name === teamName)?.logo;

    return (
        <section className="container mx-auto px-5 py-8 min-h-screen">
            <h2 className="section-title">
                STANDINGS{' '}
                <span className="section-title-tag">WEEK 30 (LIVE)</span>
            </h2>
            <p className="tab-description mb-8">THE FATAL FOUR RULE: ONLY THE #1 SEED SURVIVES.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamStandings.map(division => (
                    <div key={division.name} className="division-card">
                        <h3 className="division-title">{division.name}</h3>
                        <table className="w-full">
                            <thead><tr><th className="th-cell">TEAM</th><th className="th-cell">W</th><th className="th-cell">L</th></tr></thead>
                            <tbody>
                                {division.teams.map((team, index) => (
                                    <tr key={team.name} className={`table-row ${index === 0 ? 'rank-1' : 'eliminated'}`}>
                                        <td className="team-cell">
                                            {getTeamLogo(team.name) && <img src={getTeamLogo(team.name) || ''} className="team-logo-small" alt={`${team.name} logo`} />}
                                            {team.name}
                                        </td>
                                        <td className="td-cell">{team.wins}</td>
                                        <td className="td-cell">{team.losses}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </section>
    );
}
