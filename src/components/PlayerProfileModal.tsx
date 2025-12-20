'use client';

import React, { useState, useMemo } from 'react';
import { Player, TEAMS } from '@/lib/data';
import { calculateOVR } from '@/lib/rating';
import { getBenchmarkGrade, getStatBenchmark, BenchmarkGrade } from '@/lib/benchmarks';
import { ALL_BADGES } from '@/lib/badges';
import Badge from './Badge';
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
    const [activeTab, setActiveTab] = useState<'stats' | 'attributes' | 'badges'>('stats');

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={onClose}>
            {/* Main Container - "NBA 2K" Style */}
            <div
                className="relative w-full max-w-5xl bg-[#121212] rounded-none shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                onClick={e => e.stopPropagation()}
                style={{ borderTop: `4px solid ${primaryColor}` }}
            >

                {/* 1. Header Section - The "Player Card" look */}
                <div className="relative h-48 w-full overflow-hidden shrink-0">
                    {/* Background Gradient using Team Color */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{ background: `linear-gradient(to right, #000 0%, ${primaryColor} 50%, #000 100%)` }}
                    ></div>

                    <div className="relative z-10 h-full flex items-center justify-between px-10">
                        {/* LEFT: Jersey Number (Big, Watermark style) */}
                        <div className="flex items-center">
                            <span className="text-8xl font-black text-white/10 select-none tracking-tighter" style={{ fontFamily: 'Impact, sans-serif' }}>
                                {player.jersey}
                            </span>
                            <img
                                src={player.avatar}
                                alt={player.name}
                                className="w-32 h-32 rounded-full border-4 shadow-xl ml-[-20px] object-cover"
                                style={{ borderColor: primaryColor }}
                            />
                        </div>

                        {/* CENTER: Name & Info */}
                        <div className="flex-1 px-8">
                            <div className="flex items-baseline gap-3 mb-1">
                                <h1 className="text-5xl font-black text-white uppercase tracking-tight leading-none">
                                    {player.name.split(' ')[0]} <span style={{ color: primaryColor }}>{player.name.split(' ').slice(1).join(' ')}</span>
                                </h1>
                            </div>

                            {/* Sub-Info Banner */}
                            <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white/80 bg-white/5 p-2 rounded inline-block backdrop-blur-sm">
                                <span className='text-white'>{player.pos}</span>
                                <span className="w-px h-3 bg-white/30"></span>
                                <span>{player.team}</span>
                                <span className="w-px h-3 bg-white/30"></span>
                                <span>{player.height}</span>
                                <span className="w-px h-3 bg-white/30"></span>
                                <span>{player.age} YRS</span>
                            </div>
                        </div>

                        {/* RIGHT: OVR Ring */}
                        <div className="flex flex-col items-center justify-center">
                            <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-[6px]" style={{ borderColor: primaryColor, backgroundColor: '#000' }}>
                                <span className="text-4xl font-black text-white">{playerOvr}</span>
                                <span className="absolute -top-3 bg-black px-2 text-xs font-bold text-white uppercase tracking-wider">OVR</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Navigation / Tabs */}
                <div className="bg-[#1a1a1a] border-b border-white/5 px-8 py-3 flex gap-8 text-sm font-bold tracking-widest uppercase text-white/50">
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
                                    <table className="w-full text-left">
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
                                                        <GradeBadge grade={getBenchmarkGrade(stat.val as number, getStatBenchmark(stat.benchmark as any), stat.lowerIsBetter || false)} />
                                                    </td>
                                                    <td className="p-3 text-white/30">-</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
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
                                        // 1. Get Hardcoded Badges
                                        const hardcodedBadges = player.badges || [];

                                        // 2. Calculate Dynamic Badges based on Attributes/Stats
                                        // Import ALL_BADGES at top or use from context if available, assuming it is imported in this file?
                                        // It wasn't imported in previous view, need to ensure import.
                                        // But wait, I can't import ALL_BADGES inside JSX. I must do it outside.
                                        // I'll assume I need to add the import at the top of the file in a separate step if it's missing.
                                        // For this step, I will replace the rendering logic to use a 'allPlayerBadges' variable calculated before return.
                                        return (hardcodedBadges.length > 0 || computedBadges.length > 0) ? (
                                            [...hardcodedBadges, ...computedBadges]
                                                // Deduplicate by name
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

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
                >
                    &times;
                </button>

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
