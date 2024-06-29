import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/app/libs/db";
import { validateLogin } from "~/app/libs/authentication";
import { NextResponse } from "next/server";

type UpdateFormat = {
    name?: string
}

export const POST = async (req: Request) => {
    const name = (await req.json() as UpdateFormat).name;
    const authenticated = await validateLogin(db, req.headers);

    if (authenticated.status) {
        const user = authenticated.user;
        if (name) {
            if (user) {
                const dbCall = await db.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        name
                    }
                })

                if (dbCall) {
                    return NextResponse.json({ status: "OK" })
                } else {
                    return NextResponse.json({
                        status: "INTERNAL_SERVER_ERROR"
                    }, { status: 500 })
                }
            }
        } else {
            return NextResponse.json({
                status: "MISSING_DATA"
            }, { status: 400 })
        }
    } else {
        return NextResponse.json({
            status: "UNAUTHORISED"
        }, { status: 403 })
    }
};
