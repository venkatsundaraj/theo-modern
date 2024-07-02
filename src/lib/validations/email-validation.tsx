import { z } from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
  // .refine((val) => val === "venkatesh@firebrandlabs.in", {
  //   message: "Please enter correct email",
  // }),
});

export type UserAuthSchema = z.infer<typeof userAuthSchema>;

export const emailSchema = z.object({
  userEmail: z.string().email(),
});
