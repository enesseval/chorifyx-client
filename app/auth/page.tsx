"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Register from "@/components/register";
import SocialAuth from "@/components/socialAuth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

function Auth() {
   const [isLogin, setIsLogin] = useState(true);
   const t = useTranslations("auth");

   return (
      <>
         <Navbar landing={false} />

         <div className="flex flex-col items-center justify-center my-10 conteiner mx-auto">
            <h1 className="text-secondary font-bold text-4xl tracking-wide">{isLogin ? t("login") : t("register")}</h1>

            <span className="text-sm font-medium tracking-wide text-secondary mt-2">
               {isLogin ? t("dontHaveAccount") : t("haveAccount")}{" "}
               <Button onClick={() => setIsLogin(!isLogin)} className="p-0 cursor-pointer underline text-secondary text-sm font-medium" variant="link">
                  {isLogin ? t("register") : t("login")}
               </Button>
            </span>
         </div>

         <div className="flex items-center justify-center h-[400px]">
            <Register />
            <div className="relative h-full flex justify-center">
               {/* Dikey çizgiler */}
               <div className="absolute inset-0 flex flex-col items-center">
                  <div className="flex-1 w-px bg-muted" />
                  <div className="flex-1 w-px bg-muted" />
               </div>

               {/* OR metni */}
               <div className="relative z-10 flex items-center justify-center">
                  <span className="bg-card text-secondary text-sm p-2">{t("or")}</span>
               </div>
            </div>
            <SocialAuth />
         </div>

         <Footer />
      </>
   );
}

export default Auth;
