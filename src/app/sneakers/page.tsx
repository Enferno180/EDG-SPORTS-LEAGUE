export default function Sneakers() {
    return (
        <div className="bg-background min-h-screen text-foreground font-body">
            <div className="container mx-auto px-5 py-12">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-head font-black uppercase text-primary mb-4 italic">SNEAKER WATCH</h1>
                    <p className="text-xl md:text-2xl font-bold max-w-2xl mx-auto text-muted-foreground">
                        WE DON'T MAKE 'EM. WE JUST ROCK 'EM.
                    </p>
                    <p className="mt-4 text-white/70 max-w-3xl mx-auto">
                        At EDG Sports, we're fans first. Check out the latest drops, rumors, and release dates from the pillars of the sneaker community.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* 23isBack */}
                    <a href="https://23isback.com" target="_blank" rel="noopener noreferrer" className="bg-card border border-border rounded-sm p-8 flex flex-col items-center text-center hover:border-primary transition-colors group">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black font-black text-2xl mb-6 group-hover:bg-primary transition-colors">23</div>
                        <h2 className="text-2xl font-head font-bold uppercase mb-2 group-hover:text-primary transition-colors">23 Is Back</h2>
                        <p className="text-sm text-muted-foreground mb-4">The ultimate source for Air Jordan release dates and history.</p>
                        <span className="text-primary text-xs font-bold uppercase tracking-wider group-hover:underline">Visit Site &rarr;</span>
                    </a>

                    {/* KicksOnFire */}
                    <a href="https://www.kicksonfire.com" target="_blank" rel="noopener noreferrer" className="bg-card border border-border rounded-sm p-8 flex flex-col items-center text-center hover:border-primary transition-colors group">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black font-black text-2xl mb-6 group-hover:bg-primary transition-colors">🔥</div>
                        <h2 className="text-2xl font-head font-bold uppercase mb-2 group-hover:text-primary transition-colors">Kicks On Fire</h2>
                        <p className="text-sm text-muted-foreground mb-4">News, release dates, and culture for every sneakerhead.</p>
                        <span className="text-primary text-xs font-bold uppercase tracking-wider group-hover:underline">Visit Site &rarr;</span>
                    </a>

                    {/* JD Sports */}
                    <a href="https://www.jdsports.com" target="_blank" rel="noopener noreferrer" className="bg-card border border-border rounded-sm p-8 flex flex-col items-center text-center hover:border-primary transition-colors group">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black font-black text-2xl mb-6 group-hover:bg-primary transition-colors">JD</div>
                        <h2 className="text-2xl font-head font-bold uppercase mb-2 group-hover:text-primary transition-colors">JD Sports</h2>
                        <p className="text-sm text-muted-foreground mb-4">Global retailer for sports fashion and exclusive drops.</p>
                        <span className="text-primary text-xs font-bold uppercase tracking-wider group-hover:underline">Shop Now &rarr;</span>
                    </a>
                </div>

                <div className="mt-16 border-t border-border pt-12">
                    <h3 className="text-2xl font-head font-bold uppercase mb-6 text-center">LATEST ON COURT HEAT</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square bg-secondary rounded-sm overflow-hidden relative group">
                                <img src={`https://images.unsplash.com/photo-${['1549298916-b41d501d3772', '1606107557195-0e29a4b5b4aa', '1595950653106-6c9ebd614d3a', '1560769625-25f6f331d46b'][i - 1]}?q=80&w=400&auto=format&fit=crop`} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" alt="Kicks" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
