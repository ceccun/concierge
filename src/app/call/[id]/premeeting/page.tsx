"use client";
import { Card } from "~/app/_components/card";
import styles from "./preemeeting.module.css";
import cardStyles from "~/app/_components/card/card.module.css";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { checkToken } from "~/app/libs/authentication";
import { CallPrivacy, CallType } from "@prisma/client";
import { User } from "~/app/const/user";
import { PremeetingForm } from "./callForm";

export default function Premeeting({ params }: { params: { id: string } }) {
	const t = useTranslations("Index");

	const callID = params.id;
	const [token, setToken] = useState<string | null>(null);
	const [state, setState] = useState<"loading" | "not_found" | "found">(
		"loading"
	);
	const [name, setName] = useState<string | null>();
	const [approval, setApproval] = useState(false);

	useEffect(() => {
		checkToken(setToken);
	}, []);

	useEffect(() => {
		if (!token) return;

		fetch(`/api/call/get?id=${callID}`, {
			headers: {
				Authorization: token,
			},
		}).then((res) => {
			if (!res.ok) {
				return setState("not_found");
			}

			res.json().then(
				(data: {
					type: CallType;
					id: string;
					active: boolean;
					timeStarted: Date;
					privacy: CallPrivacy;
				}) => {
					setState("found");
					setApproval(
						data.privacy == CallPrivacy.APPROVAL ? true : false
					);
				}
			);

			fetch("/api/user/view", {
				headers: {
					Authorization: token,
				},
			}).then((res) => {
				if (!res.ok) {
					return;
				}

				res.json().then((data: User) => {
					setName(data.name);
				});
			});
		});
	}, [token]);

	return (
		<Card>
			{state == "found" && name && (
				<>
					<div className={styles.left}>
						<div className={cardStyles.miniHero}>
							<h1>{t("join_this_call")}</h1>
							<p>{t("provide_information_anyone")}</p>
						</div>

						<PremeetingForm defaultName={name} token={token!} />
					</div>
					<div className={styles.right}></div>
				</>
			)}

			{state == "not_found" && (
				<>
					<div className={cardStyles.miniHero}>
						<h1>Call unavailable</h1>
						<p>
							This call does not exist or is not accepting new
							participants.
						</p>
					</div>
				</>
			)}
		</Card>
	);
}
