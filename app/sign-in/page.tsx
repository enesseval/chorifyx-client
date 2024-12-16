"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Header from "@/components/ui/Header";
import { Input } from "@/components/ui/input";
import { LOGIN_MUTATION } from "@/graphql/queries";
import { useToast } from "@/hooks/use-toast";
import { SigninFormSchema } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner } from "react-icons/im";
import { z } from "zod";

function SignIn() {
   const { toast } = useToast();
   const router = useRouter();

   const [login, { loading }] = useMutation(LOGIN_MUTATION, {
      onCompleted: (data) => {
         toast({
            title: "Başarılı",
            description: "Başarıyla giriş yaptınız, şimdi yönlendiriliyorsunuz.",
         });
         router.push(`/${data.login.username}`);
      },
      onError: (err) => {
         toast({
            title: "Hata",
            description: err.message,
            variant: "destructive",
         });
      },
   });
   const form = useForm<z.infer<typeof SigninFormSchema>>({
      resolver: zodResolver(SigninFormSchema),
      mode: "onChange",
   });

   const handleSignin = (values: z.infer<typeof SigninFormSchema>) => {
      login({ variables: { email: values.email, password: values.password } });
   };

   return (
      <div className="min-h-screen bg-bg1 pt-[106px] font-poppins py-5">
         <Header landing={false} />
         <div>
            <div className="h-0.5 w-11/12 md:w-8/12 lg:w-6/12 max-w-2xl mx-auto bg-zinc-500 rounded-xl" />
            <div className="w-11/12 md:w-8/12 lg:w-6/12 max-w-xl mx-auto my-5 px-3">
               <Card className="bg-gray-800 border-gray-700 w-full flex flex-col items-center">
                  <CardHeader className="space-y-1">
                     <CardTitle className="text-2xl font-semibold text-p5 text-center">Giriş Yap</CardTitle>
                     <CardDescription className="text-p5">Lütfen giriş yapın</CardDescription>
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
                        <form onSubmit={form.handleSubmit(handleSignin)} className="space-y-4">
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
                                 {loading ? <ImSpinner className="animate-spin w-4 h-4" /> : "Giriş yap"}
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

export default SignIn;
