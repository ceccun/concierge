import { WebSocket } from "ws";
import { IncomingMessage } from "http";
import { WebSocketServer } from "ws";
import { validateLogin } from "~/app/libs/authentication";
import { db } from "~/app/libs/db";
import { redis } from "~/app/libs/redis";

type ReceiveModel = {
    authorisation: string;
    id: string;
    action: string;
    payload?: any;
}

export function SOCKET(client: WebSocket, request: IncomingMessage, server: WebSocketServer) {
    console.log("A client has connected");

    client.on("message", async (message: string) => {
        const parsedMsg: ReceiveModel = JSON.parse(message);

        if (parsedMsg.action == "register") {
            const simulatedHeaders = new Headers();
            simulatedHeaders.set("authorization", parsedMsg.authorisation);

            const authenticated = await validateLogin(db, simulatedHeaders);

            if (!authenticated.status || !authenticated.user) {
                return client.close(4003);
            }

            const participantEvidence = await db.callParticipant.findFirst({
                where: {
                    User: {
                        id: authenticated.user?.id
                    },
                    Call: {
                        id: parsedMsg.id
                    }
                }
            });

            if (!participantEvidence) {
                return client.close(4003);
            }

            await redis.set("hello", "world");

            client.send(JSON.stringify({
                response: await redis.get("hello")
            }))
        }
    });

    client.on("close", () => {
        console.log("A client disconnected")
    })
}