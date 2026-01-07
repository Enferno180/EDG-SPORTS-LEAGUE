'use server';

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createGame(data: {
    homeTeamId: string;
    awayTeamId: string;
    quarters: number;
    minutesPerQuarter: number;
}) {
    const session = await auth();
    if (!session || (session.user?.role !== 'SCOREKEEPER' && session.user?.role !== 'ADMIN')) {
        return { error: "Unauthorized" };
    }

    try {
        const game = await prisma.game.create({
            data: {
                homeTeamId: data.homeTeamId,
                awayTeamId: data.awayTeamId,
                quarters: data.quarters,
                minutesPerQuarter: data.minutesPerQuarter,
                scorekeeperId: session.user.id,
                status: 'LIVE',
                currentQuarter: 1,
                gameClock: `${data.minutesPerQuarter}:00`
            }
        });
        return { success: true, gameId: game.id };
    } catch (e) {
        console.error("Create Game Error:", e);
        return { error: "Failed to create game" };
    }
}

export async function finalizeGame(gameId: string, stats: any[], homeScore: number, awayScore: number) {
    const session = await auth();
    if (!session || (session.user?.role !== 'SCOREKEEPER' && session.user?.role !== 'ADMIN')) {
        return { error: "Unauthorized" };
    }

    try {
        // 1. Update Game Status
        await prisma.game.update({
            where: { id: gameId },
            data: {
                status: 'FINAL',
                homeScore,
                awayScore,
                gameClock: '00:00',
                currentQuarter: 4 // or dynamic if OT?
            }
        });

        // 2. Process Player Stats (Existing logic from games/actions adapted)
        // For now, we just log them or assume we update Player totals
        // In a real app, we would create GameStat records.
        // Since we don't have GameStat model in the partial schema seen, 
        // we will update the aggregate Player stats directly.

        for (const stat of stats) {
            // stat is expected to have { playerId, points, ... }
            if (!stat.playerId) continue;

            await prisma.player.update({
                where: { id: stat.playerId },
                data: {
                    gamesPlayed: { increment: 1 },
                    totalPoints: { increment: stat.points || 0 },
                    totalRebounds: { increment: stat.rebounds || 0 },
                    totalAssists: { increment: stat.assists || 0 },
                    totalSteals: { increment: stat.steals || 0 },
                    totalBlocks: { increment: stat.blocks || 0 },
                    totalTurnovers: { increment: stat.turnovers || 0 },

                    // ppg: { divide: [{ add: [{ multiply: ['ppg', 'gamesPlayed'] }, stat.points || 0] }, { add: ['gamesPlayed', 1] }] },
                    // ... simpler approximation for averages would be re-calc, but Prisma atomic ops are limited for averages.
                    // For prototype, just incrementing totals is fine.
                    // Triggering a re-calc function would be better.
                }
            });
        }

        revalidatePath('/scorekeeper');
        revalidatePath('/teams');
        return { success: true };
    } catch (e) {
        console.error("Finalize Game Error:", e);
        return { error: "Failed to finalize game" };
    }
}
