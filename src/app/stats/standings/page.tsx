import React from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function StandingsPage() {
    // Fetch all teams from the database
    const teams = await prisma.team.findMany({
        orderBy: { wins: 'desc' }
    });

    // Group teams by division
    const divisions: { [key: string]: typeof teams } = {};
    teams.forEach(team => {
        const div = team.division || 'Unknown Division';
        if (!divisions[div]) {
            divisions[div] = [];
        }
        divisions[div].push(team);
    });

    // Sort divisions mostly to ensure consistent order (North, South, East, West or similar)
    // For now we just sort keys
    const sortedDivisionNames = Object.keys(divisions).sort();

    return (
        <section className="container mx-auto px-5 py-8 min-h-screen">
            <h2 className="section-title">
                STANDINGS{' '}
                <span className="section-title-tag">LIVE FROM DB</span>
            </h2>
            <p className="tab-description mb-8">THE FATAL FOUR RULE: ONLY THE #1 SEED SURVIVES.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sortedDivisionNames.map(divName => {
                    const divTeams = divisions[divName]
                        .sort((a, b) => b.wins - a.wins); // Sort by wins descending

                    return (
                        <div key={divName} className="division-card">
                            <h3 className="division-title">{divName}</h3>
                            <div className="scrollable-table-container">
                                <table className="w-full">
                                    <thead><tr><th className="th-cell">TEAM</th><th className="th-cell">W</th><th className="th-cell">L</th></tr></thead>
                                    <tbody>
                                        {divTeams.map((team, index) => (
                                            <tr key={team.id} className={`table-row ${index === 0 ? 'rank-1' : 'eliminated'}`}>
                                                <td className="team-cell">
                                                    <a href={`/teams/${team.slug}`} className="flex items-center gap-2 hover:text-white transition-colors">
                                                        {team.logo && <img src={team.logo} className="team-logo-small bg-white rounded-full p-0.5" alt={`${team.name} logo`} />}
                                                        {team.name}
                                                    </a>
                                                </td>
                                                <td className="td-cell">{team.wins}</td>
                                                <td className="td-cell">{team.losses}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

