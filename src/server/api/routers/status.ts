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

  getStatuses: protectedProcedure.query(async ({ ctx }) => {
    const statuses = await ctx.prisma.status.findMany();
    console.log(`statuses: ${JSON.stringify(statuses)}`);
    return statuses.map((status) => ({
      value: status.id,
      label: status.status,
      color: status.color,
    }));
  }),
});
