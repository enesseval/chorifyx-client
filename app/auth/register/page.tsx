"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { RegisterFormValues, registerSchema } from "@/lib/validations/authValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { authApi } from "@/services/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function RegisterPage() {
   const t = useTranslations();
   const router = useRouter();

   const containerVariants = {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
         opacity: 1,
         scale: 1,
         transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
            staggerChildren: 0.1,
         },
      },
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
   };

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
      const toastId = toast.loading("Kayıt oluşturuluyor.");
      try {
         const response = await authApi.register(data);

         toast.success("Kayıt başarılı", { id: toastId });

         router.push(`/${response.username}`);
      } catch (error: any) {
         const errorKey = error?.response?.data?.error || "UNKNOWN";
         const translatedMessage = t(`errors.${errorKey}`);

         toast.error(translatedMessage, { id: toastId });
      }
   };

   return (
      <motion.div
         variants={containerVariants}
         initial="hidden"
         animate="visible"
         className="mx-auto flex w-full max-w-md flex-col items-center justify-center space-y-6 rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg"
      >
         <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Chorifyx'e Katılın</h1>
            <p className="mt-2 text-sm text-gray-300">Daha organize bir hayata ilk adımı atın.</p>
         </motion.div>

         <motion.div variants={itemVariants} className="w-full">
            <Button variant="outline" className="cursor-pointer w-full bg-white/10 border-white/30 hover:bg-white/20 text-white">
               Google ile Devam Et
            </Button>
         </motion.div>

         <motion.div variants={itemVariants} className="flex w-full items-center gap-4">
            <hr className="w-full border-white/20" />
            <span className="text-xs text-gray-400">VEYA</span>
            <hr className="w-full border-white/20" />
         </motion.div>

         <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid w-full gap-4">
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>{t("Auth.register.name")}</FormLabel>
                        <FormControl>
                           <motion.div variants={itemVariants} className="grid gap-2">
                              <Input {...field} placeholder="Adınız" />
                           </motion.div>
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
                           <motion.div variants={itemVariants} className="grid gap-2">
                              <Input {...field} placeholder="Soyadınız" />
                           </motion.div>
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
                           <motion.div variants={itemVariants} className="grid gap-2">
                              <Input {...field} placeholder="ornek@ornek.com" type="email" />
                           </motion.div>
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
                           <motion.div variants={itemVariants} className="grid gap-2">
                              <Input {...field} placeholder="**********" type="password" />
                           </motion.div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <motion.div variants={itemVariants} className="pt-2">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                     <Button className="cursor-pointer w-full h-11 font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30">
                        Hesap Oluştur <ArrowRight className="ml-2 h-4 w-4" />
                     </Button>
                  </motion.div>
               </motion.div>
            </form>
         </Form>

         <motion.div variants={itemVariants} className="text-center text-sm text-gray-300">
            Zaten bir hesabın var mı?{" "}
            <Link href="/auth/login" className="font-medium text-white underline hover:text-blue-300">
               Giriş yap
            </Link>
         </motion.div>
      </motion.div>
   );
}
