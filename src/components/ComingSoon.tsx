import Link from 'next/link';

export default function ComingSoon({ title, description = "We are constructing something legendary." }: { title: string, description?: string }) {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6 bg-grid-white/[0.02]">
            <div className="mb-8 relative">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center animate-pulse">
                    {/* Placeholder for EDG Logo if we had an SVG, for now using stylized text */}
                    <span className="font-head font-black italic text-black text-3xl md:text-4xl tracking-tighter">EDG</span>
                </div>
                <div className="absolute -inset-4 bg-brand-primary/20 blur-xl rounded-full animate-pulse"></div>
            </div>

            <div className="max-w-xl space-y-4">
                <h1 className="text-5xl md:text-7xl font-head font-black uppercase text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 italic tracking-tighter">
                    {title}
                </h1>
                <p className="text-xl text-gray-400 font-sans">
                    {description} <br />
                    <span className="text-brand-primary font-bold">Coming Soon to EDG Sports.</span>
                </p>

                <div className="pt-8">
                    <Link href="/" className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-brand-primary transition-all duration-300">
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
