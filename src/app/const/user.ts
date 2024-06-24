import { SubscriptionModels } from "@prisma/client";

export type User = {
    name: string;
    plan: SubscriptionModels
}
