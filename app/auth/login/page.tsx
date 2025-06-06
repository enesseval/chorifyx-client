"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { ArrowRight, LogIn } from "lucide-react";

export default function LoginPage() {
   // Animasyon varyantları
   const containerVariants = {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
         opacity: 1,
         scale: 1,
         transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1], // Yumuşak bir ease efekti
            staggerChildren: 0.1,
         },
      },
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
   };

   return (
      <motion.div
         variants={containerVariants}
         initial="hidden"
         animate="visible"
         className="mx-auto flex w-full max-w-md flex-col items-center justify-center space-y-6 rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg"
      >
         <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Tekrar Hoş Geldin!</h1>
            <p className="mt-2 text-sm text-gray-300">Zamanını yönetmeye kaldığın yerden devam et.</p>
         </motion.div>

         <motion.div variants={itemVariants} className="w-full">
            <Button variant="outline" className="w-full bg-white/10 border-white/30 hover:bg-white/20 text-white">
               Google ile Giriş Yap
            </Button>
         </motion.div>

         <motion.div variants={itemVariants} className="flex w-full items-center gap-4">
            <hr className="w-full border-white/20" />
            <span className="text-xs text-gray-400">VEYA</span>
            <hr className="w-full border-white/20" />
         </motion.div>

         <form className="grid w-full gap-4">
            <motion.div variants={itemVariants} className="grid gap-2">
               <Label htmlFor="email">E-posta</Label>
               <Input id="email" type="email" placeholder="ornek@mail.com" className="bg-white/5 border-white/30 focus:bg-white/10" />
            </motion.div>

            <motion.div variants={itemVariants} className="grid gap-2">
               <div className="flex items-center">
                  <Label htmlFor="password">Şifre</Label>
                  <Link href="#" className="ml-auto inline-block text-sm text-gray-300 underline hover:text-white">
                     Şifremi unuttum
                  </Link>
               </div>
               <Input id="password" type="password" placeholder="••••••••" className="bg-white/5 border-white/30 focus:bg-white/10" />
            </motion.div>

            <motion.div variants={itemVariants}>
               <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <Button type="submit" className="w-full h-11 font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30">
                     Giriş Yap <LogIn className="ml-2 h-4 w-4" />
                  </Button>
               </motion.div>
            </motion.div>
         </form>

         <motion.div variants={itemVariants} className="text-center text-sm text-gray-300">
            Hesabın yok mu?{" "}
            <Link href="/auth/register" className="font-medium text-white underline hover:text-blue-300">
               Yeni bir tane oluştur
            </Link>
         </motion.div>
      </motion.div>
   );
}
