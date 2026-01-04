'use client';

import { useState, useEffect } from 'react';
import { Player, Team } from '@prisma/client';
import { processGameUpload } from '../games/actions';

type GameStatus = 'SETUP' | 'ACTIVE' | 'FINISHED';

interface ScorekeeperProps {
    teams: (Team & { players: Player[] })[];
}

export default function ScorekeeperInterface({ teams }: ScorekeeperProps) {
    const [status, setStatus] = useState<GameStatus>('SETUP');
    const [homeTeamId, setHomeTeamId] = useState<string>('');
    const [awayTeamId, setAwayTeamId] = useState<string>('');

    // Game State
    const [homeScore, setHomeScore] = useState(0);
    const [awayScore, setAwayScore] = useState(0);
    const [gameLog, setGameLog] = useState<string[]>([]);

    // Stats & Subs
    // We track "pending stats" to upload at the end
    const [playerStats, setPlayerStats] = useState<Record<string, any>>({});
    const [activePlayers, setActivePlayers] = useState<Set<string>>(new Set());
    const [shiftStarts, setShiftStarts] = useState<Record<string, number>>({});

    const homeTeam = teams.find(t => t.id === homeTeamId);
    const awayTeam = teams.find(t => t.id === awayTeamId);

    const handleStartGame = () => {
        if (!homeTeam || !awayTeam) return alert("Select both teams");
        if (homeTeam.id === awayTeam.id) return alert("Teams must be different");
        setStatus('ACTIVE');
        setGameLog(prev => [`Game Started: ${homeTeam.name} vs ${awayTeam.name}`, ...prev]);
    };

    const handleStat = (playerId: string, stat: string, value: number, playerName: string) => {
        // Init player stats if not exists
        if (!playerStats[playerId]) {
            playerStats[playerId] = {
                playerName,
                points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, turnovers: 0,
                fgm: 0, fga: 0, threePtm: 0, threePta: 0, ftm: 0, fta: 0
            };
        }

        const current = playerStats[playerId];

        // Update specific stat
        // Logic for specialized stats
        if (stat === 'PTS') current.points += value;
        if (stat === 'REB') current.rebounds += 1;
        if (stat === 'AST') current.assists += 1;
        if (stat === 'STL') current.steals += 1;
        if (stat === 'BLK') current.blocks += 1;
        if (stat === 'TOV') current.turnovers += 1;

        // Shooting logic
        if (stat === 'FGM') { current.fgm += 1; current.fga += 1; current.points += 2; }
        if (stat === 'FGA') { current.fga += 1; }
        if (stat === '3PM') { current.threePtm += 1; current.threePta += 1; current.points += 3; current.fgm += 1; current.fga += 1; }
        if (stat === '3PA') { current.threePta += 1; current.fga += 1; }
        if (stat === 'FTM') { current.ftm += 1; current.fta += 1; current.points += 1; }
        if (stat === 'FTA') { current.fta += 1; }

        setPlayerStats({ ...playerStats }); // Trigger re-render

        // Update Scoreboard if points
        const playerTeam = homeTeam?.players.find(p => p.id === playerId) ? 'HOME' : 'AWAY';
        if (stat === 'PTS' || stat === 'FGM' || stat === '3PM' || stat === 'FTM') {
            if (playerTeam === 'HOME') setHomeScore(s => s + value);
            else setAwayScore(s => s + value);
        }

        setGameLog(prev => [`${playerName}: +${value} ${stat}`, ...prev]);
    };

    const toggleSub = (playerId: string) => {
        const now = Date.now();
        const newActive = new Set(activePlayers);

        if (newActive.has(playerId)) {
            // Subbing OUT
            newActive.delete(playerId);
            const start = shiftStarts[playerId];
            if (start) {
                const durationSec = (now - start) / 1000;
                // Add to total minutes (todo)
            }
        } else {
            // Subbing IN
            newActive.add(playerId);
            setShiftStarts(prev => ({ ...prev, [playerId]: now }));
        }
        setActivePlayers(newActive);
    };

    const handleEndGame = async () => {
        if (!confirm("End Game and Upload Stats?")) return;

        const payload = Object.values(playerStats);
        // Note: In a real app we'd map our internal stats object to the exact JSON format expected by the action
        // For now, let's assume specific keys match or we map them.

        const result = await processGameUpload(JSON.stringify(payload));
        if (result.success) {
            alert("Game Saved!");
            setStatus('FINISHED');
        } else {
            alert("Error saving game: " + result.message);
        }
    };

    if (status === 'SETUP') {
        return (
            <div className="p-6 max-w-md mx-auto bg-[#1a1a1a] text-white rounded-xl">
                <h1 className="text-2xl font-bold mb-6 font-display">New Game Setup</h1>

                <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">Home Team</label>
                    <select
                        className="w-full p-3 bg-[#2a2a2a] rounded border border-white/10"
                        onChange={(e) => setHomeTeamId(e.target.value)}
                        value={homeTeamId}
                    >
                        <option value="">Select Team</option>
                        {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                </div>

                <div className="mb-8">
                    <label className="block text-sm text-gray-400 mb-2">Away Team</label>
                    <select
                        className="w-full p-3 bg-[#2a2a2a] rounded border border-white/10"
                        onChange={(e) => setAwayTeamId(e.target.value)}
                        value={awayTeamId}
                    >
                        <option value="">Select Team</option>
                        {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                </div>

                <button
                    onClick={handleStartGame}
                    className="w-full py-4 bg-brand-primary text-black font-bold uppercase tracking-wider rounded-lg hover:bg-white transition"
                >
                    Start Tip-Off
                </button>
            </div>
        );
    }

    return (
        <div className="h-screen bg-black text-white flex flex-col">
            {/* Scoreboard Header */}
            <div className="flex justify-between items-center p-4 bg-[#111] border-b border-white/10 sticky top-0 z-50">
                <div className="text-center">
                    <div className="text-xs text-gray-400 uppercase tracking-widest">{homeTeam?.name}</div>
                    <div className="text-4xl font-mono font-bold text-white">{homeScore}</div>
                </div>
                <div className="text-xl font-bold text-gray-500">VS</div>
                <div className="text-center">
                    <div className="text-xs text-gray-400 uppercase tracking-widest">{awayTeam?.name}</div>
                    <div className="text-4xl font-mono font-bold text-white">{awayScore}</div>
                </div>
                <button onClick={handleEndGame} className="px-4 py-2 bg-red-600 text-xs font-bold rounded uppercase">
                    End Game
                </button>
            </div>

            {/* Main Controls */}
            <div className="flex-1 overflow-y-auto p-4 space-y-8">
                {/* Home Roster */}
                <TeamControls team={homeTeam!} activePlayers={activePlayers} onStat={handleStat} onSub={toggleSub} stats={playerStats} />
                <div className="h-px bg-white/10" />
                {/* Away Roster */}
                <TeamControls team={awayTeam!} activePlayers={activePlayers} onStat={handleStat} onSub={toggleSub} stats={playerStats} />
            </div>

            {/* Log */}
            <div className="h-32 bg-[#0a0a0a] border-t border-white/10 p-2 overflow-y-auto font-mono text-xs text-gray-400">
                {gameLog.map((l, i) => <div key={i}>{l}</div>)}
            </div>
        </div>
    );
}

function TeamControls({ team, activePlayers, onStat, onSub, stats }: {
    team: Team & { players: Player[] },
    activePlayers: Set<string>,
    onStat: (id: string, stat: string, val: number, name: string) => void,
    onSub: (id: string) => void,
    stats: Record<string, any>
}) {
    return (
        <div>
            <h3 className="text-brand-primary font-bold mb-4 uppercase">{team.name}</h3>
            <div className="grid grid-cols-1 gap-2">
                {team.players.map(player => {
                    const isActive = activePlayers.has(player.id);
                    const pStats = stats[player.id];
                    return (
                        <div key={player.id} className={`p-3 rounded-lg border ${isActive ? 'bg-[#222] border-brand-primary/50' : 'bg-[#111] border-transparent opacity-60'} transition-all`}>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-sm">{player.name} <span className="text-gray-500 text-xs">#{player.number}</span></span>
                                <span className="text-xs font-mono text-yellow-400">{pStats?.points || 0} PTS</span>
                            </div>

                            {/* Stat Buttons */}
                            <div className="grid grid-cols-6 gap-1 mb-2">
                                <Btn onClick={() => onStat(player.id, 'FGM', 2, player.name)}>2PT</Btn>
                                <Btn onClick={() => onStat(player.id, '3PM', 3, player.name)}>3PT</Btn>
                                <Btn onClick={() => onStat(player.id, 'FTM', 1, player.name)}>1PT</Btn>
                                <Btn onClick={() => onStat(player.id, 'REB', 0, player.name)}>REB</Btn>
                                <Btn onClick={() => onStat(player.id, 'AST', 0, player.name)}>AST</Btn>
                                <Btn onClick={() => onStat(player.id, 'STL', 0, player.name)}>STL</Btn>
                            </div>
                            <div className="grid grid-cols-3 gap-1">
                                <button onClick={() => onSub(player.id)} className={`py-1 text-[10px] font-bold uppercase rounded border ${isActive ? 'bg-red-900/30 text-red-500 border-red-500/30' : 'bg-green-900/30 text-green-500 border-green-500/30'}`}>
                                    {isActive ? 'Sub Out' : 'Check In'}
                                </button>
                                <Btn onClick={() => onStat(player.id, 'FGA', 0, player.name)} className="text-gray-500 border-gray-700">Miss 2</Btn>
                                <Btn onClick={() => onStat(player.id, '3PA', 0, player.name)} className="text-gray-500 border-gray-700">Miss 3</Btn>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Btn({ children, onClick, className }: any) {
    return (
        <button
            onClick={onClick}
            className={`py-2 text-[10px] font-bold uppercase bg-[#333] hover:bg-[#444] rounded border border-white/5 active:scale-95 transition ${className}`}
        >
            {children}
        </button>
    )
}
