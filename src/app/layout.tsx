"use client"; // This needs to be a client component to use hooks

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Montserrat,
} from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { usePathname } from "next/navigation"; // Import usePathname

const inter = Inter({ subsets: ["latin"] });

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Metadata can't be exported from a client component directly.
// If needed, this should be moved to a parent Server Component or generated dynamically.
// For now, we comment it out to prevent errors, as the main goal is fixing the layout.
// export const metadata: Metadata = {
//   title: "LA FOURCHETTE | Gastronomie",
//   description: "Restaurant gastronomique de prestige",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  const bodyClasses = [
    inter.className,
    playfairDisplay.variable,
    cormorantGaramond.variable,
    montserrat.variable,
    "antialiased",
    isDashboard ? "dashboard-background" : "public-background",
  ].join(" ");

  return (
    <html lang="fr">
      <body className={bodyClasses}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
