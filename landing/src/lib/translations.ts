// Landing Page Translations
// English (default) and Spanish

export const translations = {
    en: {
        // Navigation
        nav: {
            features: "Features",
            howItWorks: "How it Works",
            pricing: "Pricing",
            faq: "FAQ",
            signIn: "Sign In",
            tryFree: "Try Free",
        },
        // Hero
        hero: {
            badge: "Powered by Artificial Intelligence",
            title: "Organize your job site photos.",
            titleHighlight: "Automatically.",
            subtitle: "Capture photos with GPS and irrefutable timestamp. Auto-organized in YOUR Google Drive. Instant legal evidence for technicians.",
            cta: "10 Free Uses",
            ctaSecondary: "See how it works",
            trusted: "Trusted by +500 field technicians",
            scrollHint: "Discover more",
        },
        // Pain Points
        painPoints: {
            label: "THE PROBLEM",
            title: "Sound familiar?",
            subtitle: "67% of field technicians lose more than 2 hours weekly organizing work photos.",
            items: [
                {
                    title: "Camera Roll Chaos",
                    description: "Installation photos mixed with selfies and memes. Finding a specific image is like searching for a needle in a haystack.",
                },
                {
                    title: "Abusive Subscriptions",
                    description: "CompanyCam charges $30/user/month AND stores YOUR photos in THEIR cloud. If you cancel, goodbye to your history.",
                },
                {
                    title: "Disputes Without Proof",
                    description: "'The technician never came' — without verifiable GPS or timestamp, you lose invoices and reputation.",
                },
            ],
        },
        // How It Works
        howItWorks: {
            label: "THE SOLUTION",
            title: "As simple as 1, 2, 3",
            steps: [
                {
                    title: "Capture",
                    description: "Take the photo with the app. GPS, date and time are added automatically.",
                },
                {
                    title: "AI Organizes",
                    description: "AI names the file and classifies it in the correct project folder.",
                },
                {
                    title: "Upload to YOUR Drive",
                    description: "Syncs instantly with your Google Drive or Dropbox. Yours forever.",
                },
            ],
        },
        // Features
        features: {
            label: "FEATURES",
            title: "Everything you need. Nothing more.",
            items: [
                {
                    title: "Automatic GPS Watermark",
                    description: "Coordinates, address, date and time permanently recorded on each photo. Irrefutable proof.",
                },
                {
                    title: "Smart Organization",
                    description: "Select the project before photographing. Everything organizes itself: /Client/Project/Phase/",
                },
                {
                    title: "BYOS: YOUR Storage",
                    description: "Your photos go directly to YOUR Google Drive or Dropbox. No middlemen. No data hostage.",
                },
                {
                    title: "AI that Names Files",
                    description: "'Electrical_Panel_Installed.jpg' instead of 'IMG_4892.jpg'. AI understands what you photograph.",
                },
                {
                    title: "Works Offline",
                    description: "Take photos in basements without coverage. They sync when you get signal back.",
                },
                {
                    title: "Synced Teams",
                    description: "Multiple technicians can document the same project. All centralized, no duplicates.",
                },
            ],
        },
        // Comparison
        comparison: {
            label: "COMPARISON",
            title: "Why SiteSnap AI?",
            headers: {
                feature: "Feature",
                phoneGallery: "Phone Gallery",
            },
            rows: [
                { feature: "Price", competitor1: "$30/month/user", competitor2: "Free", us: "From $29/month" },
                { feature: "Storage", competitor1: "Proprietary (silo)", competitor2: "Your device", us: "YOUR Google Drive" },
                { feature: "Organization", competitor1: "Automatic", competitor2: "Manual ❌", us: "Automatic + AI" },
                { feature: "GPS / Timestamp", competitor1: "✅", competitor2: "Editable ⚠️", us: "✅ Irrefutable" },
                { feature: "Data sovereignty", competitor1: "❌ Lost if you cancel", competitor2: "✅", us: "✅ Always yours" },
            ],
        },
        // Pricing
        pricing: {
            label: "PRICING",
            title: "Simple and transparent",
            subtitle: "No hidden storage costs. No surprises.",
            plans: {
                free: {
                    name: "Free",
                    description: "To try the app",
                    price: "$0",
                    period: "/month",
                    features: ["10 AI uses/month", "3 projects", "GPS Watermark", "Google Drive"],
                    cta: "Start Free",
                },
                pro: {
                    name: "Pro",
                    description: "For professionals",
                    price: "$29",
                    period: "/month",
                    features: ["50 AI uses/month", "Unlimited projects", "AI auto-naming", "Offline mode", "Export to PDF"],
                    cta: "Subscribe",
                },
                team: {
                    name: "Team",
                    description: "Up to 5 users",
                    price: "$79",
                    period: "/month",
                    features: ["100 AI uses/month", "5 users included", "Admin dashboard", "PDF reports", "Dedicated onboarding"],
                    cta: "Subscribe",
                },
            },
            popular: "MOST POPULAR",
        },
        // Testimonials
        testimonials: {
            label: "TESTIMONIALS",
            title: "What our users say",
            items: [
                {
                    name: "Carlos Martinez",
                    role: "Freelance electrician",
                    quote: "I used to lose 3 hours every Friday organizing photos. Now I take them and forget about it. They're all organized in my Drive.",
                },
                {
                    name: "Laura Sanchez",
                    role: "Installation team lead",
                    quote: "A client accused us of never showing up. I sent them the photo with GPS and time. Invoice paid. SiteSnap paid for itself.",
                },
                {
                    name: "Michael A. Ruiz",
                    role: "HVAC technician",
                    quote: "I tried CompanyCam but it was too expensive. Here I pay $29 and my photos are mine forever. No comparison.",
                },
            ],
        },
        // FAQ
        faq: {
            label: "FAQ",
            title: "Frequently asked questions",
            items: [
                {
                    q: "Where are my photos stored?",
                    a: "Your photos are stored directly in YOUR Google Drive or Dropbox. SiteSnap AI never stores your images on our servers. You maintain complete control of your data.",
                },
                {
                    q: "Can I use SiteSnap AI offline?",
                    a: "Yes. You can take photos offline and they will automatically upload when you regain coverage. Perfect for basements, industrial buildings, or rural areas.",
                },
                {
                    q: "What happens if I cancel my subscription?",
                    a: "Your photos remain in your Google Drive forever. Unlike other apps, you don't lose access to your work. It's YOUR storage, not ours.",
                },
                {
                    q: "Is the GPS watermark really irrefutable?",
                    a: "Yes. Coordinates, date and time are permanently recorded on the image at the time of capture. This is accepted as evidence in commercial and legal disputes.",
                },
                {
                    q: "Does it work on iPhone and Android?",
                    a: "Yes. SiteSnap AI is a Progressive Web App (PWA) that works on any modern smartphone, without needing to download anything from the App Store or Play Store.",
                },
            ],
        },
        // Final CTA
        finalCta: {
            title: "Start organizing your photos",
            titleHighlight: "today",
            subtitle: "10 free uses. No credit card. Cancel anytime. Your photos always yours.",
            cta: "Create free account",
            ctaSecondary: "See pricing",
        },
        // Footer
        footer: {
            tagline: "Organize your job site photos automatically. Irrefutable GPS evidence.",
            product: "Product",
            legal: "Legal",
            contact: "Contact",
            privacy: "Privacy",
            terms: "Terms",
            cookies: "Cookies",
            location: "Madrid, Spain",
            copyright: "All rights reserved.",
            madeWith: "Made with 💙 in Spain",
            clickToReveal: "Click to reveal",
        },
    },
    es: {
        // Navigation
        nav: {
            features: "Características",
            howItWorks: "Cómo funciona",
            pricing: "Precios",
            faq: "FAQ",
            signIn: "Iniciar sesión",
            tryFree: "Probar Gratis",
        },
        // Hero
        hero: {
            badge: "Impulsado por Inteligencia Artificial",
            title: "Organiza tus fotos de obra.",
            titleHighlight: "Automáticamente.",
            subtitle: "Captura fotos con GPS y timestamp irrefutable. Auto-organizadas en TU Google Drive. Evidencia legal instantánea para técnicos.",
            cta: "10 Usos Gratis",
            ctaSecondary: "Ver cómo funciona",
            trusted: "Más de +500 técnicos de campo confían en nosotros",
            scrollHint: "Descubre más",
        },
        // Pain Points
        painPoints: {
            label: "EL PROBLEMA",
            title: "¿Te suena familiar?",
            subtitle: "El 67% de los técnicos de campo pierden más de 2 horas semanales organizando fotos de trabajo.",
            items: [
                {
                    title: "El Caos del Carrete",
                    description: "Fotos de instalaciones mezcladas con selfies y memes. Encontrar una imagen específica es buscar una aguja en un pajar.",
                },
                {
                    title: "Suscripciones Abusivas",
                    description: "CompanyCam cobra $30/usuario/mes Y almacena TUS fotos en SU nube. Si cancelas, adiós a tu historial.",
                },
                {
                    title: "Disputas Sin Pruebas",
                    description: "'El técnico nunca vino' — sin GPS ni timestamp verificable, pierdes facturas y reputación.",
                },
            ],
        },
        // How It Works
        howItWorks: {
            label: "LA SOLUCIÓN",
            title: "Tan simple como 1, 2, 3",
            steps: [
                {
                    title: "Captura",
                    description: "Toma la foto con la app. GPS, fecha y hora se añaden automáticamente.",
                },
                {
                    title: "IA Organiza",
                    description: "La IA nombra el archivo y lo clasifica en la carpeta correcta del proyecto.",
                },
                {
                    title: "Sube a TU Drive",
                    description: "Se sincroniza instantáneamente con tu Google Drive o Dropbox. Tuyo para siempre.",
                },
            ],
        },
        // Features
        features: {
            label: "CARACTERÍSTICAS",
            title: "Todo lo que necesitas. Nada más.",
            items: [
                {
                    title: "Watermark GPS Automático",
                    description: "Coordenadas, dirección, fecha y hora grabados permanentemente en cada foto. Prueba irrefutable.",
                },
                {
                    title: "Organización Inteligente",
                    description: "Selecciona el proyecto antes de fotografiar. Todo se ordena solo: /Cliente/Proyecto/Fase/",
                },
                {
                    title: "BYOS: TU Almacenamiento",
                    description: "Tus fotos van directas a TU Google Drive o Dropbox. Sin intermediarios. Sin secuestro de datos.",
                },
                {
                    title: "IA que Nombra Archivos",
                    description: "'Cuadro_Electrico_Instalado.jpg' en vez de 'IMG_4892.jpg'. La IA entiende qué fotografías.",
                },
                {
                    title: "Funciona Sin Conexión",
                    description: "Toma fotos en sótanos sin cobertura. Se sincronizan cuando recuperas señal.",
                },
                {
                    title: "Equipos Sincronizados",
                    description: "Varios técnicos pueden documentar el mismo proyecto. Todo centralizado, sin duplicados.",
                },
            ],
        },
        // Comparison
        comparison: {
            label: "COMPARATIVA",
            title: "¿Por qué SiteSnap AI?",
            headers: {
                feature: "Característica",
                phoneGallery: "Galería móvil",
            },
            rows: [
                { feature: "Precio", competitor1: "$30/mes/usuario", competitor2: "Gratis", us: "Desde 29€/mes" },
                { feature: "Almacenamiento", competitor1: "Propietario (silo)", competitor2: "Tu dispositivo", us: "TU Google Drive" },
                { feature: "Organización", competitor1: "Automática", competitor2: "Manual ❌", us: "Automática + IA" },
                { feature: "GPS / Timestamp", competitor1: "✅", competitor2: "Editable ⚠️", us: "✅ Irrefutable" },
                { feature: "Soberanía de datos", competitor1: "❌ Pierdes al cancelar", competitor2: "✅", us: "✅ Siempre tuyos" },
            ],
        },
        // Pricing
        pricing: {
            label: "PRECIOS",
            title: "Simple y transparente",
            subtitle: "Sin costes ocultos de almacenamiento. Sin sorpresas.",
            plans: {
                free: {
                    name: "Gratis",
                    description: "Para probar la app",
                    price: "0€",
                    period: "/mes",
                    features: ["10 usos IA/mes", "3 proyectos", "Watermark GPS", "Google Drive"],
                    cta: "Empezar Gratis",
                },
                pro: {
                    name: "Pro",
                    description: "Para profesionales",
                    price: "29€",
                    period: "/mes",
                    features: ["50 usos IA/mes", "Proyectos ilimitados", "IA naming automático", "Modo offline", "Exportar a PDF"],
                    cta: "Suscribirse",
                },
                team: {
                    name: "Equipo",
                    description: "Hasta 5 usuarios",
                    price: "79€",
                    period: "/mes",
                    features: ["100 usos IA/mes", "5 usuarios incluidos", "Dashboard de admin", "Reportes PDF", "Onboarding dedicado"],
                    cta: "Suscribirse",
                },
            },
            popular: "MÁS POPULAR",
        },
        // Testimonials
        testimonials: {
            label: "TESTIMONIOS",
            title: "Lo que dicen nuestros usuarios",
            items: [
                {
                    name: "Carlos Martínez",
                    role: "Electricista autónomo",
                    quote: "Antes perdía 3 horas cada viernes organizando fotos. Ahora las tomo y me olvido. Están todas ordenadas en mi Drive.",
                },
                {
                    name: "Laura Sánchez",
                    role: "Jefa de equipo instalaciones",
                    quote: "Un cliente nos acusó de no haber ido a su casa. Le envié la foto con GPS y hora. Factura cobrada. SiteSnap se pagó solo.",
                },
                {
                    name: "Miguel Ángel Ruiz",
                    role: "Técnico climatización",
                    quote: "Probé CompanyCam pero era carísimo. Aquí pago 29€ y encima las fotos son mías para siempre. Sin comparación.",
                },
            ],
        },
        // FAQ
        faq: {
            label: "FAQ",
            title: "Preguntas frecuentes",
            items: [
                {
                    q: "¿Dónde se guardan mis fotos?",
                    a: "Tus fotos se guardan directamente en TU Google Drive o Dropbox. SiteSnap AI nunca almacena tus imágenes en nuestros servidores. Tú mantienes el control total de tus datos.",
                },
                {
                    q: "¿Puedo usar SiteSnap AI sin conexión?",
                    a: "Sí. Puedes tomar fotos sin conexión y se subirán automáticamente cuando recuperes la cobertura. Perfecto para sótanos, naves industriales o zonas rurales.",
                },
                {
                    q: "¿Qué pasa si cancelo mi suscripción?",
                    a: "Tus fotos permanecen en tu Google Drive para siempre. A diferencia de otras apps, no pierdes acceso a tu trabajo. Es TU almacenamiento, no el nuestro.",
                },
                {
                    q: "¿El watermark GPS es realmente irrefutable?",
                    a: "Sí. Las coordenadas, fecha y hora se graban permanentemente en la imagen en el momento de la captura. Esto es admitido como evidencia en disputas comerciales y legales.",
                },
                {
                    q: "¿Funciona en iPhone y Android?",
                    a: "Sí. SiteSnap AI es una Progressive Web App (PWA) que funciona en cualquier smartphone moderno, sin necesidad de descargar nada de la App Store o Play Store.",
                },
            ],
        },
        // Final CTA
        finalCta: {
            title: "Empieza a organizar tus fotos",
            titleHighlight: "hoy mismo",
            subtitle: "10 usos gratis. Sin tarjeta. Cancela cuando quieras. Tus fotos siempre tuyas.",
            cta: "Crear cuenta gratis",
            ctaSecondary: "Ver precios",
        },
        // Footer
        footer: {
            tagline: "Organiza tus fotos de obra automáticamente. Evidencia GPS irrefutable.",
            product: "Producto",
            legal: "Legal",
            contact: "Contacto",
            privacy: "Privacidad",
            terms: "Términos",
            cookies: "Cookies",
            location: "Madrid, España",
            copyright: "Todos los derechos reservados.",
            madeWith: "Hecho con 💙 en España",
            clickToReveal: "Clic para revelar",
        },
    },
};

export type Language = 'en' | 'es';
export type Translations = typeof translations.en;
