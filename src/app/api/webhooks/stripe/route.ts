import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET || ''
        );
    } catch (err: any) {
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    const session = event.data.object as any;

    if (event.type === 'checkout.session.completed') {

        // 1. Retrieve the session with line items
        const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ['line_items']
        });

        // 2. Create Order in DB
        const order = await prisma.order.create({
            data: {
                stripeSessionId: session.id,
                total: session.amount_total || 0,
                status: 'PAID',
                guestEmail: session.customer_details?.email,
                userId: session.metadata?.userId || null, // Passed from client
            }
        });

        // 3. Create OrderItems
        if (expandedSession.line_items?.data) {
            for (const item of expandedSession.line_items.data) {
                // Metadata on Price object maps to our DB IDs
                const productId = item.price?.metadata?.productId;
                const ticketTypeId = item.price?.metadata?.ticketTypeId;

                await prisma.orderItem.create({
                    data: {
                        orderId: order.id,
                        quantity: item.quantity || 1,
                        priceAtTime: item.amount_total,
                        productId: productId,
                        ticketTypeId: ticketTypeId
                    }
                });
            }
        }
    }

    return new NextResponse('ok', { status: 200 });
}
