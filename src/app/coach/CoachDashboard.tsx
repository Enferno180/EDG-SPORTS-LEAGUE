'use client';

import React, { useState } from 'react';
import { markAttendance, addScoutingNote } from './actions';

interface Player {
    id: string;
    name: string | null;
    number: number | null;
    position: string | null;
}

interface Team {
    id: string;
    name: string;
    players: Player[];
}

export default function CoachDashboard({ teams }: { teams: Team[] }) {
    const [selectedTeamId, setSelectedTeamId] = useState<string>(teams[0]?.id || '');
    const [noteContent, setNoteContent] = useState<Record<string, string>>({}); // valid for each player
    const [message, setMessage] = useState<string | null>(null);

    const activeTeam = teams.find(t => t.id === selectedTeamId);

    const handleAttendance = async (playerId: string, status: 'ON_TIME' | 'LATE' | 'NO_SHOW') => {
        const res = await markAttendance(playerId, status);
        if (res.error) {
            setMessage(`Error: ${res.error}`);
        } else {
            setMessage(`Marked ${status} for player.`);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const handleAddNote = async (playerId: string) => {
        const content = noteContent[playerId];
        if (!content) return;

        const res = await addScoutingNote(playerId, content);
        if (res.error) {
            setMessage(`Error: ${res.error}`);
        } else {
            setMessage('Note added successfully.');
            setNoteContent(prev => ({ ...prev, [playerId]: '' }));
            setTimeout(() => setMessage(null), 3000);
        }
    };

    return (
        <div className="space-y-8">
            {/* Team Selector */}
            <div className="flex gap-4 items-center bg-card p-4 rounded-lg border border-white/10">
                <label className="text-muted-foreground">Select Team:</label>
                <select
                    className="bg-black/50 border border-white/20 p-2 rounded text-white"
                    value={selectedTeamId}
                    onChange={(e) => setSelectedTeamId(e.target.value)}
                >
                    {teams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
            </div>

            {message && (
                <div className="p-4 bg-primary/20 border border-primary text-primary rounded-lg animate-pulse">
                    {message}
                </div>
            )}

            {/* Roster List */}
            {activeTeam ? (
                <div className="grid gap-4">
                    {activeTeam.players.map(player => (
                        <div key={player.id} className="bg-card border border-white/10 p-6 rounded-lg flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">

                            {/* Player Info */}
                            <div className="flex items-center gap-4 min-w-[200px]">
                                <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-xl">
                                    {player.number || '#'}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{player.name}</h3>
                                    <p className="text-sm text-muted-foreground">{player.position || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Actions Group */}
                            <div className="flex flex-col gap-4 w-full md:w-auto">

                                {/* Attendance */}
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Attendance</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAttendance(player.id, 'ON_TIME')}
                                            className="px-3 py-1 bg-green-900/40 text-green-400 border border-green-900/50 rounded hover:bg-green-900/60 text-sm"
                                        >
                                            On Time
                                        </button>
                                        <button
                                            onClick={() => handleAttendance(player.id, 'LATE')}
                                            className="px-3 py-1 bg-yellow-900/40 text-yellow-400 border border-yellow-900/50 rounded hover:bg-yellow-900/60 text-sm"
                                        >
                                            Late
                                        </button>
                                        <button
                                            onClick={() => handleAttendance(player.id, 'NO_SHOW')}
                                            className="px-3 py-1 bg-red-900/40 text-red-400 border border-red-900/50 rounded hover:bg-red-900/60 text-sm"
                                        >
                                            No Show
                                        </button>
                                    </div>
                                </div>

                                {/* Scouting Note */}
                                <div className="flex flex-col gap-1 w-full md:w-[400px]">
                                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Scouting Notes</span>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Add note..."
                                            className="flex-1 bg-black/30 border border-white/10 rounded px-3 py-1 text-sm focus:border-primary outline-none"
                                            value={noteContent[player.id] || ''}
                                            onChange={(e) => setNoteContent(prev => ({ ...prev, [player.id]: e.target.value }))}
                                            onKeyDown={(e) => e.key === 'Enter' && handleAddNote(player.id)}
                                        />
                                        <button
                                            onClick={() => handleAddNote(player.id)}
                                            className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-sm transition-colors"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground p-8 text-center bg-card rounded-lg">No team selected.</p>
            )}
        </div>
    );
}
