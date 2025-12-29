'use server';

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function markAttendance(playerId: string, status: 'ON_TIME' | 'LATE' | 'NO_SHOW') {
    const session = await auth();
    if (!session || session.user?.role !== 'COACH' && session.user?.role !== 'ADMIN') {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.attendance.create({
            data: {
                playerId,
                status,
                date: new Date()
            }
        });
        revalidatePath('/coach');
        return { success: true };
    } catch (error) {
        console.error("Attendance Error:", error);
        return { error: "Failed to mark attendance" };
    }
}

export async function addScoutingNote(playerId: string, content: string) {
    const session = await auth();
    if (!session || (!session.user?.role?.includes('COACH') && session.user?.role !== 'ADMIN')) {
        return { error: "Unauthorized" };
    }

    // Check if role is COACH or ADMIN (The check above was a bit weird, simplifying)
    const role = session.user?.role;
    if (role !== 'COACH' && role !== 'ADMIN') {
        return { error: "Unauthorized" };
    }

    if (!session.user?.id) return { error: "User ID not found" };

    try {
        await prisma.scoutingNote.create({
            data: {
                content,
                playerId: playerId,
                authorId: session.user.id
            }
        });
        revalidatePath('/coach');
        return { success: true };
    } catch (error) {
        console.error("Note Error:", error);
        return { error: "Failed to add note" };
    }
}
