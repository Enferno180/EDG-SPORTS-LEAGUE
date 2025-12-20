
import React from 'react';

interface PlayerTierCardProps {
    tier: 'Prospect' | 'Starter' | 'AllStar' | 'Superstar' | 'Legend';
    name: string;
    ovr: number;
    image: string;
    badge?: string;
}

export function PlayerTierCard({ tier, name, ovr, image, badge }: PlayerTierCardProps) {
    const tierClassMap = {
        'Prospect': 'card-tier-prospect',
        'Starter': 'card-tier-starter',
        'AllStar': 'card-tier-allstar',
        'Superstar': 'card-tier-superstar',
        'Legend': 'card-tier-legend'
    };

    const tierLabelMap = {
        'Prospect': 'PROSPECT',
        'Starter': 'STARTER',
        'AllStar': 'ALL-STAR',
        'Superstar': 'SUPERSTAR',
        'Legend': 'BLACK DIAMOND'
    };

    return (
        <div className={`relative w-64 h-96 rounded-xl shadow-2xl overflow-hidden flex flex-col p-4 border transition-transform hover:scale-105 ${tierClassMap[tier]}`}>
            <div className="flex justify-between items-start z-10">
                <div className="flex flex-col">
                    <span className="text-4xl font-head font-bold leading-none">{ovr}</span>
                    <span className="text-xs uppercase font-bold tracking-widest opacity-80">OVR</span>
                </div>
                {badge && (
                    <div className="bg-black/80 backdrop-blur-sm p-1.5 rounded text-white border border-white/20">
                        {/* Placeholder icon for badge */}
                        <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-[10px] text-black font-bold">
                            {badge[0]}
                        </div>
                    </div>
                )}
            </div>

            <div className="absolute inset-x-0 bottom-0 top-16 z-0">
                <img src={image} alt={name} className="w-full h-full object-cover object-top mix-blend-normal" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>

            <div className="mt-auto z-10 text-center relative">
                <div className="text-xs font-bold uppercase tracking-[0.2em] mb-1 opacity-90">{tierLabelMap[tier]}</div>
                <h3 className="text-2xl font-head font-bold uppercase leading-none mb-4">{name}</h3>

                {tier === 'Legend' && (
                    <div className="absolute -bottom-10 left-0 right-0 h-10 bg-accent/20 blur-xl"></div>
                )}
            </div>
        </div>
    );
}
