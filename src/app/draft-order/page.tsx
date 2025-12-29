import { TEAMS } from '@/lib/data';
import Image from 'next/image';

export default function DraftOrderPage() {
    // Sort teams by losses descending (worst records first)
    // Draft lottery logic is complex, for now we just do strict reverse standings
    const sortedTeams = [...TEAMS].sort((a, b) => b.losses - a.losses);

    return (
        <main className="min-h-screen pt-32 pb-12 px-6 bg-black text-white">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-5xl font-black italic tracking-tighter uppercase text-white mb-2">
                        Draft Order
                    </h1>
                    <p className="text-gray-400 text-xl font-light">
                        Projected 2026 First Round Order
                    </p>
                </div>

                <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-12 bg-white/5 py-4 px-6 text-xs font-bold uppercase text-gray-500 tracking-wider">
                        <div className="col-span-2">Pick</div>
                        <div className="col-span-6">Team</div>
                        <div className="col-span-2 text-right">Record</div>
                        <div className="col-span-2 text-right">Win %</div>
                    </div>
                    {sortedTeams.map((team, index) => {
                        const winPct = (team.wins / (team.wins + team.losses)).toFixed(3);
                        return (
                            <div key={team.name} className="grid grid-cols-12 py-4 px-6 border-t border-white/5 items-center hover:bg-white/5 transition-colors group">
                                <div className="col-span-2 font-black text-2xl text-edg-red italic">
                                    #{index + 1}
                                </div>
                                <div className="col-span-6 flex items-center gap-4">
                                    <div className="relative w-10 h-10">
                                        <Image src={team.logo} alt={team.name} fill className="object-contain" />
                                    </div>
                                    <span className="font-bold text-lg group-hover:text-edg-red transition-colors">{team.name}</span>
                                </div>
                                <div className="col-span-2 text-right font-mono text-gray-400">
                                    {team.wins}-{team.losses}
                                </div>
                                <div className="col-span-2 text-right font-mono text-gray-500">
                                    {winPct}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <p className="mt-4 text-xs text-gray-600 text-center uppercase tracking-widest">
                    *Order based on current win percentages. Lottery not simulated.
                </p>
            </div>
        </main>
    );
}
