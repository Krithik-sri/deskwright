import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://deskwright.tech";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Deskwright \u2014 Computer-Use AI Agents That Drive Your Software",
  description: "Deskwright deploys computer-use AI agents that log in, click, and complete real workflows across your apps. The modern RPA alternative \u2014 no API, no brittle scripts.",
  applicationName: "Deskwright",
  authors: [{ name: "Deskwright" }],
  creator: "Deskwright",
  publisher: "Deskwright",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Deskwright",
    title: "Deskwright \u2014 Computer-Use AI Agents That Drive Your Software",
    description: "Computer-use AI agents that operate your real software \u2014 web, desktop, legacy. No API, no brittle scripts. The modern RPA alternative.",
    images: ["/og.png"],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deskwright \u2014 Computer-Use AI Agents That Drive Your Software",
    description: "Computer-use AI agents that operate your real software \u2014 web, desktop, legacy. No API, no brittle scripts. The modern RPA alternative.",
    images: ["/og.png"],
  },
  icons: { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%237c3aed'/%3E%3Cstop offset='1' stop-color='%23f97316'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='32' height='32' rx='8' fill='url(%23g)'/%3E%3Cpath d='M11 9l12 7-12 7z' fill='white'/%3E%3C/svg%3E" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#7c3aed",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
