import { TEAMS } from '@/lib/data';
import Image from 'next/image';
import { Header } from '@/components/Header';

export default function PowerRankingsPage() {
    // Sort teams by Net Rating (Power Ranking approximation)
    const sortedTeams = [...TEAMS].sort((a, b) => (b.netRating || 0) - (a.netRating || 0));

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <div className="p-8 pb-24">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-12 text-center">
                        <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                            Power Rankings
                        </h1>
                        <p className="text-zinc-400 text-lg">Weekly analysis of the league's top contenders.</p>
                    </header>

                    <div className="space-y-4">
                        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm font-bold text-zinc-500 uppercase tracking-wider">
                            <div className="col-span-1 text-center">Rank</div>
                            <div className="col-span-4">Team</div>
                            <div className="col-span-1 text-center">Rec</div>
                            <div className="col-span-2 text-center">Off Rt</div>
                            <div className="col-span-2 text-center">Def Rt</div>
                            <div className="col-span-2 text-center">Net Rt</div>
                        </div>

                        {sortedTeams.map((team, index) => (
                            <div
                                key={team.name}
                                className="grid grid-cols-12 gap-4 items-center bg-zinc-900/50 border border-white/5 rounded-xl p-6 hover:bg-zinc-900 hover:border-white/10 transition-all duration-300 group"
                            >
                                <div className="col-span-1 text-center">
                                    <span className={`text-2xl font-black ${index < 3 ? 'text-yellow-400' : 'text-zinc-600'}`}>
                                        {index + 1}
                                    </span>
                                </div>

                                <div className="col-span-4 flex items-center gap-4">
                                    <div className="relative w-12 h-12 flex-shrink-0 bg-black rounded-full p-2 border border-white/10">
                                        <Image
                                            src={team.logo}
                                            alt={team.name}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg group-hover:text-white transition-colors">
                                            {team.name}
                                        </h3>
                                        <p className="text-xs text-zinc-500 font-mono">
                                            {team.division}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-span-1 text-center font-mono text-zinc-300">
                                    {team.wins}-{team.losses}
                                </div>

                                <div className="col-span-2 text-center font-mono text-green-400">
                                    {team.offRating.toFixed(1)}
                                </div>

                                <div className="col-span-2 text-center font-mono text-red-400">
                                    {team.defRating.toFixed(1)}
                                </div>

                                <div className="col-span-2 text-center">
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold font-mono ${team.netRating > 0
                                            ? 'bg-green-500/10 text-green-400'
                                            : 'bg-red-500/10 text-red-400'
                                        }`}>
                                        {team.netRating > 0 ? '+' : ''}{team.netRating.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
