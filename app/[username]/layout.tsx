"use client";

import { UserProvider } from "@/context/UserContext";
import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
   return <UserProvider>{children}</UserProvider>;
}
