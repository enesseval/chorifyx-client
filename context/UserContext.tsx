"use client";

import { authApi } from "@/services/api";
import { User } from "@/types/user.type";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface UserContextType {
   user: User | null;
   setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [user, setUser] = useState<User | null>(null);
   const router = useRouter();

   useEffect(() => {
      const fetchUser = async () => {
         try {
            const response = await authApi.getUser();

            if (!response.user) router.push("/unauthorized");

            setUser(response.user);
         } catch (error) {
            console.error("Error checking user:", error);
         }
      };
      fetchUser();
   }, []);
   return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
   const context = useContext(UserContext);
   if (!context) throw new Error("useUser must be used within a UserProvider");
   return context;
};
