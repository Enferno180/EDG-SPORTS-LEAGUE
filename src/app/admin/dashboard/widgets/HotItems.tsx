import { Fire } from '@phosphor-icons/react/dist/ssr';

export default function HotItems({ items }: { items: any[] }) {
    return (
        <div className="bg-[#111] p-6 rounded-xl border border-white/10 h-full">
            <div className="flex items-center gap-2 mb-6">
                <Fire className="text-orange-500" size={24} weight="fill" />
                <h3 className="text-xl font-bold uppercase italic">Hot Items</h3>
            </div>

            <div className="space-y-4">
                {items.length === 0 ? (
                    <p className="text-gray-500">No sales data yet.</p>
                ) : (
                    items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 hover:bg-white/5 p-2 rounded transition">
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-gray-500 text-sm">#{i + 1}</span>
                                <div>
                                    <div className="font-bold">{item.name}</div>
                                    <div className="text-xs text-gray-400">{item.category}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-brand-primary">{item.sold} Sold</div>
                                <div className="text-xs text-gray-500">${(item.revenue / 100).toFixed(0)} Rev</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
