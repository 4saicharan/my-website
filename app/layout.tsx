import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GoogleAnalytics from "./components/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteTitle = "Sai Charan Asapu — Senior Data Engineer | Chicago, IL";
const siteDescription =
  "Senior Data Engineer with 7 years across healthcare, finance, and enterprise cloud. Snowflake, PySpark, Azure, Kafka, Airflow. Open to contract roles — Chicagoland and remote.";

const ogImage = "https://saiasapu.com/thumbnail.png";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    images: [{ url: ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
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
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${inter.variable} ${inter.className} min-h-screen bg-background font-sans`}>
        {children}
      </body>
    </html>
  );
}
