import type { NextApiRequest } from "next";
import crypto from "crypto";
import { db } from "~/app/libs/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const secret: Buffer = await new Promise((res) =>
        crypto.randomBytes(48, (err, buffer) => res(buffer))
    );
    const b64 = secret.toString("base64");
    const create = await db.user.create({
        data: {
            tokens: {
                create: {
                    secret: b64,
                },
            },
        },
    });

    if (create) {
        return NextResponse.json({
            token: b64,
        }, { status: 200 });
    } else {
        return NextResponse.json({
            status: "INTERNAL_SERVER_ERROR"
        }, { status: 500 })
    }
};