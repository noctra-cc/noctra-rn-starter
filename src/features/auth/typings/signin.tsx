import { t } from "i18next";
import { z } from "zod";

const signInSchema = z.object({
  email: z
    .email(t("auth.invalidEmail") || "Invalid email format")
    .nonempty(t("auth.emailRequired") || "Email is required"),
  password: z
    .string()
    .nonempty(t("auth.passwordRequired") || "Password is required")
    .min(
      6,
      t("auth.passwordTooShort") || "Password must be at least 6 characters"
    ),
});

type SignInForm = z.infer<typeof signInSchema>;

export { signInSchema };
export type { SignInForm };
