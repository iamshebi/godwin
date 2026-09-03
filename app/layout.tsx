import type { Metadata } from "next";
import "./globals.css";

const SITE = "https://inspiremedia.site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Inspire Media | Photography & Film Production in Dubai, UAE",
    template: "%s | Inspire Media Dubai",
  },
  description:
    "Inspire Media is a Dubai-based photography and film production studio creating fashion, beauty, food, event, product and commercial work across the UAE.",
  keywords: [
    "photography studio Dubai",
    "film production Dubai",
    "video production company Dubai",
    "commercial photographer Dubai",
    "fashion photographer Dubai",
    "food photography Dubai",
    "event videography Dubai",
    "corporate video production UAE",
    "advertising photography Dubai",
    "Sheikh Zayed Road production studio",
  ],
  applicationName: "Inspire Media",
  authors: [{ name: "Inspire Media" }],
  creator: "Inspire Media",
  publisher: "Inspire Media",
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Inspire Media",
    title: "Inspire Media | Photography & Film Production in Dubai, UAE",
    description:
      "Dubai-based photography and film production studio: fashion, beauty, food, events, product and commercial work across the UAE.",
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inspire Media | Photography & Film Production in Dubai",
    description:
      "Dubai-based photography and film production studio: fashion, beauty, food, events, product and commercial work across the UAE.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1 },
  },
  category: "Photography",
  verification: {
    google: "Mmf66KXpRuQTUzL_ykOszroE2Y7LDEh_WMPLk4noU8k",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE}/#organization`,
  name: "Inspire Media",
  description:
    "Photography and film production studio in Dubai, UAE, covering fashion, beauty, food, events, product and commercial work.",
  url: SITE,
  email: "inspiremediasite@gmail.com",
  telephone: "+971544724435",
  image: `${SITE}/opengraph-image.png`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office 2501R, Aspin Tower, Sheikh Zayed Road",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  areaServed: [
    { "@type": "City", name: "Dubai" },
    { "@type": "Country", name: "United Arab Emirates" },
  ],
  knowsAbout: [
    "Automotive photography and film",
    "Brand and commercial films",
    "Corporate event film production",
    "Event photography",
    "Fashion film production",
    "Food and beverage photography",
    "Interior and architectural film",
  ],
  sameAs: ["https://www.instagram.com/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AE">
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />
        {children}
      </body>
    </html>
  );
}
