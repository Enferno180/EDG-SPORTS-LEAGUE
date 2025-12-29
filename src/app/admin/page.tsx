
export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-head font-black uppercase text-white mb-2">Dashboard</h1>
                    <p className="text-muted-foreground">League Overview & Quick Actions</p>
                </div>
                <button className="btn btn-sm">New Post</button>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Players", value: "320", icon: "users" },
                    { label: "Active Teams", value: "8", icon: "shield" },
                    { label: "Avg. Attendance", value: "85%", icon: "ticket" },
                    { label: "Revenue (YTD)", value: "$12,450", icon: "currency-dollar" }
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

            {/* Recent Activity / Content Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-sm p-6">
                    <h3 className="section-title text-xl mb-6">Recent Registrations</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-secondary/30 rounded border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">{i + 1}</div>
                                    <div>
                                        <div className="font-bold text-sm text-foreground">New Player Application</div>
                                        <div className="text-xs text-muted-foreground">2 minutes ago</div>
                                    </div>
                                </div>
                                <button className="text-xs font-bold text-primary hover:underline">REVIEW</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-card border border-border rounded-sm p-6">
                    <h3 className="section-title text-xl mb-6">System Status</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm p-2">
                            <span className="text-muted-foreground">Database</span>
                            <span className="flex items-center gap-2 text-green-400 font-bold uppercase text-xs"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online</span>
                        </div>
                        <div className="flex justify-between items-center text-sm p-2 border-t border-white/5">
                            <span className="text-muted-foreground">Stripe Payments</span>
                            <span className="flex items-center gap-2 text-green-400 font-bold uppercase text-xs"><span className="w-2 h-2 bg-green-400 rounded-full"></span> Connected</span>
                        </div>
                        <div className="flex justify-between items-center text-sm p-2 border-t border-white/5">
                            <span className="text-muted-foreground">Last Backup</span>
                            <span className="text-white font-mono text-xs">2025-04-12 04:00 AM</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
