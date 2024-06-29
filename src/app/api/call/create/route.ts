import { CallPrivacy, CallRoles } from "@prisma/client"
import { NextResponse } from "next/server";
import { validateLogin } from "~/app/libs/authentication";
import { db } from "~/app/libs/db";

type CreateCall = {
    privacy: CallPrivacy
}

export const POST = async (req: Request) => {
    const body: CreateCall = await req.json();
    const authenticated = await validateLogin(db, req.headers);

    const currentDate = new Date(Date.now());

    if (authenticated.status && authenticated.user) {
        const createCall = await db.call.create({
            data: {
                privacy: body.privacy,
                timeStarted: currentDate,
                active: true
            }
        });

        if (createCall) {
            const addUser = await db.callParticipant.create({
                data: {
                    Call: {
                        connect: {
                            id: createCall.id
                        }
                    },
                    User: {
                        connect: {
                            id: authenticated.user.id
                        }
                    },
                    role: CallRoles.HOST
                }
            });

            if (addUser) {
                return NextResponse.json({
                    id: createCall.id
                });
            } else {
                return NextResponse.json({
                    status: "INTERNAL_SERVER_ERROR"
                }, {
                    status: 500
                })
            }
        } else {
            return NextResponse.json({
                status: "INTERNAL_SERVER_ERROR"
            }, {
                status: 500
            })
        }
    } else {
        return NextResponse.json({
            status: "UNAUTHORISED"
        }, {
            status: 403
        })
    }
}