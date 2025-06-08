import { IntlPath } from "@/types/env";
import * as z from "zod";

export const loginSchema = (t: (key: IntlPath) => string) =>
   z.object({
      email: z
         .string({
            required_error: t("validations.requiredField"),
         })
         .email(t("validations.validEmail")),
      password: z
         .string({
            required_error: t("validations.requiredField"),
         })
         .min(8, t("validations.minPassword"))
         .regex(/[a-zA-Z]/, t("validations.passwordContainsCharacter"))
         .regex(/[0-9]/, t("validations.passwordContainsNumber"))
         .regex(/[^a-zA-Z0-9]/, t("validations.passwordContainsSpecial"))
         .trim(),
   });

export const registerSchema = (t: (key: IntlPath) => string) =>
   z.object({
      name: z
         .string({
            required_error: t("validations.requiredField"),
         })
         .min(2, t("validations.minName")),
      surname: z
         .string({
            required_error: t("validations.requiredField"),
         })
         .min(2, t("validations.minSurname")),
      email: z
         .string({
            required_error: t("validations.requiredField"),
         })
         .email(t("validations.validEmail"))
         .trim(),
      password: z
         .string({
            required_error: t("validations.requiredField"),
         })
         .min(8, t("validations.minPassword"))
         .regex(/[a-zA-Z]/, t("validations.passwordContainsCharacter"))
         .regex(/[0-9]/, t("validations.passwordContainsNumber"))
         .regex(/[^a-zA-Z0-9]/, t("validations.passwordContainsSpecial"))
         .trim(),
   });

export type RegisterFormValues = z.infer<ReturnType<typeof registerSchema>>;
export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;
