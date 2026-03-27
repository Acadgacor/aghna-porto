import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aghna Ghalie Aminudin | Law Professional & Founder",
  description: "Law Professional & Founder Portfolio of Aghna Ghalie Aminudin",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const resolvedParams = await params;

  return (
    <html
      lang={resolvedParams.lang}
      className={`${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-serif bg-cream text-navy">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
