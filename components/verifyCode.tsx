import React, { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { authApi } from "@/services/api";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

function VerifyCode({ codeExpires, verificationAttempts }: { codeExpires: Date | string | null; verificationAttempts: number }) {
   const t = useTranslations("verify");
   const [timeLeft, setTimeLeft] = useState<number | null>(null);
   const [otpValue, setOtpValue] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [currentCodeExpires, setCurrentCodeExpires] = useState<Date | null>(null);
   const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

   const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
   };

   const startTimer = (expiresAt: Date) => {
      if (timerInterval) {
         clearInterval(timerInterval);
         setTimerInterval(null);
      }

      const expirationTime = expiresAt.getTime();

      const now = Date.now();
      const initialRemaining = Math.max(0, Math.floor((expirationTime - now) / 1000));
      setTimeLeft(initialRemaining);

      const interval = setInterval(() => {
         const now = Date.now();
         const remaining = Math.max(0, Math.floor((expirationTime - now) / 1000));

         setTimeLeft(remaining);

         if (remaining <= 0) {
            clearInterval(interval);
            setTimerInterval(null);
         }
      }, 1000);

      setTimerInterval(interval);
   };

   const onVerify = async () => {
      setIsSubmitting(true);
      const toastId = toast.loading(t("verifying"));

      try {
         await authApi.verify({ code: otpValue.toString() });

         toast.success("Kod doğrulandı.", { id: toastId });
         window.location.reload();
      } catch (error: any) {
         setIsSubmitting(false);
         setOtpValue("");
         const errorKey = error?.response?.data?.error || "UNKNOWN";
         const translatedMessage = t(`errors.${errorKey}`);
         toast.error(translatedMessage, { id: toastId });
      }
   };

   // Doğrulama kodunu yeniden gönderme
   // BURDA BİR MANTIK HATASI VAR. KOD YENİDEN GÖNDERİLDİĞİNDE TİMER GÜNCELLENMELİ ? ?? ? ? ? ? ?
   const resendVerifyCode = async () => {
      const toastId = toast.loading("Doğrulama kodu yeniden gönderiliyor.");

      try {
         const response = await authApi.resend();

         toast.success("Kod yeniden gönderildi", { id: toastId });

         if (response?.data?.codeExpires) {
            const newExpires = new Date(response.data.codeExpires);
            setCurrentCodeExpires(newExpires);
         } else {
            setCurrentCodeExpires(new Date(Date.now() + 15 * 60 * 1000));
         }
      } catch (error: any) {
         const errorKey = error?.response?.data?.error || "UNKNOWN";
         const translatedMessage = t(`errors.${errorKey}`);
         toast.error(translatedMessage, { id: toastId });
      }
   };

   useEffect(() => {
      if (otpValue.length === 6) {
         onVerify();
      }
   }, [otpValue]);

   useEffect(() => {
      if (!codeExpires) return;

      const expiresDate = codeExpires instanceof Date ? codeExpires : new Date(codeExpires);
      setCurrentCodeExpires(expiresDate);
   }, [codeExpires]);

   useEffect(() => {
      if (currentCodeExpires) {
         startTimer(currentCodeExpires);
      }
      return () => {
         if (timerInterval) {
            clearInterval(timerInterval);
            setTimerInterval(null);
         }
      };
   }, [currentCodeExpires]);

   if (!currentCodeExpires || timeLeft === null) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-[f8f9fc] p-4">
            <Card className="w-full max-w-md">
               <CardContent className="pt-6 space-y-6">
                  <div className="text-center space-y-2">
                     <Skeleton className="mx-auto h-6 w-40" />
                     <Skeleton className="mx-auto h-4 w-56" />
                     <Skeleton className="mx-auto h-3 w-32 mt-2" />
                  </div>
                  <div className="flex justify-center">
                     <div className="flex gap-2">
                        {[...Array(6)].map((_, i) => (
                           <Skeleton key={i} className="h-10 w-10 rounded-md" />
                        ))}
                     </div>
                  </div>
                  <div className="flex justify-center">
                     <Skeleton className="h-4 w-24" />
                  </div>
               </CardContent>
               <CardFooter className="flex flex-col gap-2">
                  <Skeleton className="h-10 w-full" />
               </CardFooter>
            </Card>
         </div>
      );
   }

   return (
      <div className="min-h-screen flex items-center justify-center bg-[f8f9fc] p-4">
         <Card className="w-full max-w-md">
            <CardContent className="pt-6 space-y-6">
               <div className="text-center space-y-2">
                  <CardTitle className="text-secondary text-xl">{t("title")}</CardTitle>
                  <CardDescription>
                     {timeLeft > 0 ? (
                        <>
                           <span className="text-secondary text-[16px]">{t("description")}</span>
                           <p className="mt-3 text-sm text-secondary-foreground">{t("remainingTime", { time: formatTime(timeLeft) })}</p>
                        </>
                     ) : (
                        <div className="mt-3 w-8/12 mx-auto">
                           <p className="text-sm text-secondary">{verificationAttempts < 3 ? t("expireCode.canResend") : t("expireCode.limitReached")}</p>
                        </div>
                     )}
                  </CardDescription>
               </div>

               <div className="flex justify-center">
                  <InputOTP
                     className="w-full max-w-xs rounded-full"
                     pattern={REGEXP_ONLY_DIGITS}
                     disabled={isSubmitting || timeLeft === 0}
                     maxLength={6}
                     value={otpValue}
                     onChange={(val) => setOtpValue(val)}
                  >
                     <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                     </InputOTPGroup>
                  </InputOTP>
               </div>

               <div className="flex justify-center">
                  <motion.button
                     onClick={resendVerifyCode}
                     animate={timeLeft === 0 ? { scale: [1, 1.1, 1], opacity: [1, 0.7, 1] } : {}}
                     transition={{ duration: 1.5, repeat: Infinity }}
                     className={cn("underline cursor-pointer", timeLeft === 0 ? "text-primary" : "text-muted-foreground cursor-pointer")}
                  >
                     {t("resend")}
                  </motion.button>
               </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-2">
               <Button variant="outline" className="w-full cursor-pointer">
                  <Mail className="mr-2 h-4 w-4" />
                  {t("help")}
               </Button>
            </CardFooter>
         </Card>
      </div>
   );
}

export default VerifyCode;
