import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/sonner";

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

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const locale = await getLocale();

   return (
      <html lang={locale}>
         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <NextIntlClientProvider>
               {children}
               <Toaster />
            </NextIntlClientProvider>
         </body>
      </html>
   );
}
