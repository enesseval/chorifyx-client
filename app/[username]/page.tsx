"use client";

import VerifyCode from "@/components/verifyCode";
import { useUser } from "@/context/UserContext";
import React, { useEffect, useState } from "react";

function Profile() {
   const { user } = useUser();
   const [isMinimumLoadingDone, setIsMinimumLoadingDone] = useState(false);

   useEffect(() => {
      const timer = setTimeout(() => {
         setIsMinimumLoadingDone(true);
      }, 1000); // En az 1 saniye loading göster

      return () => clearTimeout(timer);
   }, []);

   if (!user || !isMinimumLoadingDone) {
      return <div>Yükleniyor...</div>; // Buraya dilediğin animasyonu koyabilirsin
   }

   if (!user?.isVerified) return <VerifyCode codeExpires={user?.verificationCodeExpires} verificationAttempts={user.verificationAttempts} />;
   return (
      <div>
         {user?.name} + {user?.surname} + {user?.email}
      </div>
   );
}

export default Profile;
