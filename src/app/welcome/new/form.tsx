"use client";

import {
	CircleUserRoundIcon,
	LockKeyholeOpenIcon,
	ArrowLeftIcon,
	VideoIcon,
	LockKeyholeIcon,
} from "lucide-react";
import { ButtonLink, Button } from "~/app/_components/button";
import { ButtonTypes } from "~/app/const/buttons";
import { NewFormField } from "./inputs";
import styles from "./new.module.css";
import { useTranslations } from "next-intl";
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import fieldStyles from "./inputs.module.css";
import { checkToken, createUser } from "~/app/libs/authentication";
import { type User } from "~/app/const/user";
import { CallPrivacy } from "@prisma/client";
import { useRouter } from "next/navigation";

export function NewCallForm() {
	const t = useTranslations("Index");
	const [privacy, setPrivacy] = useState<CallPrivacy>(CallPrivacy.ANYONE);
	const [name, setName] = useState<string>("");
	const [token, setToken] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const router = useRouter();

	interface NewCallFormElements extends FormData {
		name: string;
		call_privacy: CallPrivacy;
	}

	async function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setSubmitting(true);
		const formData = new FormData(
			event.currentTarget
		) as NewCallFormElements;
		const form = Object.fromEntries(formData);
		console.log({
			name: form.name,
			call_privacy: form.call_privacy,
		});

		if (!token) {
			return setSubmitting(false);
		}

		const updateName = await fetch("/api/user/update", {
			method: "POST",
			headers: {
				authorization: token,
			},
			body: JSON.stringify({
				name: form.name,
			}),
		});

		if (updateName.ok) {
			const callCreation = await fetch("/api/call/create", {
				method: "POST",
				headers: {
					authorization: token,
				},
				body: JSON.stringify({
					privacy: form.call_privacy,
				}),
			});

			if (callCreation.ok) {
				const data: { id: string } = await callCreation.json();
				router.push(`/call/${data.id}`);
			}
		}
	}

	useEffect(() => {
		checkToken(setToken);
	}, []);

	useEffect(() => {
		const ls = window.localStorage;

		if (token) {
			fetch("/api/user/view", {
				method: "GET",
				headers: {
					Authorization: token,
				},
			}).then((response) => {
				if (response.ok)
					response.json().then((data: User) => setName(data.name));
				if (response.status == 403)
					createUser((token: string) => {
						ls.setItem("token", token);
						setToken(token);
					});
			});
		}
	}, [token]);

	return (
		<form className={fieldStyles.form} onSubmit={submit}>
			<div className={styles.fields}>
				<NewFormField image={<CircleUserRoundIcon />}>
					<input
						required
						name={"name"}
						defaultValue={name}
						className={fieldStyles.headlessInput}
						type={"text"}
						placeholder={t("your_name")}
					></input>
				</NewFormField>

				<NewFormField
					image={
						privacy == CallPrivacy.ANYONE ? (
							<LockKeyholeOpenIcon />
						) : (
							<LockKeyholeIcon />
						)
					}
				>
					<select
						name={"call_privacy"}
						onChange={(e: ChangeEvent<HTMLSelectElement>) => {
							setPrivacy(e.target.value as CallPrivacy);
						}}
						className={fieldStyles.select}
					>
						<option value={CallPrivacy.ANYONE}>
							{t("call_privacy.anyone")}
						</option>
						<option value={CallPrivacy.APPROVAL}>
							{t("call_privacy.approval")}
						</option>
						<option value={CallPrivacy.INVITED}>
							{t("call_privacy.invited")}
						</option>
					</select>
				</NewFormField>
			</div>

			<div className={styles.buttonStrip}>
				<ButtonLink
					image={<ArrowLeftIcon />}
					type={ButtonTypes.SECONDARY}
					href={"start"}
				></ButtonLink>

				<Button
					props={{
						type: "submit",
						disabled: submitting,
					}}
					inProgress={submitting}
					image={<VideoIcon />}
				>
					{t("start")}
				</Button>
			</div>
		</form>
	);
}
