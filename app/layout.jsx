import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
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
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} scroll-smooth`}>
      <body className="font-sans bg-[#FAF7F2] text-gray-900 antialiased selection:bg-[#C69A48] selection:text-white">
        <Navbar />
        {children}
        
      </body>
    </html>
  );
}