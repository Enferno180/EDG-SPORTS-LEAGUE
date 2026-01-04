'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updatePlayerStats(playerId: string, data: any) {
    try {
        const gamesPlayed = data.gamesPlayed || 1; // Avoid divide by zero

        // Calculate Averages
        const ppg = parseFloat((data.totalPoints / gamesPlayed).toFixed(1));
        const rpg = parseFloat((data.totalRebounds / gamesPlayed).toFixed(1));
        const apg = parseFloat((data.totalAssists / gamesPlayed).toFixed(1));
        const spg = parseFloat((data.totalSteals / gamesPlayed).toFixed(1));
        const bpg = parseFloat((data.totalBlocks / gamesPlayed).toFixed(1));
        const tov = parseFloat((data.totalTurnovers / gamesPlayed).toFixed(1));

        // Calculate Percentages
        const fgPct = data.fga > 0 ? parseFloat(((data.fgm / data.fga) * 100).toFixed(1)) : 0;
        const threePtPct = data.threePta > 0 ? parseFloat(((data.threePtm / data.threePta) * 100).toFixed(1)) : 0;
        const ftPct = data.fta > 0 ? parseFloat(((data.ftm / data.fta) * 100).toFixed(1)) : 0;

        await prisma.player.update({
            where: { id: playerId },
            data: {
                gamesPlayed: data.gamesPlayed,
                totalPoints: data.totalPoints,
                totalRebounds: data.totalRebounds,
                totalAssists: data.totalAssists,
                totalSteals: data.totalSteals,
                totalBlocks: data.totalBlocks,
                totalTurnovers: data.totalTurnovers,
                fgm: data.fgm, fga: data.fga,
                threePtm: data.threePtm, threePta: data.threePta,
                ftm: data.ftm, fta: data.fta,
                ppg, rpg, apg, spg, bpg, tov,
                fgPct, threePtPct, ftPct
            }
        });

        revalidatePath(`/admin/players/${playerId}/edit-stats`);
        revalidatePath('/admin/roster');
        revalidatePath('/stats/players');

        return { success: true };
    } catch (e: any) {
        console.error(e);
        return { success: false, message: e.message };
    }
}
