import { z } from "zod";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY;
const APP_ENV = process.env.EXPO_PUBLIC_APP_ENV;

const EnvSchema = z.object({
  SUPABASE_URL: z.url(),
  SUPABASE_KEY: z.string().min(1),
  APP_ENV: z.enum(["development", "staging", "production"]),
});

const parsed = EnvSchema.safeParse({
  SUPABASE_URL,
  SUPABASE_KEY,
  APP_ENV,
});

let ENV: z.infer<typeof EnvSchema> | null = null;
let ENV_ERROR: unknown = null;

if (!parsed.success) {
  const tree = z.treeifyError(parsed.error);
  ENV_ERROR = tree;
  console.error("Invalid environment variables:", JSON.stringify(tree, null, 2));
} else {
  ENV = parsed.data;
}

export { ENV, ENV_ERROR };
