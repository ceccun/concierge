import { db } from "~/app/libs/db";
import { validateLogin } from "~/app/libs/authentication";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const authenticated = await validateLogin(db, req.headers);

    if (authenticated.status && authenticated.user) {
        return NextResponse.json({
            name: authenticated.user.name,
            plan: authenticated.user.plan
        })
    } else {
        return NextResponse.json({ status: "UNAUTHORISED" }, { status: 403 })
    }

};

