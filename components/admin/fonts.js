import { Cormorant_Garamond, Sora } from "next/font/google";

export const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const numFont = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});