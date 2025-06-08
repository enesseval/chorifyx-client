import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { locales, Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import type { IntlMessages } from "@/types/messages";

const languageLabelKeys = {
   tr: "turkish",
   en: "english",
   // yeni dil ekleyeceksen burada tanımla: örneğin fr: "french"
} as const;

function Footer() {
   const locale = useLocale();
   const t = useTranslations("footer");
   const [language, setLanguage] = useState<Locale>(locale as Locale);

   useEffect(() => {
      setUserLocale(language);
   }, [language]);

   return (
      <div className="fixed bottom-0 z-50 w-full border-t bg-white/80 backdrop-blur-md">
         <div className="container h-20 mx-auto flex items-center justify-end">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="cursor-pointer">
                     {t(languageLabelKeys[language])}
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-40" side="top">
                  <DropdownMenuRadioGroup value={language} onValueChange={(val) => setLanguage(val as Locale)}>
                     {locales.map((lang) => (
                        <DropdownMenuRadioItem key={lang} value={lang}>
                           {t(languageLabelKeys[lang])}
                        </DropdownMenuRadioItem>
                     ))}
                  </DropdownMenuRadioGroup>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </div>
   );
}

export default Footer;
