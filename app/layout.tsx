import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sai Asapu — Digital Twin",
  description:
    "Talk to Sai Asapu's Digital Twin to explore work, experience, and tech stack.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#020617] antialiased`}>
        {children}
      </body>
    </html>
  );
}