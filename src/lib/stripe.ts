import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeKey
    ? new Stripe(stripeKey, {
        apiVersion: '2023-10-16' as any,
        typescript: true,
    })
    : null;

export const getStripeSession = async (sessionId: string) => {
    if (!stripe) return null;
    return await stripe.checkout.sessions.retrieve(sessionId);
};
