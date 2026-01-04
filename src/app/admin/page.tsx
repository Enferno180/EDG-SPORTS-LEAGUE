
import { getUsers, getRecentOrders, updateUserRole, updateOrderStatus } from "./actions";
import { format } from "date-fns";

export default async function AdminDashboard() {
    const [users, orders] = await Promise.all([getUsers(), getRecentOrders()]);

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-head font-black uppercase text-white mb-2">Command Center</h1>
                    <p className="text-muted-foreground">League Overview & Operations</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold uppercase text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-black text-primary">
                        ${orders.reduce((acc: any, o: any) => acc + o.total, 0).toFixed(2)}
                    </p>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Users", value: users.length, icon: "users" },
                    { label: "Pending Orders", value: orders.filter((o: any) => o.status === 'PENDING').length, icon: "shopping-cart" },
                    { label: "Total Orders", value: orders.length, icon: "receipt" },
                    { label: "Revenue (YTD)", value: `$${orders.reduce((acc: any, o: any) => acc + o.total, 0).toFixed(2)}`, icon: "currency-dollar" }
                ].map((stat, i) => (
                    <div key={i} className="bg-card border border-border p-6 rounded-sm shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <i className={`ph-fill ph-${stat.icon} text-6xl text-primary`}></i>
                        </div>
                        <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ORDER MANAGEMENT */}
                <div className="bg-card border border-border rounded-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="section-title text-xl">Recent Orders</h3>
                        <a href="/api/admin/export?type=orders" className="text-xs font-bold uppercase flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded hover:bg-white/20 transition-colors">
                            <i className="ph-bold ph-download-simple"></i> Export CSV
                        </a>
                    </div>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {orders.length === 0 ? (
                            <p className="text-muted-foreground italic">No orders yet.</p>
                        ) : (
                            orders.map((order: any) => {
                                const items = JSON.parse(order.items);
                                return (
                                    <div key={order.id} className="p-4 bg-secondary/30 rounded border border-white/5 flex flex-col gap-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold text-white text-sm">Order #{order.id.slice(-6)}</p>
                                                <p className="text-xs text-muted-foreground">{format(order.createdAt, 'MMM d, yyyy h:mm a')}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${order.status === 'SHIPPED' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="border-t border-white/5 pt-2 mt-1">
                                            {items.map((item: any, idx: number) => (
                                                <div key={idx} className="flex justify-between text-xs">
                                                    <span className="text-white/80">{item.name} {item.sizes && `(${item.sizes})`}</span>
                                                    <span>${item.price}</span>
                                                </div>
                                            ))}
                                            <div className="flex justify-between text-xs font-bold mt-2 pt-2 border-t border-white/5 text-primary">
                                                <span>TOTAL</span>
                                                <span>${order.total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        {order.status === 'PENDING' && (
                                            <form action={async () => {
                                                "use server";
                                                await updateOrderStatus(order.id, 'SHIPPED');
                                            }}>
                                                <button className="w-full mt-2 bg-primary/20 hover:bg-primary/30 text-primary text-xs font-bold py-2 rounded uppercase transition-colors">
                                                    Mark as Shipped
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* USER MANAGEMENT */}
                <div className="bg-card border border-border rounded-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="section-title text-xl">User Management</h3>
                        <a href="/api/admin/export?type=users" className="text-xs font-bold uppercase flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded hover:bg-white/20 transition-colors">
                            <i className="ph-bold ph-download-simple"></i> Export CSV
                        </a>
                    </div>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {users.map((user: any) => (
                            <div key={user.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                                        {user.name?.[0] || 'U'}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-foreground">{user.name || 'Unknown'}</div>
                                        <div className="text-xs text-muted-foreground">{user.email}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-xs font-bold text-white bg-white/10 px-2 py-1 rounded uppercase">
                                        {user.role}
                                    </div>
                                    {user.role !== 'ADMIN' && (
                                        <div className="flex gap-1">
                                            {user.role === 'FAN' && (
                                                <>
                                                    <form action={async () => {
                                                        "use server";
                                                        await updateUserRole(user.id, 'SCOUT');
                                                    }}>
                                                        <button className="text-[10px] bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 px-2 py-1 rounded font-bold uppercase">
                                                            + Scout
                                                        </button>
                                                    </form>
                                                    <form action={async () => {
                                                        "use server";
                                                        await updateUserRole(user.id, 'COACH');
                                                    }}>
                                                        <button className="text-[10px] bg-primary/20 text-primary hover:bg-primary/40 px-2 py-1 rounded font-bold uppercase">
                                                            + Coach
                                                        </button>
                                                    </form>
                                                </>
                                            )}
                                            {user.role !== 'FAN' && (
                                                <form action={async () => {
                                                    "use server";
                                                    await updateUserRole(user.id, 'FAN');
                                                }}>
                                                    <button className="text-[10px] bg-red-500/20 text-red-400 hover:bg-red-500/40 px-2 py-1 rounded font-bold uppercase">
                                                        Demote
                                                    </button>
                                                </form>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
