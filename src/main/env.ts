import * as z from "zod";

const env = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.string().default("development"),
});

export default env.parse(process.env, {
  errorMap: (error) =>
    new Error("Invalid environment variable(s): " + error.message),
});
