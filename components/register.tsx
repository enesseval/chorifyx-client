import { RegisterFormValues, registerSchema } from "@/lib/validations/authValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const itemVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

function Register() {
   const t = useTranslations();

   const form = useForm<RegisterFormValues>({
      resolver: zodResolver(registerSchema(t)),
      defaultValues: {
         name: "",
         surname: "",
         email: "",
         password: "",
      },
      mode: "onSubmit",
   });

   const handleSubmit = async (data: RegisterFormValues) => {
      console.log(data);
   };

   return (
      <Form {...form}>
         <form onClick={form.handleSubmit(handleSubmit)} className="space-y-4 mx-10 my-4 min-w-[300px]">
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>{t("Auth.register.name")}</FormLabel>
                     <FormControl>
                        <Input {...field} placeholder="Adınız" />
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
                     <FormLabel>{t("Auth.register.surname")}</FormLabel>
                     <FormControl>
                        <Input {...field} placeholder="Soyadınız" className="" />
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
                     <FormLabel>{t("Auth.register.mail")}</FormLabel>
                     <FormControl>
                        <Input {...field} placeholder="ornek@ornek.com" type="email" className="" />
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
                     <FormLabel>{t("Auth.register.password")}</FormLabel>
                     <FormControl>
                        <Input {...field} placeholder="**********" type="password" className="" />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <Button type="submit" className="cursor-pointer w-full h-11 font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30">
               Hesap Oluştur <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
         </form>
      </Form>
   );
}

export default Register;
