import type { Metadata } from "next";
import { Manrope, DM_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ReservationModal from "@/components/ReservationModal";
import { FoodProvider } from "@/context/FoodContext";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "SAVORÉ — Fine Dining & Artisan Gastronomy",
  description:
    "Experience Michelin-grade culinary art, woodfired Wagyu, handmade truffle pasta, and sommelier-curated vintage wines at SAVORÉ.",
  keywords: ["fine dining", "gourmet restaurant", "artisan cuisine", "wagyu steak", "truffle pasta", "michelin dining"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0b0c10] text-[#f5f0e8] font-sans antialiased selection:bg-[#d4af37] selection:text-black">
        <FoodProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <CartDrawer />
          <ReservationModal />
        </FoodProvider>
      </body>
    </html>
  );
}
