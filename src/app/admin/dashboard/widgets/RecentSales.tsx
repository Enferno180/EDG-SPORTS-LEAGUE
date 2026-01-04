import { CurrencyDollar } from '@phosphor-icons/react/dist/ssr';

export default function RecentSales({ orders }: { orders: any[] }) {
    return (
        <div className="bg-[#111] p-6 rounded-xl border border-white/10 h-full">
            <div className="flex items-center gap-2 mb-6">
                <CurrencyDollar className="text-green-500" size={24} weight="fill" />
                <h3 className="text-xl font-bold uppercase italic">Recent Transactions</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="text-gray-500 border-b border-white/10">
                        <tr>
                            <th className="pb-3 pl-2">Customer</th>
                            <th className="pb-3">Type</th>
                            <th className="pb-3 text-right pr-2">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {orders.length === 0 ? (
                            <tr><td colSpan={3} className="py-4 text-center text-gray-500">No orders yet.</td></tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-white/5 transition">
                                    <td className="py-3 pl-2">
                                        <div className="font-bold text-white">{order.guestEmail || order.user?.email || 'Guest'}</div>
                                        <div className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                                    </td>
                                    <td className="py-3">
                                        {/* Simple logic to guess type based on first item, or we could store type on Order */}
                                        <span className="px-2 py-1 bg-white/10 rounded text-xs">{
                                            order.items[0]?.product ? 'Merch' :
                                                order.items[0]?.ticketType ? 'Ticket' : 'Sub'
                                        }</span>
                                    </td>
                                    <td className="py-3 text-right pr-2 font-mono text-green-400">
                                        ${(order.total / 100).toFixed(2)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
