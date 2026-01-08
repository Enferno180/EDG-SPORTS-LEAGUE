'use client';

import { useState, useEffect, useCallback } from 'react';
import { Player, Team } from '@prisma/client';
import { createGame, recordEvent, getGameState } from './actions';

type GameStatus = 'SETUP' | 'ACTIVE' | 'FINISHED';
type Period = 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'OT1' | 'OT2';

interface ScorekeeperProps {
    teams: (Team & { players: Player[] })[];
}

export default function ScorekeeperInterface({ teams }: ScorekeeperProps) {
    const [status, setStatus] = useState<GameStatus>('SETUP');
    const [gameId, setGameId] = useState<string | null>(null);

    // Remote State (from DB)
    const [gameState, setGameState] = useState<any>(null);

    // Setup State
    const [homeTeamId, setHomeTeamId] = useState<string>('');
    const [awayTeamId, setAwayTeamId] = useState<string>('');
    const [rules, setRules] = useState({ quarters: 4, minutesPerQuarter: 10, minutesPerOt: 5, maxOt: 2 });

    // Local UI State
    const [loading, setLoading] = useState(false);
    const [activePlayers, setActivePlayers] = useState<Set<string>>(new Set());

    // POLLING: The Heartbeat of "The Arbiter" (Every 5s or on action)
    const refreshGame = useCallback(async () => {
        if (!gameId) return;
        const state = await getGameState(gameId);
        if (state) {
            setGameState(state);
            setStatus(state.status as GameStatus);
        }
    }, [gameId]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameId && status === 'ACTIVE') {
            refreshGame();
            interval = setInterval(refreshGame, 3000); // Poll every 3 seconds for multi-user sync
        }
        return () => clearInterval(interval);
    }, [gameId, status, refreshGame]);

    const handleStartGame = async () => {
        if (!homeTeamId || !awayTeamId) return alert("Select teams");
        if (homeTeamId === awayTeamId) return alert("Same team?");
        setLoading(true);
        const res = await createGame({ homeTeamId, awayTeamId, ...rules });
        setLoading(false);
        if (res.error) return alert(res.error);
        setGameId(res.gameId!);
        setStatus('ACTIVE');
    };

    const handleEvent = async (type: string, val: number, pId?: string, tId?: string, meta?: any) => {
        // Optimistic UI could go here, but for safety we wait for poll or manual trigger
        // Just calling recordEvent is enough, DB is truth.
        if (!gameId) return;

        await recordEvent(gameId, {
            type,
            period: gameState?.currentQuarter ? `Q${gameState.currentQuarter}` : 'Q1',
            // ^ simplified period logic, ideally comes from DB state
            value: val,
            playerId: pId,
            teamId: tId,
            metadata: meta
        });
        refreshGame(); // Instant refresh after action
    };

    const toggleSub = (playerId: string) => {
        const newActive = new Set(activePlayers);
        if (newActive.has(playerId)) newActive.delete(playerId);
        else newActive.add(playerId);
        setActivePlayers(newActive);
    };

    // SETUP VIEW
    if (status === 'SETUP') {
        return (
            <div className="p-6 max-w-lg mx-auto bg-[#1a1a1a] text-white rounded-xl shadow-xl border border-white/10 mt-10">
                <h1 className="text-3xl font-black italic mb-8 text-center uppercase tracking-tighter">
                    Game <span className="text-edg-red">Setup</span>
                </h1>
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Home Team</label>
                            <select className="w-full p-3 bg-[#2a2a2a] rounded border border-white/10 focus:border-edg-red outline-none" onChange={(e) => setHomeTeamId(e.target.value)} value={homeTeamId}>
                                <option value="">Select Home</option>
                                {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Away Team</label>
                            <select className="w-full p-3 bg-[#2a2a2a] rounded border border-white/10 focus:border-edg-red outline-none" onChange={(e) => setAwayTeamId(e.target.value)} value={awayTeamId}>
                                <option value="">Select Away</option>
                                {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <button onClick={handleStartGame} disabled={loading} className="w-full py-4 bg-white text-black font-black uppercase tracking-wider rounded hover:bg-edg-red hover:text-white transition-all">
                        {loading ? 'Initializing...' : 'Initialize Match'}
                    </button>
                </div>
            </div>
        );
    }

    if (!gameState) return <div className="text-white text-center mt-20">Connecting to Arbiter...</div>;

    const { homeTeam, awayTeam, homeScore, awayScore, events } = gameState;

    return (
        <div className="h-screen bg-black text-white flex flex-col">
            {/* Scoreboard */}
            <div className="flex justify-between items-center p-4 bg-[#111] border-b border-white/10 sticky top-0 z-50 shadow-lg">
                <div className="text-center w-1/3">
                    <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">{homeTeam?.name}</div>
                    <div className="text-5xl font-mono font-black text-white">{homeScore}</div>
                </div>

                <div className="flex flex-col items-center w-1/3">
                    <div className="text-xs font-bold text-edg-red px-2 py-1 bg-edg-red/10 rounded border border-edg-red/20 uppercase animate-pulse mb-1">LIVE</div>
                    <div className="text-xl font-black font-mono text-white">Q{gameState.currentQuarter}</div>
                </div>

                <div className="text-center w-1/3">
                    <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">{awayTeam?.name}</div>
                    <div className="text-5xl font-mono font-black text-white">{awayScore}</div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex-1 overflow-y-auto p-4 space-y-8">
                <TeamControls
                    team={homeTeam}
                    activePlayers={activePlayers}
                    onAction={(type: string, val: number, pid: string, meta: any) => handleEvent(type, val, pid, homeTeam?.id || '', meta)}
                    onSub={toggleSub}
                />
                <div className="h-px bg-white/10" />
                <TeamControls
                    team={awayTeam}
                    activePlayers={activePlayers}
                    onAction={(type: string, val: number, pid: string, meta: any) => handleEvent(type, val, pid, awayTeam?.id || '', meta)}
                    onSub={toggleSub}
                />
            </div>

            {/* Event Feed (Audit Trail) */}
            <div className="h-40 bg-[#050505] border-t border-white/10 p-3 overflow-y-auto font-mono text-xs">
                <h4 className="text-gray-500 uppercase font-bold mb-2 sticky top-0 bg-[#050505]">Event Log</h4>
                {events?.map((e: any) => (
                    <div key={e.id} className="mb-1 border-l-2 border-white/10 pl-2 text-gray-400 flex justify-between group">
                        <span>
                            <span className="text-edg-red font-bold">{e.gameClock}</span>{' '}
                            {e.type === 'POINT' ? `+${e.value} PTS` : e.type} - {e.player?.name || e.team?.name || 'Game'}
                        </span>
                        {/* Placeholder for Undo */}
                        <button className="hidden group-hover:block text-red-500 hover:underline">[VOID]</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TeamControls({ team, activePlayers, onAction, onSub }: any) {
    const sortedPlayers = [...team.players].sort((a: any, b: any) => a.number - b.number);

    return (
        <div>
            <h3 className="text-white font-black italic mb-4 uppercase tracking-tighter text-2xl border-l-4 border-edg-red pl-3">{team.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {sortedPlayers.map((player: any) => {
                    const isActive = activePlayers.has(player.id);
                    return (
                        <div key={player.id} className={`p-3 rounded-sm border ${isActive ? 'bg-zinc-900 border-white/20' : 'bg-black border-white/5 opacity-60'} transition-all`}>
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-bold text-sm uppercase tracking-wide truncate pr-2">{player.name}</span>
                                <span className="text-xs text-gray-500">#{player.number}</span>
                            </div>

                            <div className="grid grid-cols-6 gap-1 mb-2">
                                <Btn onClick={() => onAction('POINT', 2, player.id, { statType: 'FGM' })}>2P</Btn>
                                <Btn onClick={() => onAction('POINT', 3, player.id, { statType: '3PM' })}>3P</Btn>
                                <Btn onClick={() => onAction('POINT', 1, player.id, { statType: 'FTM' })}>1P</Btn>
                                <Btn onClick={() => onAction('STAT', 0, player.id, { statType: 'REB' })}>REB</Btn>
                                <Btn onClick={() => onAction('STAT', 0, player.id, { statType: 'AST' })}>AST</Btn>
                                <Btn onClick={() => onAction('STAT', 0, player.id, { statType: 'STL' })}>STL</Btn>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                                <button onClick={() => onSub(player.id)} className={`py-1 text-[10px] font-bold uppercase rounded border ${isActive ? 'bg-red-500/10 text-red-500 border-red-500/30' : 'bg-green-500/10 text-green-500 border-green-500/30'}`}>
                                    {isActive ? 'Sub Out' : 'Check In'}
                                </button>
                                <Btn onClick={() => onAction('STAT', 0, player.id, { statType: 'TOV' })} className="text-orange-500 border-orange-500/20">TOV</Btn>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

function Btn({ children, onClick, className }: any) {
    return (
        <button onClick={onClick} className={`py-2 text-[10px] font-bold uppercase bg-[#1a1a1a] hover:bg-[#333] rounded border border-white/10 active:scale-95 transition ${className}`}>
            {children}
        </button>
    )
}
