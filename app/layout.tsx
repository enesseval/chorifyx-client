import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Chorifyx - Tüm Takvimleriniz, Tek Bir Yerde.",
   description: "Kişisel, iş ve freelance takvimlerinizi senkronize edin. Zamanınızı yönetin, verimliliğinizi artırın.",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
      </html>
   );
}
