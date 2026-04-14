import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
});

const interTight = Inter_Tight({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://strivianacademy.com"),
  title: "Strivian Academy — Real AI systems with Claude",
  description:
    "Free Claude skills, automations, and workflows built by a software engineer — not another prompt bro.",
  openGraph: {
    title: "Strivian Academy",
    description:
      "Real AI systems with Claude. Free skills from a software engineer.",
    type: "website",
    url: "https://strivianacademy.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Strivian Academy",
    description:
      "Learn to build real AI systems with Claude. Free skills from a software engineer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-dvh bg-ink text-bone antialiased selection:bg-acid selection:text-ink">
        {children}
      </body>
    </html>
  );
}
