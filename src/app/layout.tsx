import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sonali Nayak — Fullstack Developer",
  description: "Portfolio of Sonali Nayak — Fullstack Developer",
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
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
