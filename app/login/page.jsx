import React from "react";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Hospital Portal Sign In | Apollo JBP Hospitals Jabalpur",
  description:
    "Secure digital access for patients, consultants, and clinical staff of Apollo JBP Hospitals Jabalpur. Access medical reports, appointments, and care history.",
};

export default function LoginPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      <LoginForm />
    </div>
  );
}