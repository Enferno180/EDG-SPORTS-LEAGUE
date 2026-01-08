
'use server';

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function submitIncidentReport(data: {
    type: string;
    severity: string;
    description: string;
    playerIds: string[];
    gameId?: string;
}) {
    const session = await auth();
    if (!session || !session.user?.id || (session.user?.role !== 'COACH' && session.user?.role !== 'ADMIN')) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.incidentReport.create({
            data: {
                type: data.type,
                severity: data.severity,
                description: data.description,
                status: 'OPEN',
                authorId: session.user.id,
                gameId: data.gameId || null,
                players: {
                    connect: data.playerIds.map(id => ({ id }))
                }
            }
        });

        revalidatePath('/coach');
        return { success: true };
    } catch (e) {
        console.error("Submit Incident Error:", e);
        return { error: "Failed to submit report" };
    }
}

export async function getCoachData() {
    const session = await auth();
    if (!session || (session.user?.role !== 'COACH' && session.user?.role !== 'ADMIN')) {
        return null; // Handle UI redirect if null
    }

    // Mocking "My Team" for now since Users aren't directly linked to Teams in schema yet
    // In a real app, User would have `teamId` or we'd query via connected Player profile
    const allPlayers = await prisma.player.findMany({
        orderBy: { name: 'asc' }
    });

    const recentIncidents = await prisma.incidentReport.findMany({
        where: { authorId: session.user.id },
        orderBy: { createdAt: 'desc' },
        include: { players: true }
    });

    return { allPlayers, recentIncidents };
}
