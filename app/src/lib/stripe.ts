import Stripe from "stripe";

// Lazy initialization to avoid build-time errors
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
    if (!_stripe) {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error("STRIPE_SECRET_KEY is not defined");
        }
        _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            typescript: true,
        });
    }
    return _stripe;
}

export const PLANS = {
    free: {
        name: "Gratis",
        price: 0,
        projectLimit: 3,
        photoLimit: 50,
        features: ["3 proyectos activos", "50 fotos/mes", "Watermark GPS", "Google Drive"],
    },
    pro: {
        name: "Pro",
        price: 9,
        priceId: process.env.STRIPE_PRICE_PRO,
        projectLimit: -1, // Unlimited
        photoLimit: -1,
        features: [
            "Proyectos ilimitados",
            "Fotos ilimitadas",
            "IA naming automático",
            "Modo offline",
            "Soporte prioritario",
        ],
    },
    team: {
        name: "Equipo",
        price: 29,
        priceId: process.env.STRIPE_PRICE_TEAM,
        projectLimit: -1,
        photoLimit: -1,
        userLimit: 5,
        features: [
            "Todo de Pro",
            "5 usuarios incluidos",
            "Dashboard de admin",
            "Reportes PDF",
            "Onboarding dedicado",
        ],
    },
} as const;

export type PlanType = keyof typeof PLANS;

// Check if user can create more projects
export function canCreateProject(plan: PlanType, currentCount: number): boolean {
    const limit = PLANS[plan].projectLimit;
    return limit === -1 || currentCount < limit;
}

// Check if user can take more photos this month
export function canTakePhoto(plan: PlanType, currentCount: number): boolean {
    const limit = PLANS[plan].photoLimit;
    return limit === -1 || currentCount < limit;
}
