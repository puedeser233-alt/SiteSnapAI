import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature")!;

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    const stripe = getStripe();
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                const userId = session.metadata?.supabase_user_id ||
                    (session.subscription as Stripe.Subscription)?.metadata?.supabase_user_id;

                if (userId && session.subscription) {
                    const subscription = await stripe.subscriptions.retrieve(
                        session.subscription as string
                    );

                    const priceId = subscription.items.data[0].price.id;
                    const plan = priceId === process.env.STRIPE_PRICE_TEAM ? "team" : "pro";

                    await supabase
                        .from("sitesnap_profiles")
                        .update({
                            plan,
                            stripe_subscription_id: subscription.id,
                        })
                        .eq("id", userId);

                    console.log(`User ${userId} upgraded to ${plan}`);
                }
                break;
            }

            case "customer.subscription.updated": {
                const subscription = event.data.object as Stripe.Subscription;
                const userId = subscription.metadata?.supabase_user_id;

                if (userId) {
                    const priceId = subscription.items.data[0].price.id;
                    const plan = priceId === process.env.STRIPE_PRICE_TEAM ? "team" : "pro";
                    const status = subscription.status;

                    if (status === "active") {
                        await supabase
                            .from("sitesnap_profiles")
                            .update({ plan })
                            .eq("id", userId);
                    }
                }
                break;
            }

            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;
                const userId = subscription.metadata?.supabase_user_id;

                if (userId) {
                    await supabase
                        .from("sitesnap_profiles")
                        .update({
                            plan: "free",
                            stripe_subscription_id: null,
                        })
                        .eq("id", userId);

                    console.log(`User ${userId} downgraded to free`);
                }
                break;
            }

            case "invoice.payment_failed": {
                const invoice = event.data.object as Stripe.Invoice;
                console.log(`Payment failed for invoice ${invoice.id}`);
                break;
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook handler error:", error);
        return NextResponse.json(
            { error: "Webhook handler failed" },
            { status: 500 }
        );
    }
}
