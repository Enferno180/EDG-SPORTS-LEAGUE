import prisma from '@/lib/prisma';
import Image from 'next/image';
import { ShoppingCart } from '@phosphor-icons/react/dist/ssr';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
    const products = await prisma.product.findMany({
        where: { active: true }
    });

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
                            Team <span className="text-brand-primary">Store</span>
                        </h1>
                        <p className="text-gray-400 mt-2">Official Merchandise & Gear</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                        <ShoppingCart size={24} />
                        <span className="font-bold">Cart (0)</span>
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.length === 0 ? (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            No products available right now. Check back soon!
                        </div>
                    ) : (
                        products.map((product) => (
                            <div key={product.id} className="group bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-brand-primary/50 transition-all">
                                <div className="relative aspect-square bg-[#1a1a1a] p-4 flex items-center justify-center">
                                    {/* Fallback image if validation fails or empty */}
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="text-xs font-bold text-brand-primary mb-1 uppercase tracking-wider">{product.category}</div>
                                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            {/* <span className="text-2xl font-bold">${(product.price / 100).toFixed(2)}</span> */}
                                            <span className="text-2xl font-bold text-gray-500 line-through">${(product.price / 100).toFixed(2)}</span>
                                            <span className="ml-2 text-brand-primary text-sm font-bold">SOLD OUT</span>
                                        </div>
                                        <button disabled className="px-4 py-2 bg-gray-800 text-gray-400 font-bold uppercase text-sm rounded cursor-not-allowed">
                                            Coming Soon
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
