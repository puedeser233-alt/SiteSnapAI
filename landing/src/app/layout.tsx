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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sitesnapgps.com"),
  title: "SiteSnap AI - Organize your site photos automatically | GPS Evidence",
  description: "App for technicians, installers and contractors. Capture photos with GPS, organize them automatically in YOUR Google Drive. Instant legal evidence. From $29/month.",
  keywords: [
    "app site photos",
    "installer photo management",
    "CompanyCam alternative",
    "GPS visual evidence contractors",
    "field technician photos",
    "documenting installations",
    "proof of delivery service",
    "contractor app",
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
    locale: "en_US",
    url: "https://sitesnapgps.com",
    siteName: "SiteSnap AI",
    title: "SiteSnap AI - Organize your site photos automatically",
    description: "Capture photos with GPS, organize them in YOUR Google Drive. Legal evidence for technicians. From $29/month.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SiteSnap AI - App for field technicians",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SiteSnap AI - Organize your site photos automatically",
    description: "Capture photos with GPS, organize them in YOUR Google Drive. From $29/month.",
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
    canonical: "https://sitesnapgps.com",
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
              "screenshot": "https://sitesnapgps.com/screenshot.png"
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
