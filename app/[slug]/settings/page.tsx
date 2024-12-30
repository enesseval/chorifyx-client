"use client";

import { useUser } from "@/context/UserContext";
import SettingsProfileTab from "@/components/SettingsProfileTab";
import SettingsSecurityTab from "@/components/SettingsSecurityTab";

import React, { useEffect, useState } from "react";
import { Lock, User } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const tabs = [
   { id: "profile", label: "Profil", icon: User },
   { id: "security", label: "Güvenlik", icon: Lock },
   { id: "deneme", label: "Resim deneme", icon: Lock },
   // { id: "security1", label: "Güvenlik", icon: Lock },
   // { id: "security2", label: "Güvenlik", icon: Lock },
   // { id: "security3", label: "Güvenlik", icon: Lock },
   // { id: "security4", label: "Güvenlik", icon: Lock },
   // { id: "security5", label: "Güvenlik", icon: Lock },
   // { id: "security6", label: "Güvenlik", icon: Lock },
];

function Settings() {
   const [activeTab, setActiveTab] = useState("profile");
   const [isMobile, setIsMobile] = useState<boolean>(false);
   const { user } = useUser();

   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth < 768) {
            setIsMobile(true);
         } else {
            setIsMobile(false);
         }
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
   }, []);
   return (
      <div className="dark min-h-screen bg-background text-foreground">
         <div className="container mx-auto py-10">
            <div className="flex gap-6">
               {/* Ana içerik */}
               <div className="flex-1">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col items-center">
                     <TabsList className="max-w-[500px] mb-10">
                        {isMobile ? (
                           // <>
                           //    <Select onValueChange={setActiveTab} value={activeTab}>
                           //       <SelectTrigger>
                           //          <SelectValue placeholder="Seç" />
                           //       </SelectTrigger>
                           //       <SelectContent>
                           //          <SelectGroup>
                           //             {tabs.map((tab) => (
                           //                <SelectItem value={tab.id} key={tab.id}>
                           //                   {tab.label}
                           //                </SelectItem>
                           //             ))}
                           //          </SelectGroup>
                           //       </SelectContent>
                           //    </Select>
                           // </>
                           <div className="flex items-center justify-center">
                              <Carousel className="max-w-[200px]" opts={{ align: "center" }}>
                                 <CarouselContent>
                                    {tabs.map((tab) => (
                                       <CarouselItem key={tab.id} className="basis-auto">
                                          <TabsTrigger value={tab.id}> {tab.label}</TabsTrigger>
                                       </CarouselItem>
                                    ))}
                                 </CarouselContent>
                              </Carousel>
                           </div>
                        ) : (
                           <div className="flex items-center justify-center">
                              <Carousel className="max-w-[400px]" opts={{ align: "center" }}>
                                 <CarouselContent>
                                    {tabs.map((tab) => (
                                       <CarouselItem key={tab.id} className="basis-auto">
                                          <TabsTrigger value={tab.id}> {tab.label}</TabsTrigger>
                                       </CarouselItem>
                                    ))}
                                 </CarouselContent>
                              </Carousel>
                           </div>
                        )}
                     </TabsList>
                  </Tabs>
                  {activeTab === "profile" && <SettingsProfileTab />}
                  {activeTab === "security" && <SettingsSecurityTab />}
               </div>
            </div>
         </div>
      </div>
   );
}

export default Settings;
