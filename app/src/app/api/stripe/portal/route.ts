import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { userId } = await request.json();

        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const stripe = getStripe();

        // Get user's Stripe customer ID
        const { data: profile } = await supabase
            .from("sitesnap_profiles")
            .select("stripe_customer_id")
            .eq("id", userId)
            .single();

        if (!profile?.stripe_customer_id) {
            return NextResponse.json(
                { error: "No Stripe customer found" },
                { status: 404 }
            );
        }

        // Create billing portal session
        const session = await stripe.billingPortal.sessions.create({
            customer: profile.stripe_customer_id,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Portal error:", error);
        return NextResponse.json(
            { error: "Error creating portal session" },
            { status: 500 }
        );
    }
}
