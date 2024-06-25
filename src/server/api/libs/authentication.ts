import { PrismaClient } from "@prisma/client";


export const validateLogin = async (database: PrismaClient, headers: Headers) => {
    const token = headers.get("Authorization");

    if (token) {
        const dbCall = await database.token.findUnique({
            where: {
                secret: token
            },
            select: {
                User: true
            }
        });

        if (dbCall) {
            if (dbCall.User) {
                return {
                    status: true,
                    user: dbCall.User
                }
            }
        } else {
            return {
                status: false,
                user: null
            }
        }
    }

    return {
        status: false,
        user: null
    }
}