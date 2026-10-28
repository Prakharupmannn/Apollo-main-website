"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { GoogleTranslateLoader } from "./GoogleTranslate";
import ApolloAssistChatbot from "../chatbot/ApolloAssistChatbot";

export default function SiteShell({ children }) {
  const pathname = usePathname();

  // Standalone authentication pages
  const isAuthPage =
    pathname === "/login" || pathname === "/logout";

  // Admin pages should not display the public website layout
  const isAdminPage = pathname.startsWith("/admin");

  // Render login, logout, and admin pages without the public shell
  if (isAuthPage || isAdminPage) {
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