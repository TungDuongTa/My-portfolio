import type { Metadata } from "next";
import Head from "next/head";
import localFont from "next/font/local";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Navbar from "./components/Navbar";
import { ContainerRefProvider } from "./context/ContainerRefContext";
import { LenisProvider } from "./components/LenisProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tung Duong Ta's portfolio",
  description: "I pay attention to details and love to build things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="portfolio, web developer, Tung Duong Ta, projects, coding"
        />
        <meta name="author" content="Tung Duong Ta" />
        <meta property="og:title" content="Tung Duong Ta's portfolio" />
        <meta
          property="og:description"
          content="I pay attention to details and love to build things."
        />
        <meta property="og:url" content="https://tungduongta.vercel.app/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <title>{String(metadata.title)}</title>
      </Head>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <LenisProvider>
            <ContainerRefProvider>
              <Navbar />
              {children}
            </ContainerRefProvider>
          </LenisProvider>
          <SpeedInsights />
        </body>
      </html>
    </>
  );
}
