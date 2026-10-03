import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "../components/components/Navbar";
import Footer from "../components/components/Footer";
import { GoogleTranslateLoader } from "../components/components/GoogleTranslate";

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

export const metadata = {
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
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${fraunces.variable} ${manrope.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body
        suppressHydrationWarning
        className="font-sans bg-[#FAF7F2] text-gray-900 antialiased selection:bg-[#C69A48] selection:text-white"
      >
        {/* Loads Google Translate once for the whole site */}
        <GoogleTranslateLoader />

        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}