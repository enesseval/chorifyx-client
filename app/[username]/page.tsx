"use client";

import { useUser } from "@/context/UserContext";
import React from "react";

function Profile() {
   const { user } = useUser();
   return (
      <div>
         {user?.name} + {user?.surname} + {user?.email}
      </div>
   );
}

export default Profile;
