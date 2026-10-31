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
  title: "Apollo Hospitals | Expert Care for a Healthier Tomorrow",
  description:
    "Apollo Hospitals - Advanced Healthcare, Trusted by Millions, For Every Stage of Life. Book Appointments, Find Doctors, Emergency 24/7 Care & Centres of Excellence.",
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
