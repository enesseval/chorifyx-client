import { User } from "@/types/user";
import { createContext, useContext } from "react";

interface UserContextType {
   user: User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children, user }: { children: React.ReactNode; user: User | null }) => {
   return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
   const context = useContext(UserContext);
   if (!context) throw new Error("useUser must be used within a UserProvider");
   return context;
};
