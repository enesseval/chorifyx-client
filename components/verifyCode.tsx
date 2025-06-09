import React, { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { authApi } from "@/services/api";

const TOTAL_TIME = 900;

function VerifyCode({ codeExpires, verificationAttempts }: { codeExpires: Date | null; verificationAttempts: number }) {
   const t = useTranslations("verify");
   const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
   const [otpValue, setOtpValue] = useState("");
   const [isResendDisabled, setIsResendDisabled] = useState(true);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
   };

   const onVerify = async () => {
      setIsSubmitting(true);
      const toastId = toast.loading(t("verifying"));

      console.log(otpValue.toString());

      try {
         await authApi.verify(otpValue.toString());

         toast.success("Kod doğrulandı.", { id: toastId });
      } catch (error: any) {
         setIsSubmitting(false);
         setOtpValue("");
         const errorKey = error?.response?.data?.error || "UNKNOWN";
         const translatedMessage = t(`errors.${errorKey}`);
         console.log(error);
         toast.error("Bir hata oluştu", { id: toastId });
      }
   };

   const resendVerifyCode = async () => {};

   useEffect(() => {
      if (otpValue.length === 6) {
         onVerify();
      }
   }, [otpValue]);

   useEffect(() => {
      if (!codeExpires) return;

      const expirationTime = new Date(codeExpires).getTime();
      const interval = setInterval(() => {
         const now = Date.now();
         const remainingTime = Math.max(0, expirationTime - now);
         setTimeLeft(Math.floor(remainingTime / 1000));

         if (remainingTime <= 0) clearInterval(interval);
      }, 1000);

      return () => clearInterval(interval);
   }, [codeExpires]);

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
                           <p className="text-sm text-muted">{verificationAttempts < 3 ? t("expireCode.canResend") : t("expireCode.limitReached")}</p>
                        </div>
                     )}
                  </CardDescription>
               </div>

               <div className="flex justify-center">
                  <InputOTP className="w-full max-w-xs rounded-full" pattern={REGEXP_ONLY_DIGITS} disabled={isSubmitting} maxLength={6} value={otpValue} onChange={(val) => setOtpValue(val)}>
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

               <div className={cn("flex justify-center", timeLeft > 0 && "cursor-not-allowed")}>
                  <Button disabled={timeLeft > 0} variant="link" onClick={resendVerifyCode} size="sm" className="text-muted-foreground hover:text-primary">
                     {t("resend")}
                  </Button>
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
function useTranslation(arg0: string): { t: any } {
   throw new Error("Function not implemented.");
}
