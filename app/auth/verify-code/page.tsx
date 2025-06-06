// app/auth/verify-code/page.tsx
"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
// YENİ: Sadece rakam girişi için regex import edildi.
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { MailCheck, LoaderCircle } from "lucide-react";

const TOTAL_TIME = 900; // 15 dakika = 900 saniye

export default function VerifyCodePage() {
   const [otpValue, setOtpValue] = useState("");
   const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
   const [isResendDisabled, setIsResendDisabled] = useState(true);
   const [isSubmitting, setIsSubmitting] = useState(false);

   useEffect(() => {
      if (timeLeft === 0) {
         setIsResendDisabled(false);
         return;
      }
      const intervalId = setInterval(() => {
         setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(intervalId);
   }, [timeLeft]);

   const timerDisplay = useMemo(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
   }, [timeLeft]);

   const containerVariants = {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], staggerChildren: 0.15 } },
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
   };

   const handleResendCode = () => {
      console.log("Kod yeniden gönderiliyor...");
      setTimeLeft(TOTAL_TIME);
      setIsResendDisabled(true);
   };

   // YENİ: handleVerify fonksiyonu useCallback ile sarmalandı.
   // Bu, useEffect içinde güvenle kullanılmasını sağlar ve gereksiz yeniden render'ları önler.
   const handleVerify = useCallback(
      (e?: React.FormEvent) => {
         if (e) e.preventDefault();
         if (isSubmitting) return; // Zaten işlemdeyse tekrar başlatma

         setIsSubmitting(true);
         console.log("Kod doğrulanıyor:", otpValue);

         setTimeout(() => {
            setIsSubmitting(false);
            // Burada başarılı/başarısız durumuna göre yönlendirme veya hata mesajı gösterilebilir.
         }, 2000);
      },
      [isSubmitting, otpValue]
   );

   // YENİ: Otomatik doğrulama için useEffect eklendi.
   // otpValue her değiştiğinde bu hook çalışır.
   useEffect(() => {
      // Eğer kod 6 haneye ulaştıysa ve zaten bir doğrulama işlemi başlamadıysa...
      if (otpValue.length === 6 && !isSubmitting) {
         handleVerify(); // Doğrulama işlemini başlat.
      }
   }, [otpValue, isSubmitting, handleVerify]);

   return (
      <motion.div
         variants={containerVariants}
         initial="hidden"
         animate="visible"
         className="mx-auto flex w-full max-w-md flex-col items-center justify-center space-y-8 rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg"
      >
         <motion.div variants={itemVariants} className="text-center">
            <div className="flex justify-center mb-4">
               <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400">
                  <MailCheck className="w-8 h-8 text-blue-300" />
               </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">E-postanızı Kontrol Edin</h1>
            <p className="mt-2 text-sm text-gray-300">
               <span className="font-semibold text-white">ornek@kullanici.com</span> adresine gönderilen 6 haneli kodu girin.
            </p>
         </motion.div>

         <motion.form onSubmit={handleVerify} variants={itemVariants} className="w-full flex flex-col items-center space-y-6">
            <InputOTP
               maxLength={6}
               value={otpValue}
               onChange={(value) => setOtpValue(value)}
               // YENİ: pattern prop'u eklenerek sadece rakam girişine izin verildi.
               pattern={REGEXP_ONLY_DIGITS}
            >
               <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} className="text-2xl h-14 w-12 text-white bg-white/5 border-white/30 focus:bg-white/10 focus:ring-blue-400 focus:ring-offset-gray-900" />
                  <InputOTPSlot index={1} className="text-2xl h-14 w-12 text-white bg-white/5 border-white/30 focus:bg-white/10 focus:ring-blue-400 focus:ring-offset-gray-900" />
                  <InputOTPSlot index={2} className="text-2xl h-14 w-12 text-white bg-white/5 border-white/30 focus:bg-white/10 focus:ring-blue-400 focus:ring-offset-gray-900" />
               </InputOTPGroup>
               <InputOTPSeparator />
               <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={3} className="text-2xl h-14 w-12 text-white bg-white/5 border-white/30 focus:bg-white/10 focus:ring-blue-400 focus:ring-offset-gray-900" />
                  <InputOTPSlot index={4} className="text-2xl h-14 w-12 text-white bg-white/5 border-white/30 focus:bg-white/10 focus:ring-blue-400 focus:ring-offset-gray-900" />
                  <InputOTPSlot index={5} className="text-2xl h-14 w-12 text-white bg-white/5 border-white/30 focus:bg-white/10 focus:ring-blue-400 focus:ring-offset-gray-900" />
               </InputOTPGroup>
            </InputOTP>

            <motion.div
               className="w-full"
               whileHover={otpValue.length === 6 && !isSubmitting ? { scale: 1.03 } : {}}
               whileTap={otpValue.length === 6 && !isSubmitting ? { scale: 0.98 } : {}}
               transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
               <Button
                  type="submit"
                  className="w-full h-11 font-bold bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800/50 disabled:cursor-not-allowed disabled:shadow-none shadow-lg shadow-blue-500/30"
                  disabled={otpValue.length < 6 || isSubmitting}
               >
                  {isSubmitting ? (
                     <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                        <LoaderCircle className="w-5 h-5" />
                     </motion.div>
                  ) : (
                     "Doğrula"
                  )}
               </Button>
            </motion.div>
         </motion.form>

         <motion.div variants={itemVariants} className="text-center text-sm text-gray-300">
            <AnimatePresence mode="wait">
               {timeLeft > 0 ? (
                  <motion.p key="timer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                     Kodun süresinin dolmasına: <span className="font-bold text-white">{timerDisplay}</span>
                  </motion.p>
               ) : (
                  <motion.div key="resend" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                     Kodu almadınız mı?{" "}
                     <button
                        onClick={handleResendCode}
                        disabled={isResendDisabled}
                        className="font-medium text-white underline hover:text-blue-300 disabled:text-gray-500 disabled:no-underline disabled:cursor-not-allowed"
                     >
                        Tekrar gönder
                     </button>
                  </motion.div>
               )}
            </AnimatePresence>
         </motion.div>
      </motion.div>
   );
}
