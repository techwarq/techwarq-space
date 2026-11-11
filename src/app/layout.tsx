import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.techwarq.space"),
  title: "Sonali Nayak — Fullstack Developer",
  description: "Portfolio of Sonali Nayak — Fullstack Developer",
  openGraph: {
    title: "Sonali Nayak — Let's work on ambitious things together",
    description: "Fullstack & AI engineer building agents that do real work.",
    url: "/",
    siteName: "techwarq",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonali Nayak — Let's work on ambitious things together",
    description: "Fullstack & AI engineer building agents that do real work.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
