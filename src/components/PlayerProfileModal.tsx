'use client';

import React, { useState, useMemo } from 'react';
import { Player, TEAMS } from '@/lib/data';
import { calculateOVR } from '@/lib/rating';
import { getBenchmarkGrade, getStatBenchmark, BenchmarkGrade } from '@/lib/benchmarks';
import { calculateCombineRating } from '@/lib/combine';
import { ALL_BADGES } from '@/lib/badges';
import Badge from './Badge';
import { PlayerProgression } from './PlayerProgression';
import { useSession } from "next-auth/react";

const GradeBadge = ({ grade }: { grade: BenchmarkGrade }) => {
    const colors = {
        'LEGEND': 'text-yellow-400 border-yellow-400',
        'ELITE': 'text-purple-400 border-purple-400',
        'PRO': 'text-blue-400 border-blue-400',
        'ROOKIE': 'text-green-400 border-green-400',
        'DEV': 'text-gray-500 border-gray-500',
    };
    if (grade === 'DEV') return null; // Don't show for low tiers
    return <span className={`text-[0.6rem] px-1 rounded border ${colors[grade]} ml-1`}>{grade}</span>;
}

interface PlayerProfileModalProps {
    player: Player | null;
    isOpen: boolean;
    onClose: () => void;
}

export function PlayerProfileModal({ player, isOpen, onClose }: PlayerProfileModalProps) {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState<'stats' | 'attributes' | 'badges' | 'combine' | 'progression'>('stats');

    const computedBadges = useMemo(() => {
        if (!player) return [];
        return Object.values(ALL_BADGES)
            .filter(def => def.qualify && def.qualify(player))
            .map(def => ({ name: def.name, tier: 'Gold' as const })); // Default to Gold for calculated badges
    }, [player]);

    if (!isOpen || !player) return null;

    // Find the team to get colors
    const teamData = TEAMS.find(t => t.name === player.team);
    const primaryColor = teamData?.colors.primary || '#d4af37'; // Default Gold
    const accentColor = teamData?.colors.accent || '#000000';

    const playerOvr = player.attributes ? calculateOVR(player.attributes, player.pos) : player.overall;
    const ovrGrade = getBenchmarkGrade(playerOvr, 99);

    // Dynamic Tier Styling
    let tierStyle = {
        name: 'Prospect',
        bg: 'bg-black',
        border: 'border-white/10',
        glow: '',
        text: 'text-white/50',
        badge: 'bg-black text-white/50 border-white/20'
    };

    if (playerOvr >= 90) {
        tierStyle = {
            name: 'LEGEND',
            bg: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black',
            border: 'border-white',
            glow: 'shadow-[0_0_50px_rgba(255,255,255,0.6)] animate-pulse-slow',
            text: 'text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 animate-gradient-xy',
            badge: 'bg-black text-white border-white shadow-[0_0_15px_rgba(255,255,255,0.8)]'
        };
    } else if (playerOvr >= 80) {
        tierStyle = {
            name: 'SUPERSTAR',
            bg: 'bg-gradient-to-br from-yellow-600 via-amber-500 to-yellow-800',
            border: 'border-yellow-400',
            glow: 'shadow-[0_0_30px_rgba(234,179,8,0.5)]',
            text: 'text-yellow-100 drop-shadow-md',
            badge: 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold border-yellow-300'
        };
    } else if (playerOvr >= 70) {
        tierStyle = {
            name: 'ALL-STAR',
            bg: 'bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500',
            border: 'border-gray-200',
            glow: 'shadow-[0_0_20px_rgba(255,255,255,0.4)]',
            text: 'text-white drop-shadow',
            badge: 'bg-gradient-to-r from-gray-300 to-gray-400 text-black font-bold border-white'
        };
    } else if (playerOvr >= 60) {
        tierStyle = {
            name: 'STARTER',
            bg: 'bg-gradient-to-br from-orange-900 via-amber-800 to-orange-950',
            border: 'border-orange-700',
            glow: 'shadow-[0_0_15px_rgba(154,52,18,0.3)]',
            text: 'text-orange-100',
            badge: 'bg-orange-900 text-orange-200 border-orange-700'
        };
    }

    // Use primary color only if not in a high tier overrides, OR blend it?
    // User requested specific backgrounds, so we prioritize the Tier BG.
    // However, the "accent" line at top currently uses primaryColor.

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={onClose}>
            {/* Main Container - "NBA 2K" Style */}
            <div
                className={`relative w-full max-w-5xl bg-[#121212] rounded-none shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border-t-4 transition-all duration-500 ${tierStyle.glow}`}
                onClick={e => e.stopPropagation()}
                style={{ borderColor: playerOvr >= 80 ? '' : primaryColor }} // Let Tier Color override if high tier? Or keep Team Color? User said "Black Diamond... glowing". Let's use class for high tiers.
            >

                {/* 1. Header Section - The "Player Card" look */}
                <div className={`relative h-auto md:h-48 w-full overflow-hidden shrink-0 ${tierStyle.bg}`}>
                    {/* Overlay for shimmer effects */}
                    {playerOvr >= 80 && <div className="absolute inset-0 animate-shimmer"></div>}

                    {/* Background Gradient using Team Color (Only for lower tiers or blend?) */}
                    {playerOvr < 80 && (
                        <div
                            className="absolute inset-0 opacity-40 mix-blend-overlay"
                            style={{ background: `linear-gradient(to right, #000 0%, ${primaryColor} 50%, #000 100%)` }}
                        ></div>
                    )}

                    <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between px-4 py-6 md:py-0 md:px-10 gap-4 md:gap-0">
                        {/* LEFT: Jersey Number (Big, Watermark style) */}
                        <div className="flex items-center scale-75 md:scale-100 origin-left">
                            <span className="text-6xl md:text-8xl font-black text-white/10 select-none tracking-tighter" style={{ fontFamily: 'Impact, sans-serif' }}>
                                {player.jersey}
                            </span>
                            <img
                                src={player.avatar}
                                alt={player.name}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 shadow-xl ml-[-10px] md:ml-[-20px] object-cover"
                                style={{ borderColor: primaryColor }}
                            />
                        </div>

                        {/* CENTER: Name & Info */}
                        <div className="flex-1 px-0 md:px-8 text-center md:text-left w-full">
                            <div className="flex items-baseline justify-center md:justify-start gap-3 mb-1">
                                <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none text-center md:text-left">
                                    {player.name.split(' ')[0]} <span style={{ color: primaryColor }}>{player.name.split(' ').slice(1).join(' ')}</span>
                                </h1>
                            </div>

                            {/* Sub-Info Banner */}
                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 md:gap-4 text-xs md:text-sm font-bold uppercase tracking-widest text-white/80 bg-white/5 p-2 rounded inline-block backdrop-blur-sm">
                                <span className='text-white'>{player.pos}</span>
                                <span className="w-px h-3 bg-white/30"></span>
                                <div className="flex items-center gap-2">
                                    {teamData?.logo && <img src={teamData.logo} alt={player.team} className="w-5 h-5 object-contain" />}
                                    <span>{player.team}</span>
                                </div>
                                <span className="w-px h-3 bg-white/30"></span>
                                <span>{player.height}</span>
                                <span className="w-px h-3 bg-white/30"></span>
                                <span>{200 + (player.name.length * 2)} LBS</span>
                                <span className="w-px h-3 bg-white/30"></span>
                                <span className="text-edg-red">
                                    {(() => {
                                        const [fStr, iStr] = player.height.split("'");
                                        let f = parseInt(fStr);
                                        let i = parseInt(iStr || '0') + 4; // Add 4 inches for wingspan
                                        if (i >= 12) { f += 1; i -= 12; }
                                        return `WS: ${f}'${i}"`;
                                    })()}
                                </span>
                                <span className="w-px h-3 bg-white/30"></span>
                                <span>{player.age} YRS</span>
                            </div>
                        </div>

                        {/* RIGHT: OVR Ring */}
                        <div className="flex flex-col items-center justify-center relative z-10">
                            <div className={`relative w-24 h-24 flex items-center justify-center rounded-full border-[6px] ${tierStyle.bg} ${tierStyle.border} ${tierStyle.glow}`} style={playerOvr < 80 ? { borderColor: primaryColor, backgroundColor: '#000' } : {}}>
                                <span className={`text-4xl font-black ${tierStyle.text}`}>{playerOvr}</span>
                                <span className={`absolute -top-3 px-2 text-xs font-bold uppercase tracking-wider rounded ${tierStyle.badge}`}>OVR</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Navigation / Tabs */}
                <div className="bg-[#1a1a1a] border-b border-white/5 px-8 py-3 flex gap-8 text-sm font-bold tracking-widest uppercase text-white/50 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <span
                        className={`cursor-pointer hover:text-white transition-colors ${activeTab === 'stats' ? 'text-white' : ''}`}
                        style={activeTab === 'stats' ? { borderBottom: `2px solid ${primaryColor}` } : {}}
                        onClick={() => setActiveTab('stats')}
                    >
                        Stats
                    </span>
                    <span
                        className={`cursor-pointer hover:text-white transition-colors ${activeTab === 'attributes' ? 'text-white' : ''}`}
                        style={activeTab === 'attributes' ? { borderBottom: `2px solid ${primaryColor}` } : {}}
                        onClick={() => setActiveTab('attributes')}
                    >
                        Attributes
                    </span>
                    <span
                        className={`cursor-pointer hover:text-white transition-colors ${activeTab === 'badges' ? 'text-white' : ''}`}
                        style={activeTab === 'badges' ? { borderBottom: `2px solid ${primaryColor}` } : {}}
                        onClick={() => setActiveTab('badges')}
                    >
                        Badges
                    </span>
                    <span
                        className={`cursor-pointer hover:text-white transition-colors ${activeTab === 'combine' ? 'text-white' : ''}`}
                        style={activeTab === 'combine' ? { borderBottom: `2px solid ${primaryColor}` } : {}}
                        onClick={() => setActiveTab('combine')}
                    >
                        Combine
                    </span>
                    {/* Show Progression only if it exists or for everyone? User said "Player Exclusive". For now show for all to demonstrate. */}
                    <span
                        className={`cursor-pointer hover:text-white transition-colors ${activeTab === 'progression' ? 'text-white' : ''}`}
                        style={activeTab === 'progression' ? { borderBottom: `2px solid ${primaryColor}` } : {}}
                        onClick={() => setActiveTab('progression')}
                    >
                        Progression
                    </span>
                </div>

                {/* 3. Content Body - Scrollable */}
                <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* DYNAMIC CONTENT AREA */}
                    <div className="col-span-2">
                        {activeTab === 'stats' && (
                            <>
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-white uppercase italic tracking-wider">Season Statistics</h3>
                                    <div className="h-0.5 flex-1 bg-white/10 ml-4"></div>
                                </div>

                                <div className="bg-[#1a1a1a] rounded border border-white/5 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left min-w-[300px]">
                                            <thead style={{ backgroundColor: primaryColor }} className="text-black">
                                                <tr className="text-xs font-bold uppercase">
                                                    <th className="p-3">Stat</th>
                                                    <th className="p-3">Value</th>
                                                    <th className="p-3">Grade</th>
                                                    <th className="p-3">League Avg</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm font-medium text-white/80">
                                                {[
                                                    { label: 'PPG', val: player.ppg, benchmark: 'ppg' },
                                                    { label: 'RPG', val: player.rpg, benchmark: 'rpg' },
                                                    { label: 'APG', val: player.apg, benchmark: 'apg' },
                                                    { label: 'MPG', val: player.mpg, benchmark: 'mpg' },
                                                    { label: 'SPG', val: player.spg, benchmark: 'spg' },
                                                    { label: 'BPG', val: player.bpg, benchmark: 'bpg' },
                                                    { label: 'FG%', val: player.fgPct, benchmark: 'fgPct', isPercentage: true },
                                                    { label: '3P%', val: player.threePtPct, benchmark: 'threePtPct', isPercentage: true },
                                                    { label: 'FT%', val: player.ftPct, benchmark: 'ftPct', isPercentage: true },
                                                    { label: 'TOV', val: player.tov, benchmark: 'tov', lowerIsBetter: true },
                                                ].map((stat, i) => (
                                                    <tr key={stat.label} className={i % 2 === 0 ? 'bg-white/5' : ''}>
                                                        <td className="p-3 text-white font-bold">{stat.label}</td>
                                                        <td className="p-3 text-lg font-head">
                                                            {stat.isPercentage ? `${stat.val}%` : stat.val}
                                                        </td>
                                                        <td className="p-3">
                                                            <GradeBadge grade={getBenchmarkGrade(stat.val as number, getStatBenchmark(stat.benchmark as any), stat.lowerIsBetter || false, stat.benchmark, player.fta)} />
                                                        </td>
                                                        <td className="p-3 text-white/30">-</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'combine' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-white uppercase italic tracking-wider">Combine Results</h3>
                                    <div className="h-0.5 flex-1 bg-white/10 ml-4"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'Sprint (Speed)', val: player.drillScoreSpeed || 4.5, type: 'sprint' },
                                        { label: 'Max Vertical', val: player.drillScoreVertical || 38.5, type: 'vertical' },
                                        { label: 'Agility Lane', val: player.drillScoreAgility || 10.8, type: 'agility' },
                                        { label: 'Bench Press', val: player.drillScoreStrength || 12, type: 'strength' },
                                    ].map((drill) => (
                                        <div key={drill.label} className="bg-white/5 p-4 rounded border border-white/10 flex justify-between items-center">
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase">{drill.label}</p>
                                                <p className="text-2xl font-black text-white">{drill.val || '--'}</p>
                                            </div>
                                            {drill.val && (
                                                <div className="text-right">
                                                    <span className="text-xs block text-gray-500 mb-1">Grade</span>
                                                    <GradeBadge grade={getBenchmarkGrade(calculateCombineRating(drill.val, drill.type as any), 99)} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-white/30 mt-4 italic">* These results set your baseline Physical Attributes.</p>
                            </div>
                        )}

                        {activeTab === 'progression' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                {player.attributes && player.progression ? (
                                    <PlayerProgression attributes={player.attributes} progression={player.progression} />
                                ) : (
                                    <div className="p-8 text-center border border-white/5 rounded bg-white/5">
                                        <p className="text-white/50">No progression data available for this player.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'attributes' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-white uppercase italic tracking-wider">Skill Attributes</h3>
                                    <div className="h-0.5 flex-1 bg-white/10 ml-4"></div>
                                </div>

                                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                    {player.attributes ? Object.entries(player.attributes).map(([key, value]) => (
                                        <div key={key} className="flex items-center gap-3">
                                            <span className="w-24 text-xs font-bold text-white/60 uppercase text-right truncate">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </span>
                                            <div className="flex-1 h-3 bg-[#0a0a0a] rounded-sm overflow-hidden relative border border-white/5">
                                                {/* Fill */}
                                                <div
                                                    className="h-full relative transition-all duration-500 ease-out"
                                                    style={{ width: `${value}%`, backgroundColor: value >= 90 ? '#ef4444' : (value >= 80 ? primaryColor : '#555') }}
                                                ></div>
                                            </div>
                                            <span className={`w-8 text-right font-head text-sm ${value >= 90 ? 'text-red-500' : 'text-white'}`}>{value}</span>
                                        </div>
                                    )) : <p className="text-white/50 text-sm">No attributes available.</p>}
                                </div>
                            </div>
                        )}

                        {activeTab === 'badges' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-white uppercase italic tracking-wider">Acquired Badges</h3>
                                    <div className="h-0.5 flex-1 bg-white/10 ml-4"></div>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    {(() => {
                                        const hardcodedBadges = player.badges || [];
                                        return (hardcodedBadges.length > 0 || computedBadges.length > 0) ? (
                                            [...hardcodedBadges, ...computedBadges]
                                                .filter((b, i, self) => i === self.findIndex((t) => t.name === b.name))
                                                .map((badge) => (
                                                    <Badge key={badge.name} badgeId={badge.name} size="md" />
                                                ))
                                        ) : (
                                            <div className="p-8 w-full text-center border border-white/5 rounded bg-white/5">
                                                <span className="text-white/30 text-lg italic">No badges equipped.</span>
                                            </div>
                                        )
                                    })()}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* COLUMN 2: Info & Scouting Report */}
                    <div className="col-span-1 border-l border-white/5 pl-8">
                        <div className="bg-gradient-to-br from-white/10 to-transparent p-6 rounded border border-white/5 mb-6">
                            <h4 className="text-xs font-bold text-primary mb-2 uppercase tracking-widest" style={{ color: primaryColor }}>Scouting Report</h4>
                            <p className="text-white/80 text-sm leading-relaxed">
                                {player.name} fits the <span className="font-bold text-white">{player.archetype}</span> mold.
                                Comparison: <span className="font-bold text-white">{player.nbaTranslate || 'N/A'}</span>.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Action Buttons: Close & Share */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
                    <button
                        onClick={() => {
                            const text = `Check out ${player.name} (${playerOvr} OVR) on EDG League!\n${player.ppg} PPG | ${player.rpg} RPG | ${player.apg} APG`;
                            navigator.clipboard.writeText(text);
                            alert("Player stats copied to clipboard!");
                        }}
                        className="text-white/20 hover:text-primary transition-colors text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
                        title="Share Player"
                    >
                        <i className="ph ph-share-network"></i>
                    </button>
                    <button
                        onClick={onClose}
                        className="text-white/20 hover:text-white transition-colors text-2xl font-bold w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10"
                    >
                        &times;
                    </button>
                </div>

                {/* Admin Only Edit Button */}
                {session?.user?.role === 'ADMIN' && (
                    <button
                        className="absolute top-4 right-16 text-xs font-bold bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded uppercase tracking-widest transition-colors flex items-center gap-2"
                        onClick={() => alert("Administrative Access: Edit Player functionality coming next.")}
                    >
                        <span>Edit Player</span>
                    </button>
                )}

            </div>
        </div>
    );
}
