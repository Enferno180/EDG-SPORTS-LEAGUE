import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TryoutsPage() {
    return (
        <main className="min-h-screen pt-32 pb-12 px-6 bg-black text-white">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Hero */}
                <div className="text-center space-y-6">
                    <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-edg-red to-white">
                        THE COMBINE
                    </h1>
                    <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
                        Showcase your skills. Get evaluated. Earn your spot in the draft.
                    </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Access */}
                    <div className="bg-zinc-900/50 p-8 rounded-xl border border-white/10 space-y-4">
                        <h3 className="text-xl font-bold italic uppercase tracking-wider text-edg-red">Access & Format</h3>
                        <ul className="space-y-3 text-gray-300">
                            <li>• <span className="text-white font-bold">20 Sessions</span> available this summer.</li>
                            <li>• Limited to <span className="text-white font-bold">40 Participants</span> per session.</li>
                            <li>• Full 5v5 Scrimmages & Skill Drills.</li>
                            <li>• Live Streamed & Recorded for Scouting.</li>
                        </ul>
                    </div>

                    {/* Perks */}
                    <div className="bg-zinc-900/50 p-8 rounded-xl border border-white/10 space-y-4">
                        <h3 className="text-xl font-bold italic uppercase tracking-wider text-edg-red">Included Perks</h3>
                        <ul className="space-y-3 text-gray-300">
                            <li>• Official EDG Combine T-Shirt (Keeper).</li>
                            <li>• Water, Gatorade & Snacks provided.</li>
                            <li>• Certified Referee Officiating.</li>
                            <li>• Post-game Stat Packet.</li>
                        </ul>
                    </div>

                    {/* Cost */}
                    <div className="bg-zinc-900/50 p-8 rounded-xl border border-white/10 space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-edg-red blur-3xl opacity-20"></div>
                        <h3 className="text-xl font-bold italic uppercase tracking-wider text-edg-red">Registration</h3>
                        <div className="text-4xl font-black text-white">$75.00</div>
                        <p className="text-gray-400 text-sm">One-time fee covers facility, gear, and media coverage.</p>

                        <Link href="/register" className="block pt-4">
                            <Button className="w-full bg-edg-red hover:bg-red-700 text-white font-bold py-6 text-xl italic uppercase tracking-widest transition-transform hover:scale-105 shadow-xl">
                                Secure Your Spot
                            </Button>
                        </Link>
                    </div>

                </div>

                {/* Media Notice */}
                <div className="text-center bg-white/5 p-8 rounded-xl border border-white/5">
                    <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Media Notice</h3>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm">
                        All combine sessions are broadcast live on EDG Network. By registering, you consent to being filmed and having your likeness used for league promotion and scouting database purposes.
                    </p>
                </div>

            </div>
        </main>
    );
}
