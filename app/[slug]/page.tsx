"use client";

import { Button } from "@/components/ui/button";
import { GET_USER_BY_USERNAME } from "@/graphql/queries";
import type { User } from "@/types/user";
import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

function User() {
   const [user, setUser] = useState<User | null>(null);
   const [errorCode, setErrorCode] = useState(0);

   const router = useRouter();
   const params = useParams();

   const { loading } = useQuery(GET_USER_BY_USERNAME, {
      variables: { username: params.slug },
      onCompleted: (data) => {
         setUser(data.getUser);
      },
      onError: (error) => {
         console.log(error);
         setErrorCode(404);
      },
   });

   console.log(user);

   if (loading) return <div>Loading...</div>;

   if (!user) {
      return (
         <div className="min-h-screen flex flex-col items-center justify-center bg-bg1 text-gray-300 space-y-4 font-poppins">
            <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center">
               <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
            </div>
            <h2 className="text-xl tracking-[0.2em]">{errorCode === 404 ? "Kullanıcı bulunamadı" : "Yetkisiz erişim"}</h2>
            <p className="text-gray-500 text-center max-w-md">
               {errorCode === 404 ? "Aradığınız kullanıcı bulunamadı. Kullanıcı silinmiş yada hesap askıya alınmış olabilir" : "Bu sayfayı görebilmek için giriş yapmanız gerekiyor"}
            </p>
            <Button onClick={() => router.push(errorCode === 404 ? "/" : "/sign-up")} className="px-6 py-2 bg-p1 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors mt-4">
               {errorCode === 404 ? "Anasayfa" : "Giriş Yap"}
            </Button>
         </div>
      );
   }

   return (
      <div className="w-full flex items-center justify-center min-h-screen text-p5">
         {user.name} - {user.surname}
      </div>
   );
}

export default User;
