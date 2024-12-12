import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Header({ landing }: { landing: boolean }) {
   const [hasScrolled, setHasScrolled] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         setHasScrolled(window.scrollY > 32);
      };
      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   return (
      <header className={cn("fixed top-0 left-0 z-50 w-full py-6 text-p5 uppercase font-poppins font-bold tracking-[0.3em] transition-all duration-500 bg-bg1", hasScrolled && "py-2 bg-p1")}>
         <div className="container mx-auto">
            <ul className="flex justify-evenly items-center">
               {landing && (
                  <>
                     <li>deneme</li>
                     <div className="dot"></div>
                     <li>deneme</li>
                  </>
               )}
               <li className={cn(landing && "cursor-pointer")}>
                  <Image src="/logo.png" alt="log" width={200} height={58} />
               </li>
               {landing && (
                  <>
                     <li>deneme</li>
                     <div className="dot"></div>
                     <li>deneme</li>
                  </>
               )}
            </ul>
         </div>
      </header>
   );
}
