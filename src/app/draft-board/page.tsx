import prisma from '@/lib/prisma';
import { ClassifiedInterruption } from '@/components/ClassifiedInterruption';

export const dynamic = 'force-dynamic';

export default async function DraftBoardPage() {
    return (
        <main className="min-h-screen pt-24 pb-12 px-6 bg-black text-white">
            <ClassifiedInterruption title="Big Board Locked" subtitle="Scouting Reports Pending" />
        </main>
    );
}
