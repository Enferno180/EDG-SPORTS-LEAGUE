import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16' as any,
    typescript: true,
});

export const getStripeSession = async (sessionId: string) => {
    return await stripe.checkout.sessions.retrieve(sessionId);
};
