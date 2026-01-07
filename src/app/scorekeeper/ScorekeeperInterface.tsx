'use client';

import { useState } from 'react';
import { Player, Team } from '@prisma/client';
import { createGame, finalizeGame } from './actions';

type GameStatus = 'SETUP' | 'ACTIVE' | 'FINISHED';
type Period = 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'OT1' | 'OT2';

interface ScorekeeperProps {
    teams: (Team & { players: Player[] })[];
}

export default function ScorekeeperInterface({ teams }: ScorekeeperProps) {
    const [status, setStatus] = useState<GameStatus>('SETUP');
    const [homeTeamId, setHomeTeamId] = useState<string>('');
    const [awayTeamId, setAwayTeamId] = useState<string>('');

    // GAME RULES
    const [rules, setRules] = useState({
        quarters: 4,
        minutesPerQuarter: 10,  // Updated default to 10 minutes
        minutesPerOt: 5,        // Added OT duration
        maxOt: 2                // Added Max OT
    });

    const [gameId, setGameId] = useState<string | null>(null);

    // Game State
    const [currentPeriod, setCurrentPeriod] = useState<Period>('Q1');
    const [homeScore, setHomeScore] = useState(0);
    const [awayScore, setAwayScore] = useState(0);
    const [gameLog, setGameLog] = useState<string[]>([]);
    const [isPeriodOver, setIsPeriodOver] = useState(false);

    // Stats
    const [playerStats, setPlayerStats] = useState<Record<string, any>>({});
    const [activePlayers, setActivePlayers] = useState<Set<string>>(new Set());

    const homeTeam = teams.find(t => t.id === homeTeamId);
    const awayTeam = teams.find(t => t.id === awayTeamId);

    const handleStartGame = async () => {
        if (!homeTeam || !awayTeam) return alert("Select both teams");
        if (homeTeam.id === awayTeam.id) return alert("Teams must be different");

        const res = await createGame({
            homeTeamId,
            awayTeamId,
            quarters: rules.quarters,
            minutesPerQuarter: rules.minutesPerQuarter
        });

        if (res.error) {
            alert(res.error);
            return;
        }

        setGameId(res.gameId!);
        setStatus('ACTIVE');
        setCurrentPeriod('Q1');
        setIsPeriodOver(false);
        setGameLog(prev => [`Game Started: ${homeTeam.name} vs ${awayTeam.name}. Format: ${rules.quarters} Qtrs @ ${rules.minutesPerQuarter} min`, ...prev]);
    };

    const handleNextPeriod = () => {
        setIsPeriodOver(false);
        let nextPeriod: Period | null = null;
        const p = currentPeriod;

        if (p === 'Q1') nextPeriod = 'Q2';
        else if (p === 'Q2') nextPeriod = 'Q3';
        else if (p === 'Q3') nextPeriod = 'Q4';
        else if (p === 'Q4') {
            if (homeScore === awayScore) nextPeriod = 'OT1';
            else {
                alert("Game Over! Score is not tied.");
                return; // Game should be ended via "End Game"
            }
        }
        else if (p === 'OT1') {
            if (homeScore === awayScore) nextPeriod = 'OT2';
            else {
                alert("Game Over! Score is not tied.");
                return;
            }
        }
        else if (p === 'OT2') {
            alert("Max Overtime Reached. Game must end regardless of score (Draw if tied).");
            return;
        }

        if (nextPeriod) {
            setCurrentPeriod(nextPeriod);
            setGameLog(prev => [`Start of ${nextPeriod}`, ...prev]);
        }
    };

    const handleStat = (playerId: string, stat: string, value: number, playerName: string) => {
        if (isPeriodOver) {
            if (!confirm("The period is marked as over. Add stat anyway?")) return;
        }

        // Init player stats if not exists
        if (!playerStats[playerId]) {
            playerStats[playerId] = {
                playerId,
                points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, turnovers: 0,
                fgm: 0, fga: 0, threePtm: 0, threePta: 0, ftm: 0, fta: 0
            };
        }

        const current = playerStats[playerId];

        // Update specific stat
        if (stat === 'PTS') current.points += value;
        if (stat === 'REB') current.rebounds += 1;
        if (stat === 'AST') current.assists += 1;
        if (stat === 'STL') current.steals += 1;
        if (stat === 'BLK') current.blocks += 1;
        if (stat === 'TOV') current.turnovers += 1;

        // Shooting logic (simplified for prototype)
        if (stat === 'FGM') { current.points += 2; }
        if (stat === '3PM') { current.points += 3; }
        if (stat === 'FTM') { current.points += 1; }

        setPlayerStats({ ...playerStats });

        // Update Scoreboard
        const playerTeam = homeTeam?.players.find(p => p.id === playerId) ? 'HOME' : 'AWAY';
        if (stat === 'PTS' || stat === 'FGM' || stat === '3PM' || stat === 'FTM') {
            if (playerTeam === 'HOME') setHomeScore(s => s + value);
            else setAwayScore(s => s + value);
        }

        setGameLog(prev => [`${playerName}: +${value} ${stat}`, ...prev]);
    };

    const toggleSub = (playerId: string) => {
        const newActive = new Set(activePlayers);
        if (newActive.has(playerId)) newActive.delete(playerId);
        else newActive.add(playerId);
        setActivePlayers(newActive);
    };

    const handleEndGame = async () => {
        if (!confirm("End Game and Finalize Stats?")) return;
        if (!gameId) return;

        const payload = Object.values(playerStats);
        // Pass current period info if needed by backend, or just final scores
        const result = await finalizeGame(gameId, payload, homeScore, awayScore);

        if (result.success) {
            alert("Game Saved & Finalized!");
            setStatus('FINISHED');
        } else {
            alert("Error saving game: " + result.error);
        }
    };

    if (status === 'SETUP') {
        return (
            <div className="p-6 max-w-lg mx-auto bg-[#1a1a1a] text-white rounded-xl shadow-xl border border-white/10 mt-10">
                <h1 className="text-3xl font-black italic mb-8 text-center uppercase tracking-tighter">
                    Game <span className="text-edg-red">Setup</span>
                </h1>

                <div className="space-y-6">
                    {/* Teams */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Home Team</label>
                            <select
                                className="w-full p-3 bg-[#2a2a2a] rounded border border-white/10 focus:border-edg-red outline-none transition-colors"
                                onChange={(e) => setHomeTeamId(e.target.value)}
                                value={homeTeamId}
                            >
                                <option value="">Select Home</option>
                                {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Away Team</label>
                            <select
                                className="w-full p-3 bg-[#2a2a2a] rounded border border-white/10 focus:border-edg-red outline-none transition-colors"
                                onChange={(e) => setAwayTeamId(e.target.value)}
                                value={awayTeamId}
                            >
                                <option value="">Select Away</option>
                                {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="h-px bg-white/10"></div>

                    {/* Rules Config */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Quarters</label>
                            <input
                                type="number"
                                disabled // Fixed to 4 for now based on rules
                                value={rules.quarters}
                                className="w-full p-3 bg-[#2a2a2a] rounded border border-white/10 font-mono text-center text-gray-500 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Mins / Qtr</label>
                            <input
                                type="number"
                                min="1" max="20"
                                value={rules.minutesPerQuarter}
                                onChange={(e) => setRules({ ...rules, minutesPerQuarter: parseInt(e.target.value) })}
                                className="w-full p-3 bg-[#2a2a2a] rounded border border-white/10 font-mono text-center"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Max OT Periods</label>
                            <input
                                type="number"
                                disabled
                                value={rules.maxOt}
                                className="w-full p-3 bg-[#2a2a2a] rounded border border-white/10 font-mono text-center text-gray-500 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Mins / OT</label>
                            <input
                                type="number"
                                disabled
                                value={rules.minutesPerOt}
                                className="w-full p-3 bg-[#2a2a2a] rounded border border-white/10 font-mono text-center text-gray-500 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleStartGame}
                        className="w-full py-4 bg-white text-black font-black uppercase tracking-wider rounded hover:bg-edg-red hover:text-white transition-all transform hover:scale-[1.02] mt-4"
                    >
                        Initialize Match
                    </button>
                </div>
            </div>
        );
    }

    if (status === 'FINISHED') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
                <h1 className="text-4xl font-black italic mb-4">GAME FINAL</h1>
                <div className="text-2xl font-mono mb-8">
                    {homeTeam?.name} <span className="text-edg-red">{homeScore}</span> - <span className="text-edg-red">{awayScore}</span> {awayTeam?.name}
                </div>
                <button
                    onClick={() => setStatus('SETUP')}
                    className="px-6 py-3 bg-white/10 rounded hover:bg-white/20 uppercase font-bold text-sm"
                >
                    Setup New Game
                </button>
            </div>
        );
    }

    const currentDuration = (currentPeriod === 'OT1' || currentPeriod === 'OT2')
        ? rules.minutesPerOt
        : rules.minutesPerQuarter;

    // Check if we can advance
    const canAdvance = !gameId ? false :
        (currentPeriod === 'Q1' || currentPeriod === 'Q2' || currentPeriod === 'Q3') ? true :
            (currentPeriod === 'Q4' && homeScore === awayScore) ? true :
                (currentPeriod === 'OT1' && homeScore === awayScore) ? true : false;

    const advanceLabel =
        (currentPeriod === 'Q1') ? 'End Q1 -> Start Q2' :
            (currentPeriod === 'Q2') ? 'End Q2 -> Start Q3' :
                (currentPeriod === 'Q3') ? 'End Q3 -> Start Q4' :
                    (currentPeriod === 'Q4') ? 'End Q4 -> Start OT1' :
                        (currentPeriod === 'OT1') ? 'End OT1 -> Start OT2' : 'End Game';

    return (
        <div className="h-screen bg-black text-white flex flex-col">
            {/* Scoreboard Header */}
            <div className="flex justify-between items-center p-4 bg-[#111] border-b border-white/10 sticky top-0 z-50">
                <div className="text-center w-1/3">
                    <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">{homeTeam?.name}</div>
                    <div className="text-5xl font-mono font-black text-white">{homeScore}</div>
                </div>

                <div className="flex flex-col items-center w-1/3 space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="text-xs font-bold text-edg-red px-2 py-1 bg-edg-red/10 rounded border border-edg-red/20 uppercase animate-pulse">
                            ACTIVE
                        </div>
                        <div className="text-xl font-black font-mono text-white">
                            {currentPeriod}
                        </div>
                    </div>

                    <div className="text-sm font-mono text-gray-500 uppercase">
                        {currentDuration}:00 MIN
                    </div>

                    {/* Period Controls */}
                    <div className="flex gap-2">
                        {canAdvance && (
                            <button
                                onClick={handleNextPeriod}
                                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-xs font-bold uppercase rounded border border-white/10"
                            >
                                {advanceLabel}
                            </button>
                        )}
                        <button
                            onClick={handleEndGame}
                            className="px-3 py-1 bg-red-900/50 hover:bg-red-900 border border-red-700 text-red-100 text-xs font-bold rounded uppercase transition-colors"
                        >
                            End Game
                        </button>
                    </div>
                </div>

                <div className="text-center w-1/3">
                    <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">{awayTeam?.name}</div>
                    <div className="text-5xl font-mono font-black text-white">{awayScore}</div>
                </div>
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
            <div className="h-32 bg-[#050505] border-t border-white/10 p-3 overflow-y-auto font-mono text-xs text-gray-500">
                {gameLog.map((l, i) => <div key={i} className="mb-1 border-l-2 border-white/10 pl-2">{l}</div>)}
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
    // Sort players by active state/name
    const sortedPlayers = [...team.players].sort((a, b) => a.number! - b.number!);

    return (
        <div>
            <h3 className="text-white font-black italic mb-4 uppercase tracking-tighter text-2xl border-l-4 border-edg-red pl-3">{team.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {sortedPlayers.map(player => {
                    const isActive = activePlayers.has(player.id);
                    const pStats = stats[player.id];
                    return (
                        <div key={player.id} className={`p-3 rounded-sm border ${isActive ? 'bg-zinc-900 border-white/20' : 'bg-black border-white/5 opacity-60'} transition-all`}>
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-bold text-sm uppercase tracking-wide">{player.name} <span className="text-gray-500 text-xs">#{player.number}</span></span>
                                <span className="text-xs font-mono font-bold text-edg-red">{pStats?.points || 0} PTS</span>
                            </div>

                            {/* Stat Buttons */}
                            <div className="grid grid-cols-6 gap-1 mb-2">
                                <Btn onClick={() => onStat(player.id, 'FGM', 2, player.name)}>2P</Btn>
                                <Btn onClick={() => onStat(player.id, '3PM', 3, player.name)}>3P</Btn>
                                <Btn onClick={() => onStat(player.id, 'FTM', 1, player.name)}>1P</Btn>
                                <Btn onClick={() => onStat(player.id, 'REB', 0, player.name)}>REB</Btn>
                                <Btn onClick={() => onStat(player.id, 'AST', 0, player.name)}>AST</Btn>
                                <Btn onClick={() => onStat(player.id, 'STL', 0, player.name)}>STL</Btn>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                                <button onClick={() => onSub(player.id)} className={`py-1 text-[10px] font-bold uppercase rounded border ${isActive ? 'bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500/20' : 'bg-green-500/10 text-green-500 border-green-500/30 hover:bg-green-500/20'}`}>
                                    {isActive ? 'Sub Out' : 'Check In'}
                                </button>
                                <Btn onClick={() => onStat(player.id, 'TOV', 0, player.name)} className="text-orange-500 border-orange-500/20">TOV</Btn>
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
            className={`py-2 text-[10px] font-bold uppercase bg-[#1a1a1a] hover:bg-[#333] rounded border border-white/10 active:scale-95 transition ${className}`}
        >
            {children}
        </button>
    )
}
