import { z } from "zod";

export const textValidation = z.object({
  text: z.string().min(1),
  age: z.string().min(1),
});

export type textValidationType = z.infer<typeof textValidation>;
