import { z } from "zod";

export const SignupFormSchema = z.object({
   name: z
      .string({
         required_error: "Bu alan zorunludur.",
      })
      .min(2, "Adınız en az 2 karakter olmalı."),
   surname: z
      .string({
         required_error: "Bu alan zorunludur.",
      })
      .min(2, "Soyadınız en az 2 karakter olmalı."),
   email: z
      .string({
         required_error: "Bu alan zorunludur.",
      })
      .email({ message: "Lütfen geçerli bir mail adresi giriniz." })
      .trim(),
   password: z
      .string({
         required_error: "Bu alan zorunludur.",
      })
      .min(8, { message: "Parolanız en az 8 karekter uzunluğunda olmalı." })
      .regex(/[a-zA-Z]/, { message: "Parolanız en az 1 karekter içermeli." })
      .regex(/[0-9]/, { message: "Parolanız en az bir sayı içermeli." })
      .regex(/[^a-zA-Z0-9]/, {
         message: "Parolanız en az bir özel karakter içermeli.",
      })
      .trim(),
});

export const SigninFormSchema = z.object({
   email: z
      .string({
         required_error: "Bu alan zorunludur.",
      })
      .email({ message: "Lütfen geçerli bir mail adresi giriniz." })
      .trim(),
   password: z
      .string({
         required_error: "Bu alan zorunludur.",
      })
      .min(8, { message: "Parolanız en az 8 karekter uzunluğunda olmalı." })
      .regex(/[a-zA-Z]/, { message: "Parolanız en az 1 karekter içermeli." })
      .regex(/[0-9]/, { message: "Parolanız en az bir sayı içermeli." })
      .regex(/[^a-zA-Z0-9]/, {
         message: "Parolanız en az bir özel karakter içermeli.",
      })
      .trim(),
});
