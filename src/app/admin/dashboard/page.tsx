import prisma from '@/lib/prisma';
import RevenuePie from './charts/RevenuePie';
import HotItems from './widgets/HotItems';
import RecentSales from './widgets/RecentSales';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
    // 1. Fetch Orders with Items
    const orders = await prisma.order.findMany({
        where: { status: 'PAID' },
        include: {
            items: { include: { product: true, ticketType: true } },
            user: true
        },
        orderBy: { createdAt: 'desc' },
        take: 10
    });

    // 2. Calculate Total Revenue
    const totalRevenue = await prisma.order.aggregate({
        where: { status: 'PAID' },
        _sum: { total: true }
    });

    // 3. Aggregate Revenue by Category (Merch, Tickets, Subs)
    // Note: This matches the "RevenuePie" expectation
    // We fetch all items to aggregate in memory for MVP (Group By in SQLite can be tricky with relations)
    const allItems = await prisma.orderItem.findMany({
        where: { order: { status: 'PAID' } },
        include: { product: true, ticketType: true }
    });

    let revenueBySource = { Merch: 0, Tickets: 0, Subs: 0 };
    let productSales: any = {};

    for (const item of allItems) {
        if (item.productId) {
            revenueBySource.Merch += item.priceAtTime * item.quantity;

            // Track Hot Items
            const pid = item.productId;
            if (!productSales[pid]) {
                productSales[pid] = {
                    name: item.product?.name,
                    category: 'Merch',
                    sold: 0,
                    revenue: 0
                };
            }
            productSales[pid].sold += item.quantity;
            productSales[pid].revenue += item.priceAtTime * item.quantity;

        } else if (item.ticketTypeId) {
            revenueBySource.Tickets += item.priceAtTime * item.quantity;
        } else {
            // Assuming anything else is a Sub/Plan for now if we tracked it that way
            revenueBySource.Subs += item.priceAtTime * item.quantity;
        }
    }

    const pieData = [
        { name: 'Merchandise', value: revenueBySource.Merch },
        { name: 'Tickets', value: revenueBySource.Tickets },
        { name: 'Memberships', value: revenueBySource.Subs },
    ].filter(d => d.value > 0);

    // Get Hot Items Array
    const hotItems = Object.values(productSales).sort((a: any, b: any) => b.sold - a.sold).slice(0, 5);

    return (
        <div className="bg-black min-h-screen text-white p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-black uppercase italic">Financial <span className="text-brand-primary">Dashboard</span></h1>
                <p className="text-gray-400">Real-time revenue analytics and sales tracking.</p>
            </header>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                    <h3 className="text-sm text-gray-500 uppercase">Total Revenue</h3>
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                        ${((totalRevenue._sum.total || 0) / 100).toFixed(2)}
                    </div>
                </div>
                <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                    <h3 className="text-sm text-gray-500 uppercase">Orders</h3>
                    <div className="text-4xl font-bold text-white">{orders.length}</div>
                </div>
                <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                    <h3 className="text-sm text-gray-500 uppercase">Avg. Order Value</h3>
                    <div className="text-4xl font-bold text-blue-400">
                        ${orders.length > 0 ? ((totalRevenue._sum.total || 0) / orders.length / 100).toFixed(2) : '0.00'}
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <div className="bg-[#111] p-6 rounded-xl border border-white/10 lg:col-span-2">
                    <h3 className="text-xl font-bold mb-6">Revenue Breakdown</h3>
                    {pieData.length > 0 ? (
                        <RevenuePie data={pieData} />
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-gray-500">
                            No revenue data available yet.
                        </div>
                    )}
                </div>

                <div className="space-y-8">
                    <HotItems items={hotItems as any[]} />
                    <RecentSales orders={orders} />
                </div>
            </div>
        </div>
    );
}
