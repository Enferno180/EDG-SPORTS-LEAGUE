import prisma from '@/lib/prisma';
import EditStatsForm from './EditStatsForm';

export default async function EditStatsPage({ params }: { params: { id: string } }) {
    const player = await prisma.player.findUnique({
        where: { id: params.id }
    });

    if (!player) return <div>Player not found</div>;

    return (
        <div className="p-6 bg-black min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-6">Edit Stats: {player.name}</h1>
            <EditStatsForm player={player} />
        </div>
    );
}
