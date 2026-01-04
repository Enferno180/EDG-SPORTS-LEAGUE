'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getUsers() {
    return await prisma.user.findMany({
        orderBy: { name: 'asc' },
    });
}

export async function updateUserRole(userId: string, newRole: string) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { role: newRole },
        });
        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        console.error("Failed to update user role:", error);
        return { success: false, error: "Failed to update role" };
    }
}

export async function getRecentOrders() {
    return await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20,
        include: { user: true },
    });
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { status: newStatus },
        });
        revalidatePath('/admin');
        return { success: true };
    } catch (error) {
        console.error("Failed to update order status:", error);
        return { success: false, error: "Failed to update status" };
    }
}
