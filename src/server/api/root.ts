// /server/api/root.ts
import { todoRouter } from "./routers/todo";
import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  todo: todoRouter,
});

export type AppRouter = typeof appRouter; // 追加: AppRouter の型をエクスポート
