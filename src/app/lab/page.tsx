
import React from 'react';
import { PlayerTierCard } from '@/components/PlayerTierCard';

export default function LabPage() {
    return (
        <section className="min-h-screen bg-[#05080F] py-20 px-4">
            <div className="container mx-auto">
                <h1 className="text-5xl font-head text-white mb-4 text-center">PLAYER TIER SYSTEM</h1>
                <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
                    Visualizing the progression from Prospect to Legend. The "Black Diamond" tier represents the pinnacle of the league.
                </p>

                <div className="flex flex-wrap justify-center gap-8 items-center">
                    <PlayerTierCard
                        tier="Prospect"
                        name="ROOKIE ONE"
                        ovr={68}
                        image="https://i.pravatar.cc/300?u=male1"
                    />
                    <PlayerTierCard
                        tier="Starter"
                        name="CORE VET"
                        ovr={79}
                        image="https://i.pravatar.cc/300?u=male2"
                    />
                    <PlayerTierCard
                        tier="AllStar"
                        name="PRO SCORER"
                        ovr={88}
                        image="https://i.pravatar.cc/300?u=male3"
                        badge="Sniper"
                    />
                    <PlayerTierCard
                        tier="Superstar"
                        name="FRANCHISE"
                        ovr={94}
                        image="https://i.pravatar.cc/300?u=male4"
                        badge="King"
                    />
                    <div className="scale-110 mx-4">
                        <PlayerTierCard
                            tier="Legend"
                            name="THE GOAT"
                            ovr={99}
                            image="https://i.pravatar.cc/300?u=male5"
                            badge="God"
                        />
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <div className="inline-block bg-black p-8 rounded-xl border border-white/10">
                        <h2 className="text-2xl font-head text-white mb-2">BLACK DIAMOND STATUS</h2>
                        <p className="text-gray-400">Reserved for the Top 1% of the League.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
