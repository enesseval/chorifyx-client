import { LoginFormValues, loginSchema } from "@/lib/validations/authValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/services/api";
import { useRouter } from "next/navigation";

function Login() {
   const t = useTranslations();
   const router = useRouter();
   const form = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema(t)),
      defaultValues: {
         email: "",
         password: "",
      },
      mode: "onSubmit",
   });

   const handleSubmit = async (data: LoginFormValues) => {
      const toastId = toast.loading("Giriş Yapılıyor");
      try {
         const response = await authApi.login(data);

         toast.success("Giriş Yapıldı. Yönlendiriliyorunuz.", { id: toastId });

         router.push(`/${response.username}`);
      } catch (error: any) {
         const errorKey = error?.response?.data?.error || "UNKNOWN";
         const translatedMessage = t(`errors.${errorKey}`);

         toast.error(translatedMessage, { id: toastId });
      }
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mx-10 my-4 min-w-[300px]">
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>{t("auth.mail")}</FormLabel>
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
                     <FormLabel>{t("auth.password")}</FormLabel>
                     <FormControl>
                        <Input {...field} placeholder="**********" type="password" className="" />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <Button type="submit" className="cursor-pointer w-full h-11 font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30">
               {t("auth.login")} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
         </form>
      </Form>
   );
}

export default Login;
