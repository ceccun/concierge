import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/app/libs/db";
import { validateLogin } from "~/app/libs/authentication";

interface UpdateFormat extends NextApiRequest {
    body: {
        name?: string
    }
}

const handler = async (req: UpdateFormat, res: NextApiResponse) => {
    if (req.method == "POST") {
        const name = req.body.name;
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
                        return res.status(200).json({ status: "OK" })
                    }
                }
            }
        }
    }
};

export default handler;
