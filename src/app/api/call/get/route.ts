import { NextResponse } from "next/server";
import { validateLogin } from "~/app/libs/authentication";
import { db } from "~/app/libs/db";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
        return NextResponse.json({
            status: "NOT_FOUND"
        }, {
            status: 404
        })
    }

    const authenticated = await validateLogin(db, req.headers);

    if (!authenticated.status || !authenticated.user) {
        return NextResponse.json({
            status: "UNAUTHORISED"
        }, {
            status: 403
        })
    }

    const call = await db.call.findFirst({
        where: {
            id: id,
            participants: {
                some: {
                    User: {
                        id: authenticated.user.id
                    }
                }
            }
        },
        select: {
            participants: true,
            privacy: true,
            active: true,
            timeStarted: true,
            type: true,
            id: true
        }
    });

    if (!call) {
        return NextResponse.json({
            status: "NOT_FOUND"
        }, {
            status: 404
        })
    }

    return NextResponse.json(call)
}