'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deletePlayer(playerId: string) {
    try {
        await prisma.player.delete({
            where: { id: playerId }
        })
        revalidatePath('/admin/roster')
        return { success: true }
    } catch (error) {
        console.error('Failed to delete player:', error)
        return { success: false, error: 'Failed to delete player' }
    }
}

export async function addPlayer(data: FormData) {
    try {
        const name = data.get('name') as string
        const teamId = data.get('teamId') as string
        const position = data.get('position') as string
        const height = data.get('height') as string

        if (!name || !teamId || !position) {
            return { success: false, error: 'Missing required fields' }
        }

        await prisma.player.create({
            data: {
                name,
                teamId,
                position,
                height: height || "6'0\"", // Default
                weight: "200 lbs", // Default
                ovr: 60, // Default for new signee
            }
        })

        revalidatePath('/admin/roster')
        return { success: true }
    } catch (error) {
        console.error('Failed to add player:', error)
        return { success: false, error: 'Failed to add player' }
    }
}
