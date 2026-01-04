import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const TIERS = [
    {
        id: "tier_1",
        name: "DIGITAL COURT",
        image: "/images/tier_digital_court.png",
        price: "$14.99/mo",
        summary: "Stream Every Game Live + Replays",
    },
    {
        id: "ticket_1",
        name: "GAME TICKET",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop",
        price: "$35.00",
        summary: "Entry + Water Ice & Pretzel",
        ticket: true
    },
    {
        id: "tier_2",
        name: "HOME COURT",
        image: "/images/tier_home_court.png",
        price: "$39.99/mo",
        summary: "Hybrid Access + Merch Discounts + Tickets",
    },
    {
        id: "tier_3",
        name: "COURTSIDE CLUB",
        image: "/images/tier_courtside_club_jersey.jpg",
        price: "$249.99/yr",
        summary: "VIP Founder Status + Jersey + Discounted Seats",
    },
];

export default function MembershipsPage() {
    return (
        <main className="min-h-screen pt-12 pb-12 px-6 bg-gradient-to-b from-black via-zinc-950 to-black text-white">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Hero / Header */}
                <div className="text-center space-y-6">
                    <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200 animate-glow">
                        FAN ZONE
                    </h1>
                    <p className="text-2xl text-gray-400 font-light max-w-2xl mx-auto">
                        Choose your pass. Join the club.
                    </p>
                </div>

                {/* Simplified Tier Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                    {TIERS.map((tier) => (
                        <div key={tier.id} className="relative group transition-all duration-500 hover:scale-110 hover:z-50">

                            {/* Card Visual */}
                            <div className="relative aspect-[3/4] w-full mb-8 rounded-xl overflow-hidden border border-white/5 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] group-hover:border-white/50">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />
                                <img
                                    src={tier.image}
                                    alt={tier.name}
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute bottom-6 left-6 right-6 z-20 space-y-2">
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none group-hover:text-edg-red transition-colors">{tier.name}</h3>
                                    <p className="text-edg-red font-bold text-lg group-hover:text-white transition-colors">{tier.price}</p>
                                    <p className="text-sm text-gray-300 font-medium leading-tight">{tier.summary}</p>
                                </div>
                            </div>

                            {/* Action */}
                            <Link href={tier.ticket ? `/tickets` : `/join?tier=${tier.id}`} className="block">
                                <Button className="w-full font-black italic uppercase tracking-widest text-lg py-8 rounded-full shadow-lg bg-white/10 hover:bg-edg-red text-white transition-colors border border-white/10 group-hover:border-white/30">
                                    {tier.ticket ? 'Buy Tickets' : 'Join Club'}
                                </Button>
                            </Link>

                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
}
