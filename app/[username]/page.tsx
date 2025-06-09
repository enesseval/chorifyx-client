"use client";

import VerifyCode from "@/components/verifyCode";
import { useUser } from "@/context/UserContext";
import React from "react";

function Profile() {
   const { user } = useUser();

   if (!user) return <div>kullanıcı bulunamadı</div>;

   console.log(user.verificationCodeExpires);

   if (!user?.isVerified) return <VerifyCode codeExpires={user?.verificationCodeExpires} verificationAttempts={user.verificationAttempts} />;
   return (
      <div>
         {user?.name} + {user?.surname} + {user?.email}
      </div>
   );
}

export default Profile;
