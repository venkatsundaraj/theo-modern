import { z } from "zod";
import { textValidation } from "~/lib/validations/text-validation";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return `Damn You are right, ${input.text}`;
    }),
  getKeys: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.keys.findFirst({
      where: (table, func) => func.eq(table.title, "Javascript"),
    });
  }),
  createPerson: protectedProcedure
    .input(textValidation)
    .query(({ ctx, input }) => {
      console.log(input, ctx);
      return `Hello ${input.text}`;
    }),
});
