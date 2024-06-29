import { CallPrivacy } from "@prisma/client"
import { NextResponse } from "next/server";

type CreateCall = {
    privacy: CallPrivacy
}

export const POST = async (req: Request) => {
    const body: CreateCall = await req.json();

    return NextResponse.json(body)
}