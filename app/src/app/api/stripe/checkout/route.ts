import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { priceId, userId, email, successUrl, cancelUrl } = await request.json();

        if (!priceId || !userId || !email) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const stripe = getStripe();

        // Check if user already has a Stripe customer ID
        const { data: profile } = await supabase
            .from("sitesnap_profiles")
            .select("stripe_customer_id")
            .eq("id", userId)
            .single();

        let customerId = profile?.stripe_customer_id;

        // Create new customer if doesn't exist
        if (!customerId) {
            const customer = await stripe.customers.create({
                email,
                metadata: {
                    supabase_user_id: userId,
                },
            });
            customerId = customer.id;

            // Save customer ID to profile
            await supabase
                .from("sitesnap_profiles")
                .update({ stripe_customer_id: customerId })
                .eq("id", userId);
        }

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/?success=true`,
            cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/?canceled=true`,
            subscription_data: {
                metadata: {
                    supabase_user_id: userId,
                },
            },
            allow_promotion_codes: true,
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { error: "Error creating checkout session" },
            { status: 500 }
        );
    }
}
