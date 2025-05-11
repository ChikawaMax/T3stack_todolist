import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return db.todo.findMany({ orderBy: { createdAt: "desc" } });
  }),
  add: publicProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(({ input }) => {
      return db.todo.create({ data: { title: input.title } });
    }),
  toggle: publicProcedure
    .input(z.object({ id: z.string(), completed: z.boolean() }))
    .mutation(({ input }) => {
      return db.todo.update({
        where: { id: input.id },
        data: { completed: input.completed },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return db.todo.delete({ where: { id: input.id } });
    }),
});
