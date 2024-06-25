import { z } from "zod";
import crypto from "crypto"

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { validateLogin } from "../libs/authentication";

export const userRouter = createTRPCRouter({
    create: publicProcedure
        .mutation(async ({ ctx, input }) => {
            const secret: Buffer = await new Promise((res) => crypto.randomBytes(48, (err, buffer) => res(buffer)));
            const b64 = secret.toString('base64')
            const create = await ctx.db.user.create({
                data: {
                    tokens: {
                        create: {
                            secret: b64
                        }
                    }
                },
            });

            if (create) {
                return {
                    token: b64
                }
            } else {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "The user could not be created.",
                })
            }
        }),
    view: publicProcedure.query(async ({ ctx }) => {
        const authHeader = ctx.headers.get("Authorization");
        if (!authHeader) { return null }

        const dbCall = await ctx.db.token.findUnique({
            where: {
                secret: authHeader
            },
            select: {
                User: true
            }
        })

        if (dbCall?.User) {
            console.log("Returning")

            return dbCall.User
        } else {
            console.log("Throwing NOT_FOUND")
            throw new TRPCError({
                code: "NOT_FOUND",
            })
        }
    }),
    update: publicProcedure.input(z.object({
        name: z.string().min(1),
    })).mutation(async ({ ctx, input }) => {
        const name = input.name;
        const authenticated = await validateLogin(ctx.db, ctx.headers);

        if (authenticated.status) {
            const user = authenticated.user;
            if (name) {
                if (user) {
                    const dbCall = await ctx.db.user.update({
                        where: {
                            id: user.id
                        },
                        data: {
                            name
                        }
                    })
                }
            }
        }
    })
});
