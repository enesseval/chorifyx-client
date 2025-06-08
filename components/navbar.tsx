"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { AlignJustify, ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ landing }: { landing: boolean }) {
   const t = useTranslations("navbar");
   const [toggleMobileNav, setToggleMobileNav] = useState(false);

   return (
      <>
         <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className={cn("relative h-16 mx-auto flex items-center px-4", landing ? "container justify-center md:justify-between" : "justify-center")}>
               {!landing && (
                  <Link className="absolute left-3" href="/">
                     <motion.div className="relative flex space-x-2 items-center text-gray-500 cursor-pointer" initial="initial" whileHover="hover">
                        <ArrowLeft className="size-5" />
                        <p>{t("back")}</p>
                        <motion.div
                           className="absolute bottom-0 left-0 h-[1px] bg-gray-500"
                           variants={{
                              initial: { width: 0 },
                              hover: { width: "100%" },
                           }}
                           transition={{ duration: 0.3 }}
                        />
                     </motion.div>
                  </Link>
               )}

               <Link href="/" className="flex items-center gap-2">
                  <Image src={landing ? "/chorifyx-logo.png" : "/logo-no-text.png"} alt="Chorifyx Logo" width={landing ? 160 : 50} height={landing ? 160 : 50} />
               </Link>
               {landing && (
                  <>
                     <nav className="items-center gap-6 text-sm font-medium hidden md:flex box-border">
                        <Link href="#features" className="text-secondary hover:text-secondary-foreground duration-300 transition-colors">
                           <motion.div className="relative inline-block" whileHover="hover" initial="rest" animate="rest">
                              <span className="text-secondary hover:text-secondary-foreground">{t("features")}</span>
                              <motion.span
                                 variants={{
                                    rest: { width: 0 },
                                    hover: { width: "100%" },
                                 }}
                                 transition={{ duration: 0.3 }}
                                 className="absolute bottom-0 left-0 h-[2px] bg-secondary-foreground"
                              />
                           </motion.div>
                        </Link>
                        <Link href="#testimonials" className="text-secondary hover:text-secondary-foreground duration-300 transition-colors border-b-2 border-transparent">
                           <motion.div className="relative inline-block" whileHover="hover" initial="rest" animate="rest">
                              <span className="text-secondary hover:text-secondary-foreground">{t("testimonials")}</span>

                              <motion.span
                                 variants={{
                                    rest: { width: 0 },
                                    hover: { width: "100%" },
                                 }}
                                 transition={{ duration: 0.3 }}
                                 className="absolute bottom-0 left-0 h-[2px] bg-secondary-foreground"
                              />
                           </motion.div>
                        </Link>
                        <Link href="#pricing" className="text-secondary hover:text-secondary-foreground duration-300 transition-colors">
                           <motion.div className="relative inline-block" whileHover="hover" initial="rest" animate="rest">
                              <span className="text-secondary hover:text-secondary-foreground">{t("pricing")}</span>
                              <motion.span
                                 variants={{
                                    rest: { width: 0 },
                                    hover: { width: "100%" },
                                 }}
                                 transition={{ duration: 0.3 }}
                                 className="absolute bottom-0 left-0 h-[2px] bg-secondary-foreground"
                              />
                           </motion.div>
                        </Link>
                     </nav>
                     <div className="hidden md:flex items-center gap-4">
                        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-transform duration-200 hover:scale-105">
                           <Link href="/auth">
                              {t("startFree")} <ArrowRight className="ml-2 h-4 w-4" />
                           </Link>
                        </Button>
                     </div>
                  </>
               )}
               <div className="absolute right-1 md:hidden">
                  <Button
                     onClick={() => setToggleMobileNav(!toggleMobileNav)}
                     size="icon"
                     variant="ghost"
                     className="cursor-pointer text-secondary hover:text-secondary-foreground hover:bg-muted transition-all duration-300"
                  >
                     {toggleMobileNav ? <X className="size-5" /> : <AlignJustify className="size-5 " />}
                  </Button>
               </div>
            </div>
         </nav>
         <AnimatePresence>
            {toggleMobileNav && (
               <motion.div
                  key="mobile-nav"
                  initial={{ opacity: 0, x: "-100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "-100%" }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="fixed inset-0 top-[65px] z-50 w-full h-screen bg-white/95 space-y-10 pt-20"
               >
                  <nav className="items-center gap-6 text-4xl font-medium md:hidden flex flex-col">
                     <Link onClick={() => setToggleMobileNav(false)} href="#features" className="text-secondary hover:scale-110 transition-all duration-300 rounded-md py-3">
                        {t("features")}
                     </Link>
                     <Link onClick={() => setToggleMobileNav(false)} href="#testimonials" className="text-secondary hover:scale-110 transition-all duration-300 rounded-md p-3">
                        {t("testimonials")}
                     </Link>
                     <Link onClick={() => setToggleMobileNav(false)} href="#pricing" className="text-secondary hover:scale-110 transition-all duration-300 rounded-md p-3">
                        {t("pricing")}
                     </Link>
                  </nav>
                  <div className="flex md:hidden items-center gap-4 justify-center">
                     <Button asChild className="bg-secondary hover:bg-secondary-foreground h-20 text-white text-4xl shadow-md transition-transform duration-200 hover:scale-105">
                        <Link className="flex" href="/auth">
                           {t("startFree")} <ArrowRight className="ml-2 size-12" />
                        </Link>
                     </Button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </>
   );
}

export default Navbar;
