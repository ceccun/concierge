import { type PrismaClient } from "@prisma/client";
import { type IncomingHttpHeaders } from "http";


export const validateLogin = async (database: PrismaClient, headers: Headers) => {
    const token = headers.get("authorization");


    if (token) {
        console.log("Token found")
        const dbCall = await database.token.findUnique({
            where: {
                secret: token
            },
            select: {
                User: true
            }
        });


        if (dbCall) {
            console.log("DB record found")

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

export const checkToken = (setToken: (token: string) => void) => {
    const ls = window.localStorage;
    const token = ls.getItem("token");
    if (token) {
        setToken(token);
    } else {
        createUser((token: string) => {
            ls.setItem("token", token);
            setToken(token);
        });
    }
}

export const createUser = (callback: (token: string) => void) => {
    fetch("/api/user/new", {
        method: "POST",
    }).then((response) => {
        if (response.ok) {
            response.json().then((data: { token: string }) => {
                if (data.token) {
                    callback(data.token)
                }
            })
        }
    })
}