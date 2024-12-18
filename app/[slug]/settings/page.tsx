"use client";

import { useUser } from "@/context/UserContext";
import React from "react";

function Settings() {
   const { user } = useUser();
   return <div className="text-white">{user?.username}</div>;
}

export default Settings;
