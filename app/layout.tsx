import type { Metadata } from "next";
import {
  Instrument_Serif,
  Space_Grotesk,
  JetBrains_Mono,
  Inter,
} from "next/font/google";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://strivianacademy.com"),
  title: "Strivian Academy — Real AI systems with Claude",
  description:
    "Free systems built by a software engineer using Claude — not another prompt bro.",
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
      "Real AI systems with Claude. Free skills from a software engineer.",
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
      data-mode="dark"
      className={`${instrument.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
