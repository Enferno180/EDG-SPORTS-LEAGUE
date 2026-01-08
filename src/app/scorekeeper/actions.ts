
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

// THE ARBITER: Records every action safely
export async function recordEvent(gameId: string, eventData: {
    type: string; // POINT, FOUL, SUB, TIMEOUT, PERIOD_START, PERIOD_END, GAME_END
    period: string;
    gameClock?: string;
    teamId?: string;
    playerId?: string;
    value?: number; // e.g. 2, 3, 1 (points) OR 1 (foul count)
    metadata?: any;
}) {
    const session = await auth();
    if (!session || (session.user?.role !== 'SCOREKEEPER' && session.user?.role !== 'ADMIN')) {
        return { error: "Unauthorized" };
    }

    try {
        // 1. Log the Immutable Event
        await prisma.gameEvent.create({
            data: {
                gameId,
                type: eventData.type,
                period: eventData.period,
                gameClock: eventData.gameClock || "00:00",
                teamId: eventData.teamId,
                playerId: eventData.playerId,
                value: eventData.value || 0,
                metadata: eventData.metadata || {},
                authorId: session.user.id
            }
        });

        // 2. Update Live Game State (Atomic increments)
        // This ensures if two scorekeepers spam buttons, DB handles the math.

        // Handling Score Updates
        if (eventData.type === 'POINT' && eventData.teamId && eventData.value) {
            const isHome = (await prisma.game.findUnique({ where: { id: gameId } }))?.homeTeamId === eventData.teamId;

            await prisma.game.update({
                where: { id: gameId },
                data: {
                    [isHome ? 'homeScore' : 'awayScore']: { increment: eventData.value }
                }
            });

            // Update Player Stats if player is attached
            if (eventData.playerId) {
                // Determine stat fields to increment based on value
                // Helper logic: point value tells us FGM/3PM/FTM loosely? 
                // Better to pass explicit "statType" in metadata for precision.
                const statType = eventData.metadata?.statType; // 'FGM', '3PM', 'FTM'

                const updateData: any = {
                    totalPoints: { increment: eventData.value }
                    // Update specific shooting stats if provided
                };

                if (statType === 'FGM') { updateData.fgm = { increment: 1 }; updateData.fga = { increment: 1 }; }
                else if (statType === '3PM') { updateData.threePtm = { increment: 1 }; updateData.threePta = { increment: 1 }; updateData.fgm = { increment: 1 }; updateData.fga = { increment: 1 }; } // 3PM counts as FGM too
                else if (statType === 'FTM') { updateData.ftm = { increment: 1 }; updateData.fta = { increment: 1 }; }

                await prisma.player.update({
                    where: { id: eventData.playerId },
                    data: updateData
                });
            }
        }

        // Handling Other Stats (Rebounds, Assists, etc.)
        if (eventData.type === 'STAT' && eventData.playerId && eventData.metadata?.statType) {
            const statKey = eventData.metadata.statType; // 'REB', 'AST', 'STL', 'BLK', 'TOV'
            const map: any = {
                'REB': 'totalRebounds',
                'AST': 'totalAssists',
                'STL': 'totalSteals',
                'BLK': 'totalBlocks',
                'TOV': 'totalTurnovers'
            };

            if (map[statKey]) {
                await prisma.player.update({
                    where: { id: eventData.playerId },
                    data: { [map[statKey]]: { increment: 1 } }
                });
            }
        }

        revalidatePath(`/scorekeeper`); // Refresh UI
        return { success: true };
    } catch (e) {
        console.error("Record Event Error:", e);
        return { error: "Failed to record event" };
    }
}

// Fetch Game State (for sync)
export async function getGameState(gameId: string) {
    const game = await prisma.game.findUnique({
        where: { id: gameId },
        include: {
            homeTeam: { include: { players: true } },
            awayTeam: { include: { players: true } },
            events: { orderBy: { createdAt: 'desc' }, take: 50 } // Latest 50 events for log
        }
    });
    return game;
}
