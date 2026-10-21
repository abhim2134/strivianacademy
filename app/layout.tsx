import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://amullapudi.com"),
  title: "Abhi Mullapudi",
  description:
    "Software engineer exploring the use cases of ai agents and unique ways to use them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
