/* eslint-disable @typescript-eslint/no-explicit-any */
import { type WebSocket } from "ws";
import { type IncomingMessage } from "http";
import { type WebSocketServer } from "ws";
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
    const participantSubscription = redis.duplicate();
    let participantChannel = ``;
    let informationChannel = ``;
    let userID = ``;
    let valid = false;

    async function handleEvent(message: string, channel: string) {
        if (channel.endsWith(":participants")) {
            console.log("Participants Channel")
            client.send(message)
        }
    }

    async function parseMessage(message: string) {
        const parsedMsg: ReceiveModel = JSON.parse(message);

        if (parsedMsg.action == "register") {

            const simulatedHeaders = new Headers();
            simulatedHeaders.set("authorization", parsedMsg.authorisation);

            const authenticated = await validateLogin(db, simulatedHeaders);

            if (!authenticated.status || !authenticated.user) {
                return client.close(4003);
            }

            // Check that the user has a relationship to the call
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

            // Get the call information
            const call = await db.call.findFirst({
                where: {
                    participants: {
                        some: {
                            id: participantEvidence.id
                        }
                    }
                }
            })

            if (!call) {
                // This should never happen, but if it does it means there must be some sort of corruption on the database, still safeguard for it.
                return client.close(1011);
            }

            const callId = parsedMsg.id;

            // Redis channels for calls and real-time messaging, learn more about the usage of Ceccun's use of Redis at ~/libs/redis.ts
            participantChannel = `call:${callId}:participants`;
            informationChannel = `call:${callId}:information`;

            if (!(await redis.exists(informationChannel))) {
                await redis.set(informationChannel, JSON.stringify(call));
            }



            userID = participantEvidence.userId!;


            console.log("Made it here!")
            if (await redis.lPos(participantChannel, userID) == null) {
                await redis.lPush(participantChannel, [userID])
            }


            // Broadcast this out to all the other members of the call
            participantSubscription.on("error", (err: Error) => console.error(err));
            await participantSubscription.connect();

            participantSubscription.subscribe(participantChannel, handleEvent);

            // Announce join status to all other connected users
            redis.publish(participantChannel, JSON.stringify({
                action: "join",
                userID: userID
            }));

            valid = true

            // Push other participants over to client
            const participants = await redis.lRange(participantChannel, 0, -1);


            for (const participant of participants) {
                client.send(JSON.stringify(
                    {
                        action: "join",
                        userID: participant
                    }
                ))
            }
            console.log(participants)
        }
    }

    client.on("message", (message: string) => {
        parseMessage(message);
    });

    client.on("close", () => {
        if (!valid) {
            return;
        }

        redis.publish(participantChannel, JSON.stringify({
            action: "disconnect",
            userID: userID
        }));
        participantSubscription.unsubscribe(participantChannel)

        redis.lRem(participantChannel, 1, userID)
        console.log("Disconnected user")
    })
}