import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { useTranslations } from "next-intl";

function SocialAuth() {
   const t = useTranslations("auth");
   return (
      <Button variant="outline" className="min-w-[300px] mx-10 my-4">
         <FcGoogle />
         <span>{t("continueGoogle")}</span>
      </Button>
   );
}

export default SocialAuth;
