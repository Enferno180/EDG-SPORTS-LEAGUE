
import Link from 'next/link';
import Image from 'next/image';

const ITEMS = [
    { id: 1, name: "EDG Pro Hoodie", price: "$65.00", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop" },
    { id: 2, name: "Court Shorts", price: "$45.00", img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600&auto=format&fit=crop" },
    { id: 3, name: "Elite Socks", price: "$15.00", img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=600&auto=format&fit=crop" },
];

export const ShopPreview = () => {
    return (
        <section className="container mx-auto px-5 mb-20">
            <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-2xl font-head font-black uppercase italic tracking-tighter text-foreground mb-1">THE DROP</h2>
                    <p className="text-sm text-muted-foreground">Official League Merchandise</p>
                </div>
                <Link href="/drop-zone" className="text-xs font-bold text-primary hover:text-white uppercase transition-colors mb-1">
                    Shop All Items →
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ITEMS.map((item) => (
                    <div key={item.id} className="group relative">
                        <div className="aspect-[4/5] bg-zinc-900 rounded-sm overflow-hidden mb-3 relative">
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10"></div>

                            {/* Image */}
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Hover Button */}
                            <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <Link href="/drop-zone" className="btn w-full text-xs py-2 shadow-lg">
                                    VIEW ITEM
                                </Link>
                            </div>
                        </div>
                        <h3 className="font-bold text-base leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.price}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
