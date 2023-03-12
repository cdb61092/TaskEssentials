import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import argon2 from "argon2";

const registerInput = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
});

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerInput)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.user.create({
        data: {
          email: input.email,
          password: await argon2.hash(input.password),
          name: input.name,
        },
      });
    }),
});
