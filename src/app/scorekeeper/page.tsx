
import prisma from '@/lib/prisma';
import ScorekeeperInterface from './ScorekeeperInterface';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ScorekeeperPage() {
    const session = await auth();
    // Middleware protects this, but good to have double check
    if (!session || (session.user?.role !== 'SCOREKEEPER' && session.user?.role !== 'ADMIN')) {
        redirect('/');
    }

    const teams = await prisma.team.findMany({
        include: {
            players: true
        },
        orderBy: {
            name: 'asc'
        }
    });

    return (
        <main className="min-h-screen bg-black">
            <header className="fixed top-0 left-0 right-0 h-16 bg-black border-b border-white/10 z-[100] px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                        <i className="ph-fill ph-user text-white/50"></i>
                    </div>
                    <div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Logged in as</div>
                        <div className="text-sm font-bold text-white">{session.user.name} <span className="text-edg-red text-xs ml-1">({session.user.role})</span></div>
                    </div>
                </div>
                <div className="text-xs font-bold text-gray-600 uppercase">
                    Official Scorekeeper Interface v1.2
                </div>
            </header>

            <div className="pt-16">
                <ScorekeeperInterface teams={teams} />
            </div>
        </main>
    );
}
