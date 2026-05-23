import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import CartButton from "@/components/cart/CartButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voalá — Passagens Aéreas e Combos de Viagem",
  description: "Encontre as melhores passagens aéreas e combos de viagem com preços imbatíveis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} h-full antialiased`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <CartProvider>
          {children}
          <CartDrawer />
          <CartButton />
        </CartProvider>
      </body>
    </html>
  );
}
