import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return `Damn You are right, ${input.text}`;
    }),
  getKeys: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.keys.findFirst();
  }),
});
