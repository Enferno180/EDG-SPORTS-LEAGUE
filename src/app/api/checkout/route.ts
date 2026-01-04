import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const formData = await req.formData();
    const productId = formData.get('productId') as string;
    const ticketTypeId = formData.get('ticketTypeId') as string;

    let lineItems = [];
    let metadata = {};

    if (productId) {
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

        lineItems.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name,
                    images: [product.image],
                    metadata: { productId: product.id }
                },
                unit_amount: product.price,
            },
            quantity: 1,
        });
        metadata = { productId: product.id };
    } else if (ticketTypeId) {
        const ticket = await prisma.ticketType.findUnique({ where: { id: ticketTypeId } });
        if (!ticket) return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });

        lineItems.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: ticket.name + ' Ticket',
                    metadata: { ticketTypeId: ticket.id }
                },
                unit_amount: ticket.price,
            },
            quantity: 1,
        });
        metadata = { ticketTypeId: ticket.id };
    }

    if (lineItems.length === 0) {
        return NextResponse.json({ error: 'No items' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/shop`,
        metadata: metadata,
    });

    return NextResponse.redirect(session.url!, 303);
}
