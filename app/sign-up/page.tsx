"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { SignupFormSchema } from "../../lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ImSpinner } from "react-icons/im";

function SignUp() {
   const [loading, setLoading] = useState(false);

   const form = useForm<z.infer<typeof SignupFormSchema>>({
      resolver: zodResolver(SignupFormSchema),
      mode: "onChange",
   });

   const handleSignUp = (values: z.infer<typeof SignupFormSchema>) => {
      console.log(values);
   };

   return (
      <div className="min-h-screen bg-bg1 pt-[106px] font-poppins py-5">
         <div>
            <div className="h-0.5 w-11/12 md:w-8/12 lg:w-6/12 max-w-2xl mx-auto bg-zinc-500 rounded-xl" />
            <div className="w-11/12 md:w-8/12 lg:w-6/12 max-w-xl mx-auto my-5 px-3">
               <Card className="bg-gray-800 border-gray-700 w-full flex flex-col items-center">
                  <CardHeader className="space-y-1">
                     <CardTitle className="text-2xl font-bold text-p5 text-center">Kaydol</CardTitle>
                     <CardDescription className="text-p5">Lütfen hesap oluşturun</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 w-full sm:w-10/12 max-w-md">
                     <div>
                        <Button variant={"outline"} className="w-full bg-gray-700 text-white border-gray-600 hover:bg-gray-600">
                           <FcGoogle className="h-4 w-4" />
                           <p className="min-w-36 text-left">Google ile kayıt ol</p>
                        </Button>
                     </div>
                     <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                           <span className="w-full border-t bg-gray-600" />
                        </div>
                        <div className="relative flex justify-center">
                           <span className="bg-gray-800 px-2 text-p5 text-xs uppercase">veya e-posta ile devam et</span>
                        </div>
                     </div>
                     <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
                           <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="text-lg text-p5">İsim</FormLabel>
                                    <FormControl>
                                       <Input placeholder="Jack" className="border-p5 text-white" onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="surname"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="border-p5 text-p5">Soyisim</FormLabel>
                                    <FormControl>
                                       <Input placeholder="Dones" className="border-p5 text-white" onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="text-lg text-p5 font-poppins">E-posta</FormLabel>
                                    <FormControl>
                                       <Input placeholder="example@example.com" className="border-p5 text-white" onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel className="text-lg text-p5 font-poppins">Şifre</FormLabel>
                                    <FormControl>
                                       <Input type="password" placeholder="********" className="border-p5 text-white" onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <div className="w-full flex justify-center">
                              <Button
                                 type="submit"
                                 variant={"outline"}
                                 className={cn("bg-p5 hover:bg-p5/50 hover:text-white transition-all duration-500 text-white border-none col-span-2", loading ? "w-20" : "w-full")}
                              >
                                 {loading ? <ImSpinner className="animate-spin w-4 h-4" /> : "Kayıt ol"}
                              </Button>
                           </div>
                        </form>
                     </Form>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}

export default SignUp;
