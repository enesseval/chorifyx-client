"use client";

import Footer from "@/components/footer";
import Login from "@/components/login";
import Navbar from "@/components/navbar";
import Register from "@/components/register";
import SocialAuth from "@/components/socialAuth";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const variants = {
   enter: { opacity: 0, y: 20 },
   center: { opacity: 1, y: 0 },
   exit: { opacity: 0, y: -20 },
};

function Auth() {
   const [isLogin, setIsLogin] = useState(true);
   const t = useTranslations("auth");

   return (
      <>
         <Navbar landing={false} />

         <div className="flex flex-col items-center justify-center my-10 conteiner mx-auto">
            {/* <AnimatePresence >
               <h1 className="text-secondary font-bold text-4xl tracking-wide">
                  {isLogin ? (
                     <motion.div key="1" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}>
                        {t("login")}
                     </motion.div>
                  ) : (
                     <motion.div key="2" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}>
                        {t("register")}
                     </motion.div>
                  )}
               </h1>

               <span className="text-sm font-medium tracking-wide text-secondary mt-2 flex items-center space-x-2">
                  {isLogin ? (
                     <motion.div key="3" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}>
                        {t("dontHaveAccount")}
                     </motion.div>
                  ) : (
                     <motion.div key="4" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}>
                        {t("haveAccount")}
                     </motion.div>
                  )}{" "}
                  <Button onClick={() => setIsLogin(!isLogin)} className="p-0 cursor-pointer underline text-secondary text-sm font-medium" variant="link">
                     {isLogin ? (
                        <motion.div key="5" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}>
                           {t("register")}
                        </motion.div>
                     ) : (
                        <motion.div key="6" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}>
                           {t("login")}
                        </motion.div>
                     )}
                  </Button>
               </span>
            </AnimatePresence> */}
            <AnimatePresence mode="wait">
               <motion.div
                  key={isLogin ? "login-header" : "register-header"}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-col items-center"
               >
                  <h1 className="text-secondary font-bold text-4xl tracking-wide">{isLogin ? t("login") : t("register")}</h1>

                  <span className="text-sm font-medium tracking-wide text-secondary mt-2">
                     {isLogin ? t("dontHaveAccount") : t("haveAccount")}
                     <Button onClick={() => setIsLogin(!isLogin)} className="p-0 cursor-pointer underline text-secondary text-sm font-medium ml-2" variant="link">
                        {isLogin ? t("register") : t("login")}
                     </Button>
                  </span>
               </motion.div>
            </AnimatePresence>
         </div>

         <div className="flex items-center justify-center h-[400px]">
            <AnimatePresence mode="wait">
               {isLogin ? (
                  <motion.div key="login" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
                     <Login />
                  </motion.div>
               ) : (
                  <motion.div key="register" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
                     <Register />
                  </motion.div>
               )}
            </AnimatePresence>

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
