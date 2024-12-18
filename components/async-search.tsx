import { Search, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import { useQuery } from "@apollo/client";
import { GET_USERS_SEARCH } from "@/graphql/queries";
import type { User as UserType } from "@/types/user";

export default function AsyncSearch() {
   const [search, setSearch] = useState("");
   const [debouncedSearch, setDebouncedSearch] = useState("");
   const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {
      const timer = setTimeout(() => {
         setDebouncedSearch(search);
      }, 500);

      return () => clearTimeout(timer);
   }, [search]);

   const { data, loading, error } = useQuery(GET_USERS_SEARCH, {
      variables: { username: debouncedSearch },
      skip: !debouncedSearch,
      onError: (error) => {
         console.log(error);
      },
   });

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         const target = event.target as HTMLElement;
         if (!target.closest(".search-container")) {
            setIsOpen(false);
            setSearch("");
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   useEffect(() => {
      if (debouncedSearch && (loading || (data?.users && data.users.length > 0))) {
         setIsOpen(true);
      }
   }, [debouncedSearch, data, loading]);

   return (
      <div className="relative search-container ml-5">
         <div className="relative w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Kullanıcı ara..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 text-white border-muted-foreground" />
         </div>

         {isOpen && (debouncedSearch || loading) && (
            <div className="absolute top-full mt-1 w-full border rounded-lg divide-y overflow-hidden bg-background shadow-lg">
               {data?.getUsers?.map((user: UserType) => (
                  <div key={user.username} className="flex items-center gap-3 p-2 hover:bg-muted/50 transition-colors cursor-pointer">
                     <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        {user.profileImage ? <img src={user.profileImage} alt={user.username} className="w-full h-full object-cover" /> : <User className="w-4 h-4 text-muted-foreground" />}
                     </div>
                     <div className="flex flex-col">
                        <span className="font-medium">{user.username}</span>
                        <span className="text-sm text-muted-foreground">
                           {user.name.slice(0, 1).toUpperCase() + user.name.slice(1)} {user.surname.slice(0, 1).toUpperCase() + user.surname.slice(1)}
                        </span>
                     </div>
                  </div>
               ))}

               {loading && (
                  <>
                     {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3 p-2">
                           <Skeleton className="w-8 h-8 rounded-full" />
                           <Skeleton className="h-4 w-32" />
                        </div>
                     ))}
                  </>
               )}

               {!loading && data?.users?.length === 0 && debouncedSearch && <div className="p-2 text-center text-sm text-muted-foreground">Sonuç bulunamadı.</div>}

               {error && <div className="p-2 text-center text-sm text-red-500">Bir hata oluştu.</div>}
            </div>
         )}
      </div>
   );
}
