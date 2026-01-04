import { TEAMS } from '@/lib/data';
import Image from 'next/image';


export default function PowerRankingsPage() {
    // Sort teams by Net Rating (Power Ranking approximation)
    const sortedTeams = [...TEAMS].sort((a, b) => (b.netRating || 0) - (a.netRating || 0));

    return (
        <div className="min-h-screen bg-black text-white">

            <div className="p-8 pb-24">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-12 text-center relative">
                        <div className="relative inline-block">
                            {/* EKG LINE SVG OVERLAY */}
                            <svg className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 overflow-visible pointer-events-none z-10 opacity-80" viewBox="0 0 600 100" preserveAspectRatio="none">
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <path
                                    d="M0,50 L100,50 L120,20 L140,80 L160,20 L180,80 L200,50 L600,50"
                                    fill="none"
                                    stroke="#FDB927"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    filter="url(#glow)"
                                    className="animate-ekg"
                                />
                            </svg>

                            <h1 className="text-6xl md:text-8xl font-black mb-4 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 animate-glow relative z-0">
                                Power Rankings
                            </h1>
                        </div>
                        <p className="text-zinc-400 text-lg font-bold tracking-widest uppercase">Weekly Pulse of the League</p>
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

                        {sortedTeams.map((team, index) => {
                            // Determine Health/Status based on rank
                            let ekgColor = '#FDB927'; // Gold (Healthy)
                            let pulseSpeed = '3s';    // Slow/Calm

                            if (index >= 12) {
                                ekgColor = '#ef4444'; // Red (Critical)
                                pulseSpeed = '0.8s';  // Tachycardia
                            } else if (index >= 5) {
                                ekgColor = '#f97316'; // Orange (Caution)
                                pulseSpeed = '1.5s';  // Elevated
                            }

                            return (
                                <div
                                    key={team.name}
                                    className="grid grid-cols-12 gap-4 items-center bg-zinc-900/50 border border-white/5 rounded-xl p-6 hover:bg-zinc-900 hover:border-white/10 transition-all duration-300 group relative overflow-hidden"
                                >
                                    {/* ROW BACKGROUND EKG */}
                                    <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
                                        <svg className="w-full h-full" preserveAspectRatio="none">
                                            <path
                                                d="M0,50 L50,50 L60,20 L70,80 L80,50 L1000,50"
                                                fill="none"
                                                stroke={ekgColor}
                                                strokeWidth="2"
                                                vectorEffect="non-scaling-stroke"
                                                className="animate-ekg-row"
                                                style={{ animationDuration: pulseSpeed }}
                                            />
                                        </svg>
                                    </div>

                                    <div className="col-span-1 text-center relative z-10">
                                        <span className={`text-2xl font-black ${index < 3 ? 'text-yellow-400' : 'text-zinc-600'}`}>
                                            {index + 1}
                                        </span>
                                    </div>

                                    <div className="col-span-4 flex items-center gap-4 relative z-10">
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

                                    <div className="col-span-1 text-center font-mono text-zinc-300 relative z-10">
                                        {team.wins}-{team.losses}
                                    </div>

                                    <div className="col-span-2 text-center font-mono text-green-400 relative z-10">
                                        {team.offRating.toFixed(1)}
                                    </div>

                                    <div className="col-span-2 text-center font-mono text-red-400 relative z-10">
                                        {team.defRating.toFixed(1)}
                                    </div>

                                    <div className="col-span-2 text-center relative z-10">
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold font-mono ${team.netRating > 0
                                            ? 'bg-green-500/10 text-green-400'
                                            : 'bg-red-500/10 text-red-400'
                                            }`}>
                                            {team.netRating > 0 ? '+' : ''}{team.netRating.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
