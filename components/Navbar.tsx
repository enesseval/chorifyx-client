import Image from "next/image";
import React from "react";
import AsyncSearch from "./async-search";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

function Navbar() {
   const { user } = useUser();

   if (user)
      return (
         <div className="h-20 px-4 border-b flex items-center justify-between bg-bg1 sticky top-0">
            <div className="flex items-center gap-4">
               <Image src={"/logonotext.png"} alt="logo" width={60} height={50} />
               <AsyncSearch />
            </div>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant={"default"} className="h-12 w-12 rounded-full">
                     {user?.profileImage ? <Image src={user.profileImage} alt={user.username} width={32} height={32} className="rounded-full object-cover" /> : <User className="h-4 w-4 text-white" />}
                     <span className="sr-only">Kullanıcı menüsü</span>
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-52" align="end">
                  <div className="flex items-center  gap-2 p-2">
                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        {user?.profileImage ? (
                           <Image src={user.profileImage} alt={user.username} width={32} height={32} className="rounded-full object-cover" />
                        ) : (
                           <User className="h-4 w-4 text-white" />
                        )}
                     </div>
                     <div className="flex flex-col space-y-0.5">
                        <p className="text-sm font-medium">
                           {user.name.slice(0, 1).toUpperCase() + user.name.slice(1)} {user.surname.slice(0, 1).toUpperCase() + user.surname.slice(1)}
                        </p>
                        <p className="text-xs text-muted-foreground">@{user.username}</p>
                     </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                     <Link href={`${user.username}/settings`} className="cursor-pointer flex w-full items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Ayarlar</span>
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                     <LogOut className="mr-2 h-4 w-4" />
                     <span>Çıkış Yap</span>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      );
}

export default Navbar;
