import { Fraunces, Manrope, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { Suspense } from "react";
import NavigationLoader from "../components/NavigationLoader";
import SiteShell from "../components/components/SiteShell";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const deva = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-deva",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.apollohospitalsjbp.com"),
  title: {
    default: "Apollo Hospitals Jabalpur | Multispeciality Care & Doctors",
    template: "%s | Apollo Hospitals Jabalpur",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Apollo Hospitals Jabalpur | Leading Multispeciality Healthcare",
    description:
      "Apollo Hospitals Jabalpur offers 50+ specialist consultants, 24/7 emergency & trauma care, advanced diagnostics, and online appointment booking.",
    url: "https://www.apollohospitalsjbp.com",
    siteName: "Apollo Hospitals Jabalpur",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/apollologo.webp",
        width: 1200,
        height: 630,
        alt: "Apollo Hospitals Jabalpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apollo Hospitals Jabalpur | Advanced Healthcare",
    description:
      "Leading multispeciality hospital in Jabalpur with 24/7 emergency, expert doctors, and advanced treatments.",
    images: ["/apollologo.webp"],
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
  description:
    "Apollo Hospitals Jabalpur, the leading multispeciality hospital offering expert doctors, advanced treatments, 24/7 emergency care and online appointment booking",
  keywords: [
    "Apollo Hospitals",
    "Book Doctor Appointment",
    "Cardiology",
    "Oncology",
    "Neurology",
    "Emergency Care 1066",
    "Health Checkup",
  ],
  icons: {
    icon: [
      { url: "/apollologo.webp", type: "image/webp" },
      { url: "/images/apollologo.webp", type: "image/webp" },
    ],
    shortcut: "/apollologo.webp",
    apple: "/apollologo.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${fraunces.variable} ${manrope.variable} ${deva.variable} scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/apollologo.webp" type="image/webp" />
        <link rel="shortcut icon" href="/apollologo.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/apollologo.webp" />
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://translate.google.com" />
        <link
          rel="preconnect"
          href="https://translate.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://www.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hospital",
              "@id": "https://www.apollohospitalsjbp.com/#hospital",
              name: "Apollo Hospitals Jabalpur",
              alternateName: [
                "Apollo JBP Hospitals",
                "Apollo Hospital Jabalpur",
              ],
              url: "https://www.apollohospitalsjbp.com",
              logo: "https://www.apollohospitalsjbp.com/apollologo.webp",
              image: "https://www.apollohospitalsjbp.com/apollologo.webp",
              telephone: "+91 761 000 0000",
              emergencyTelephone: "1066",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Global Square, Patan Rd, Karmeta",
                addressLocality: "Jabalpur",
                addressRegion: "Madhya Pradesh",
                postalCode: "482002",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 23.2104,
                longitude: 79.9238,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  opens: "00:00",
                  closes: "23:59",
                },
              ],
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="font-sans bg-[#FAF7F2] text-gray-900 antialiased selection:bg-[#C69A48] selection:text-white"
      >
        <AuthProvider>
          <Suspense fallback={null}>
            <NavigationLoader />
          </Suspense>
          <SiteShell>{children}</SiteShell>
        </AuthProvider>
      </body>
    </html>
  );
}
