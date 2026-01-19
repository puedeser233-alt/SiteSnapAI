import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sitesnap.ai"),
  title: "SiteSnap AI - Organiza tus fotos de obra automáticamente | Evidencia GPS",
  description: "App para técnicos, instaladores y contratistas. Captura fotos con GPS, organízalas automáticamente en TU Google Drive. Prueba legal instantánea. Desde 9€/mes.",
  keywords: [
    "app fotos obra",
    "gestión fotos instaladores",
    "alternativa CompanyCam español",
    "evidencia visual GPS contratistas",
    "fotos técnicos campo",
    "documentar instalaciones",
    "prueba entrega servicio",
    "app contratistas España",
  ],
  authors: [{ name: "SiteSnap AI" }],
  creator: "SiteSnap AI",
  publisher: "SiteSnap AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://sitesnap.ai",
    siteName: "SiteSnap AI",
    title: "SiteSnap AI - Organiza tus fotos de obra automáticamente",
    description: "Captura fotos con GPS, organízalas en TU Google Drive. Evidencia legal para técnicos. Desde 9€/mes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SiteSnap AI - App para técnicos de campo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SiteSnap AI - Organiza tus fotos de obra automáticamente",
    description: "Captura fotos con GPS, organízalas en TU Google Drive. Desde 9€/mes.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://sitesnap.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "SiteSnap AI",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web, iOS, Android",
              "offers": {
                "@type": "Offer",
                "price": "9",
                "priceCurrency": "EUR",
                "priceValidUntil": "2027-12-31"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "127"
              },
              "description": "App para técnicos e instaladores que organiza fotos de obra automáticamente en tu Google Drive con evidencia GPS.",
              "screenshot": "https://sitesnap.ai/screenshot.png"
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "¿Dónde se guardan mis fotos?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tus fotos se guardan directamente en TU Google Drive o Dropbox. SiteSnap AI nunca almacena tus imágenes en nuestros servidores. Tú mantienes el control total de tus datos."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Puedo usar SiteSnap AI sin conexión?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí. Puedes tomar fotos sin conexión y se subirán automáticamente cuando recuperes la cobertura."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Qué pasa si cancelo mi suscripción?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tus fotos permanecen en tu Google Drive para siempre. A diferencia de otras apps, no pierdes acceso a tu trabajo."
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
