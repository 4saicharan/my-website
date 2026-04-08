import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteDescription =
  "Explore the interactive AI Digital Twin of Sai Asapu, a Senior Data Engineer with 7+ years of experience. Interview my AI assistant 24/7 and download my resume.";

const ogImage = "https://saiasapu.com/thumbnail.png";

export const metadata: Metadata = {
  title: "Sai Asapu — Digital Twin Portfolio",
  description: siteDescription,
  openGraph: {
    title: "Sai Asapu — Digital Twin Portfolio",
    description: siteDescription,
    images: [{ url: ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Asapu — Digital Twin Portfolio",
    description: siteDescription,
    images: [ogImage],
  },
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