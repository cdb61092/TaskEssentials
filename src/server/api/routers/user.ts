import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';
import argon2 from 'argon2';
import { User } from '../../auth';

const registerInput = z.object({
	email: z.string(),
	password: z.string(),
	name: z.string(),
})

const registerOutput = z.object({
	id: z.number(),
	email: z.string(),
	name: z.string(),
})

type RegisterOutput = {
	id: string;
	email: string | null;
	name: string | null;
	password: string | null;
}

export const userRouter = createTRPCRouter({
	// login: publicProcedure
	// 	.input(z.object({ email: z.string(), password: z.string() }))
	// 	.mutation(async ({ input }) => {
	// 		const user = await prisma.user.findFirst({
	// 			where: {
	// 				email: input.email,
	// 			},
	// 		});
	// 		const passwordValid = await argon2.verify(
	// 			user?.password || '',
	// 			input.password
	// 		);

	// 		if (!passwordValid) {
	// 			throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid login information' });
	// 		}
	// 		const token = jwt.sign(
	// 			{ email: input.email },
	// 			process.env.JWT_SECRET || ''
	// 		);
	// 		return { token, user };
	// 	}),
	// loginWithToken: publicProcedure
	// 	.mutation(async ({ ctx }) => {
	// 		if (ctx.user) {
	// 			return { user: ctx.user };
	// 		}
	// 		throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid token' });
	// 	}),
	register: publicProcedure
		.input(registerInput)
		.mutation(async ({ input, ctx })  => {
			return ctx.prisma.user.create({
				data: {
					email: input.email,
					password: await argon2.hash(input.password),
					name: input.name,
				},
			});
		}),

	test: protectedProcedure.query(() => "hello")
});
