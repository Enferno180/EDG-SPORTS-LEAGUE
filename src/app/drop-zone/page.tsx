"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// EDG LIFE: Lifestyle Apparel (Hoodie, Tees, Jersey, Socks, Hat)
const EDG_LIFE = [
    { name: "EDG OFFICIAL JERSEY", sizes: "Men's S - XXL", price: "$85.00", image_alt: "JERSEY MOCKUP" },
    { name: "\"FATAL FOUR\" HOODIE", sizes: "Men's S - XXL", price: "$65.00", image_alt: "HOODIE MOCKUP" },
    { name: "EDG T-SHIRT", sizes: "Men's S - XXL", price: "$35.00", image_alt: "T-SHIRT MOCKUP" },
    { name: "PRO SOCKS", price: "$15.00", image_alt: "SOCKS PAIR" },
    { name: "PHILLY SKYLINE CAP", price: "$35.00", image_alt: "HAT MOCKUP" },
];

// EDG GAME TIME: On-Court Performance Gear
const EDG_GAME_TIME = [
    { name: "COMPRESSION SHORTS", sizes: "Men's S - XXL", price: "$40.00", image_alt: "COMPRESSION SHORTS" },
    { name: "HEADBAND", price: "$15.00", image_alt: "HEADBAND" },
    { name: "WRISTBANDS", price: "$12.00", image_alt: "WRISTBANDS" },
    { name: "ARM SLEEVE", price: "$25.00", image_alt: "ARM SLEEVE" },
    { name: "3/4 ARM SLEEVE", price: "$22.00", image_alt: "3/4 SLEEVE" },
    { name: "LEG SLEEVE", price: "$30.00", image_alt: "LEG SLEEVE" },
    { name: "CALF SLEEVE", price: "$25.00", image_alt: "CALF SLEEVE" },
    { name: "ELBOW SWEATBAND", price: "$15.00", image_alt: "ELBOW BAND" },
    { name: "KNEE SWEATBAND", price: "$18.00", image_alt: "KNEE BAND" },
];

// ACCESSORIES: Gear & Memorabilia
const ACCESSORIES = [
    { name: "EDG WATER BOTTLE", price: "$25.00", image_alt: "BOTTLE" },
    { name: "OFFICIAL LANYARD", price: "$10.00", image_alt: "LANYARD" },
    { name: "PLAYER BOBBLEHEAD", price: "$20.00", image_alt: "BOBBLEHEAD" },
    { name: "SIGNED GAME BALL", price: "$150.00", image_alt: "GAME BALL" },
];

function MerchGrid({ items }: { items: any[] }) {
    const [loading, setLoading] = useState<string | null>(null);

    const handleCheckout = async (item: any) => {
        alert("Checkout is currently disabled.");
    };

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {items.map((item, idx) => (
                <div key={idx} className="shop-item group flex flex-col h-full">
                    <div className="shop-placeholder bg-white/5 flex items-center justify-center h-80 rounded-md border border-white/10 group relative overflow-hidden mb-4">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                            <span className="text-primary font-bold uppercase tracking-widest text-sm">In Stock</span>
                        </div>
                        <span className="text-white/30 font-head font-bold text-xl text-center px-4">{item.image_alt}</span>
                    </div>

                    <div className="flex flex-col flex-grow">
                        <h3 className="text-xl font-black italic uppercase tracking-tighter leading-none mb-2 group-hover:text-primary transition-colors">{item.name}</h3>

                        {'sizes' in item && (
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wide mb-1">
                                {(item as any).sizes}
                            </p>
                        )}

                        <p className="text-white/80 font-bold mt-auto">{item.price}</p>

                        <button
                            onClick={() => handleCheckout(item)}
                            disabled={loading === item.name}
                            className="btn w-full mt-4 text-xs py-2 disabled:opacity-50 disabled:cursor-wait"
                        >
                            {loading === item.name ? 'PROCESSING...' : 'BUY NOW'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function DropZonePage() {
    return (
        <main className="min-h-screen pt-12 pb-24 px-6 bg-gradient-to-b from-black via-zinc-950 to-black text-white">
            <div className="max-w-7xl mx-auto space-y-24">

                {/* Hero / Header */}
                <div className="text-center space-y-6">
                    <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200 animate-glow">
                        DROP ZONE
                    </h1>
                    <p className="text-2xl text-gray-400 font-light max-w-2xl mx-auto">
                        Exclusive gear. Limited edition.
                    </p>
                </div>

                {/* EDG LIFE Section */}
                <section id="life" className="scroll-mt-32">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                            EDG LIFE
                        </h2>
                        <div className="h-1 bg-primary flex-grow opacity-50"></div>
                    </div>
                    <MerchGrid items={EDG_LIFE} />
                </section>

                {/* EDG GAME TIME Section */}
                <section id="gametime" className="scroll-mt-32">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                            EDG GAME TIME
                        </h2>
                        <div className="h-1 bg-primary flex-grow opacity-50"></div>
                    </div>
                    <MerchGrid items={EDG_GAME_TIME} />
                </section>

                {/* ACCESSORIES Section */}
                <section id="accessories" className="scroll-mt-32">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                            ACCESSORIES
                        </h2>
                        <div className="h-1 bg-primary flex-grow opacity-50"></div>
                    </div>
                    <MerchGrid items={ACCESSORIES} />
                </section>

            </div>
        </main>
    );
}
