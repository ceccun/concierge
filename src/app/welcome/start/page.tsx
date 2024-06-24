"use client";

import { Button, ButtonLink } from "~/app/_components/button";
import styles from "./start.module.css";
import { CalendarPlus2Icon, VideoIcon } from "lucide-react";
import { ButtonTypes } from "~/app/const/buttons";
import cardStyles from "../card.module.css";
import { useTranslations } from "next-intl";
import { Suspense, use, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { api } from "~/trpc/react";

export default function Start() {
	return (
		<>
			<Suspense>
				<LeftSide />
			</Suspense>
		</>
	);
}

function LeftSide() {
	const t = useTranslations("Index");

	// const [user, setUser] = useState<User | undefined>();
	const user = api.user.view.useQuery();
	const createUser = api.user.create.useMutation();

	// checkOrCreateUser(setUser);

	useEffect(() => {
		if (user.failureReason?.data?.code == "NOT_FOUND") {
			const ls = window.localStorage;
			createUser.mutate(undefined, {
				onSuccess: ({ token }) => {
					ls.setItem("token", token);
				},
			});
		}
	}, [user.failureReason]);

	if (!user.data) {
		return (
			<div className={styles.left}>
				<div className={cardStyles.miniHero}>
					<Skeleton width={200} height={44} />
					<Skeleton width={250} height={20} />
				</div>

				<div className={styles.buttonStrip}>
					<Skeleton width={126} height={48} borderRadius={12} />
					<Skeleton width={48} height={48} borderRadius={12} />
				</div>

				<p>{t("call_link_advisory")}</p>
			</div>
		);
	}

	return (
		<div className={styles.left}>
			<div className={cardStyles.miniHero}>
				{user.data.name != null && (
					<h1>{t("greeting", { name: user.data.name })}</h1>
				)}
				{user.data.name == null && <h1>{t("product_name")}</h1>}
				<p>{t("tag_alert")}</p>
			</div>

			<div className={styles.buttonStrip}>
				<ButtonLink href={"new"} image={<VideoIcon />}>
					{t("new_call")}
				</ButtonLink>
				<Button
					image={<CalendarPlus2Icon />}
					type={ButtonTypes.SECONDARY}
				></Button>
			</div>

			<p>{t("call_link_advisory")}</p>
		</div>
	);
}
