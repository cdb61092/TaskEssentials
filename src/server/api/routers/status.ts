import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const createStatusInput = z.object({
  status: z.string(),
});

export const statusRouter = createTRPCRouter({
  createStatus: protectedProcedure
    .input(createStatusInput)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.status.create({
        data: {
          status: input.status,
        },
      });
    }),
});
