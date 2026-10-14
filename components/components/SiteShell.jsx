"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GoogleTranslateLoader } from "./GoogleTranslate";
import ApolloAssistChatbot from "../chatbot/ApolloAssistChatbot";

export default function SiteShell({ children }) {
  const pathname = usePathname();
  // Check if current page is the separate login or logout page
  const isAuthPage = pathname === "/login" || pathname === "/logout";

  if (isAuthPage) {
    // Render the complete standalone page without Navbar, Footer, or Chatbot
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      {/* Loads Google Translate once for the main website */}
      <GoogleTranslateLoader />

      <Navbar />

      <main>{children}</main>

      <Footer />
      <ApolloAssistChatbot />
    </>
  );
}
