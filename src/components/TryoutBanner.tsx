
import Link from 'next/link';

export const TryoutBanner = () => {
    return (
        <section className="container mx-auto px-5 mb-20">
            <div className="relative w-full rounded-sm overflow-hidden h-[400px] border border-white/10 group">
                {/* Background Image (Gym Floor) */}
                <img
                    src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop"
                    alt="Gym Floor"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-2xl">
                    <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 animate-glow">
                        Open Registration • Season 2026
                    </span>
                    <h2 className="text-5xl md:text-7xl font-head font-black text-white italic uppercase leading-[0.9] mb-6 drop-shadow-xl">
                        PROVE IT <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">ON THE COURT</span>
                    </h2>
                    <p className="text-zinc-300 text-lg md:text-xl mb-8 font-medium leading-relaxed">
                        The EDG Sports League Combine is looking for the next breakout star.
                        Do you have what it takes to make the cut?
                    </p>
                    <div className="flex gap-4">
                        <Link href="/tryouts" className="px-8 py-4 bg-primary text-black font-head font-bold text-lg uppercase tracking-wider hover:bg-white shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_40px_rgba(234,88,12,0.6)] transition-all rounded-sm">
                            REGISTER FOR COMBINE
                        </Link>
                        <Link href="/scouting-report" className="px-8 py-4 border border-white text-white font-head font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-colors rounded-sm">
                            VIEW SCOUTING REPORT
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
