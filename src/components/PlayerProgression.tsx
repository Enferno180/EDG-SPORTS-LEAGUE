'use client';

import React from 'react';

interface ProgressionTarget {
    current: number;
    target: number;
    label: string;
}

interface PlayerProgressionProps {
    attributes: Record<string, number>;
    progression: Record<string, ProgressionTarget>; // e.g. { "Three Point": { current: 12, target: 50, label: "Makes" } }
}

export function PlayerProgression({ attributes, progression }: PlayerProgressionProps) {
    // Helper to format attribute name (camelCase to Title Case)
    const formatName = (name: string) => name.replace(/([A-Z])/g, ' $1').trim();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white uppercase italic tracking-wider">Skill Progression</h3>
                <div className="h-0.5 flex-1 bg-white/10 ml-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(attributes).map(([attrName, attrValue]) => {
                    // Check if there is an active target for this attribute
                    const target = progression[attrName];
                    if (!target && attrValue < 99) return null; // Only show active progressions or maxed out? Let's show all for now but highlight active.

                    return (
                        <div key={attrName} className="bg-white/5 border border-white/10 rounded p-4 relative overflow-hidden group hover:border-white/20 transition-colors">
                            {/* Header */}
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">{formatName(attrName)}</span>
                                <span className="text-2xl font-black text-white">{attrValue}</span>
                            </div>

                            {/* Progression Bar (Attribute Level) */}
                            <div className="h-1.5 bg-black rounded-full overflow-hidden mb-4">
                                <div
                                    className="h-full bg-edg-red transition-all duration-1000"
                                    style={{ width: `${attrValue}%` }}
                                ></div>
                            </div>

                            {/* Mini-Target Section (The "Quest") */}
                            {target ? (
                                <div className="bg-black/40 rounded p-3 border border-white/5">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-yellow-400 font-bold uppercase">Current Goal</span>
                                        <span className="text-white font-mono">{target.current} / {target.target}</span>
                                    </div>
                                    <p className="text-xs text-white/70 mb-2">{target.label}</p>

                                    {/* Mini Progress Bar */}
                                    <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                                            style={{ width: `${(target.current / target.target) * 100}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-1 text-right italic">
                                        +1 {formatName(attrName)} upon completion
                                    </p>
                                </div>
                            ) : attrValue >= 99 ? (
                                <div className="text-center py-2">
                                    <span className="text-xs font-bold text-green-500 uppercase tracking-widest border border-green-500/30 px-2 py-1 rounded">Maxed Out</span>
                                </div>
                            ) : (
                                <div className="text-center py-2 opacity-50">
                                    <span className="text-xs text-gray-500 uppercase">No active target</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
