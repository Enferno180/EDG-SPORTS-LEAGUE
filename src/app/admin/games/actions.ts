'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

type GameStatLine = {
    playerName: string;
    points: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    turnovers: number;
    fgm: number;
    fga: number;
    threePtm: number;
    threePta: number;
    ftm: number;
    fta: number;
};

export async function processGameUpload(gameDataJson: string) {
    let stats: GameStatLine[] = [];
    try {
        stats = JSON.parse(gameDataJson);
    } catch (e) {
        return { success: false, message: "Invalid JSON format." };
    }

    if (!Array.isArray(stats)) {
        return { success: false, message: "Data must be an array of player stats." };
    }

    let updatedCount = 0;
    let errors: string[] = [];

    try {
        for (const line of stats) {
            // Find player by name (exact match for now, or handle casing manually if needed)
            // Note: SQLite doesn't natively support mode: 'insensitive' in all Prisma versions without lower() workaround.
            // For simplicity and stability, we'll iterate or use exact match since names should be consistent.
            const player = await prisma.player.findFirst({
                where: {
                    name: { equals: line.playerName }
                }
            });

            if (!player) {
                errors.push(`Player not found: ${line.playerName}`);
                continue;
            }

            // Calculate new totals
            const newTotalPoints = (player.totalPoints || 0) + (line.points || 0);
            const newTotalRebounds = (player.totalRebounds || 0) + (line.rebounds || 0);
            const newTotalAssists = (player.totalAssists || 0) + (line.assists || 0);
            const newTotalSteals = (player.totalSteals || 0) + (line.steals || 0);
            const newTotalBlocks = (player.totalBlocks || 0) + (line.blocks || 0);
            const newTotalTurnovers = (player.totalTurnovers || 0) + (line.turnovers || 0);

            const newFgm = (player.fgm || 0) + (line.fgm || 0);
            const newFga = (player.fga || 0) + (line.fga || 0);
            const newThreePtm = (player.threePtm || 0) + (line.threePtm || 0);
            const newThreePta = (player.threePta || 0) + (line.threePta || 0);
            const newFtm = (player.ftm || 0) + (line.ftm || 0);
            const newFta = (player.fta || 0) + (line.fta || 0);

            const newGamesPlayed = (player.gamesPlayed || 0) + 1;

            // Calculate new averages
            const ppg = parseFloat((newTotalPoints / newGamesPlayed).toFixed(1));
            const rpg = parseFloat((newTotalRebounds / newGamesPlayed).toFixed(1));
            const apg = parseFloat((newTotalAssists / newGamesPlayed).toFixed(1));
            const spg = parseFloat((newTotalSteals / newGamesPlayed).toFixed(1));
            const bpg = parseFloat((newTotalBlocks / newGamesPlayed).toFixed(1));
            const tov = parseFloat((newTotalTurnovers / newGamesPlayed).toFixed(1));

            // Calculate Percentages
            const fgPct = newFga > 0 ? parseFloat(((newFgm / newFga) * 100).toFixed(1)) : 0;
            const threePtPct = newThreePta > 0 ? parseFloat(((newThreePtm / newThreePta) * 100).toFixed(1)) : 0;
            const ftPct = newFta > 0 ? parseFloat(((newFtm / newFta) * 100).toFixed(1)) : 0;

            await prisma.player.update({
                where: { id: player.id },
                data: {
                    gamesPlayed: newGamesPlayed,
                    totalPoints: newTotalPoints,
                    totalRebounds: newTotalRebounds,
                    totalAssists: newTotalAssists,
                    totalSteals: newTotalSteals,
                    totalBlocks: newTotalBlocks,
                    totalTurnovers: newTotalTurnovers,
                    fgm: newFgm, fga: newFga,
                    threePtm: newThreePtm, threePta: newThreePta,
                    ftm: newFtm, fta: newFta,
                    ppg, rpg, apg, spg, bpg, tov,
                    fgPct, threePtPct, ftPct
                }
            });

            updatedCount++;
        }

        revalidatePath('/stats/players');
        revalidatePath('/admin');
    } catch (e: any) {
        console.error("Error processing game upload:", e);
        return { success: false, message: `Server Error: ${e.message}`, errors };
    }

    return {
        success: true,
        message: `Processed ${updatedCount} players.`,
        errors: errors.length > 0 ? errors : undefined
    };
}
