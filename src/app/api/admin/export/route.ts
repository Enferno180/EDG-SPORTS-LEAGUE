import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // "users" or "orders"

    let csvContent = "";
    let filename = "";

    if (type === "users") {
        filename = `edg_users_${new Date().toISOString().split('T')[0]}.csv`;
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                // Add subscription plan relation check if needed
                subscriptionPlan: { select: { name: true } }
            }
        });

        // CSV Header
        csvContent = "ID,Name,Email,Role,Subscription\n";

        // CSV Rows
        for (const u of users) {
            // sanitize fields
            const name = (u.name || "").replace(/,/g, " ");
            const sub = (u.subscriptionPlan?.name || "None").replace(/,/g, " ");

            csvContent += `${u.id},${name},${u.email},${u.role},${sub}\n`;
        }

        // CSV Content is ready

    } else if (type === "orders") {
        filename = `edg_orders_${new Date().toISOString().split('T')[0]}.csv`;
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                items: {
                    include: { product: true, ticketType: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        csvContent = "Order ID,Date,Customer Email,Status,Total ($),Items\n";

        for (const o of orders) {
            const date = o.createdAt.toISOString();
            const email = o.guestEmail || o.user?.email || "Guest";
            const total = (o.total / 100).toFixed(2);

            // Summarize items
            const itemSummary = o.items.map(i => {
                const name = i.product?.name || i.ticketType?.name || "Unknown Item";
                return `${i.quantity}x ${name}`;
            }).join(" | ").replace(/,/g, " "); // Remove commas to verify CSV integrity

            csvContent += `${o.id},${date},${email},${o.status},${total},${itemSummary}\n`;
        }
    } else {
        return new NextResponse("Invalid Type", { status: 400 });
    }

    return new NextResponse(csvContent, {
        headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": `attachment; filename="${filename}"`,
        },
    });
}
