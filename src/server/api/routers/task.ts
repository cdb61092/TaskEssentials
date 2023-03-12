import { createTRPCRouter } from "../trpc";
import { protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

const createTaskInput = z.object({
  title: z.string(),
  content: z.string(),
});

const assignUserToTaskInput = z.object({
  taskId: z.string(),
  userId: z.string(),
});

export const taskRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(createTaskInput)
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.prisma.task.create({
        data: {
          title: input.title,
          content: input.content,
          creator: {
            connect: {
              email: ctx.session.user.email,
            },
          },
        },
      });

      return task;
    }),
  assignUserToTask: protectedProcedure
    .input(assignUserToTaskInput)
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.prisma.task.update({
        where: {
          id: "clf5ruu4v0000u6ekk4o225m4",
        },
        data: {
          assignedTo: {
            create: {
              user: {
                connect: {
                  id: input.userId,
                },
              },
            },
          },
        },
      });

      return task;
    }),
});
