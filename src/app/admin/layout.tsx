import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
        redirect('/');
    }

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border p-6 flex flex-col">
                <div className="mb-10">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-primary">EDG<span className="text-white">ADMIN</span></h2>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded font-bold uppercase tracking-wider text-sm hover:bg-primary hover:text-black transition-colors">
                        <i className="ph-fill ph-gauge"></i> Dashboard
                    </Link>
                    <Link href="/admin/teams" className="flex items-center gap-3 px-4 py-3 text-muted-foreground rounded font-bold uppercase tracking-wider text-sm hover:bg-white/5 hover:text-white transition-colors">
                        <i className="ph-fill ph-users-three"></i> Teams
                    </Link>
                    <Link href="/admin/players" className="flex items-center gap-3 px-4 py-3 text-muted-foreground rounded font-bold uppercase tracking-wider text-sm hover:bg-white/5 hover:text-white transition-colors">
                        <i className="ph-fill ph-user"></i> Players
                    </Link>
                    <Link href="/admin/schedule" className="flex items-center gap-3 px-4 py-3 text-muted-foreground rounded font-bold uppercase tracking-wider text-sm hover:bg-white/5 hover:text-white transition-colors">
                        <i className="ph-fill ph-calendar"></i> Schedule
                    </Link>
                </nav>

                <div className="pt-6 border-t border-border mt-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-secondary"></div>
                        <div>
                            <div className="text-sm font-bold text-white">{session.user.name}</div>
                            <div className="text-xs text-muted-foreground">{session.user.email}</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
            );
}
