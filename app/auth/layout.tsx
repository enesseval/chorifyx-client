"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
   return (
      // Ana konteyner: Tüm ekranı kaplar ve arka planı merkezler.
      <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gray-900 text-white">
         {/* 1. Dinamik Aurora Arka Planı */}
         <div className="absolute inset-0 z-0">
            {/* Hareket eden renkli blob'lar */}
            <motion.div
               animate={{
                  transform: ["translate(20%, -20%) scale(1)", "translate(-20%, 20%) scale(1.2)", "translate(20%, -20%) scale(1)"],
               }}
               transition={{ duration: 25, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
               className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-blue-500/40 blur-3xl filter"
            />
            <motion.div
               animate={{
                  transform: ["translate(-30%, 30%) scale(1.2)", "translate(30%, -30%) scale(1)", "translate(-30%, 30%) scale(1.2)"],
               }}
               transition={{ duration: 30, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
               className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-amber-400/30 blur-3xl filter"
            />
         </div>

         {/* 2. Çocuk Bileşeni (Login/Register Formu) */}
         <div className="relative z-10 w-full">
            {/* Üstteki Logo */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2">
               <Link href="/">
                  <motion.div whileHover={{ scale: 1.1, rotate: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                     <Image src="/logo.png" alt="Chorifyx Logo" width={50} height={50} className="brightness-0 invert drop-shadow-lg" />
                  </motion.div>
               </Link>
            </div>
            {children}
         </div>
      </main>
   );
}
