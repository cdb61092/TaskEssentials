import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { taskRouter } from "./routers/task";
import { statusRouter } from "./routers/status";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  task: taskRouter,
  status: statusRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
