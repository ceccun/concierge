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
import { ChangeEvent, FormEvent, useState } from "react";
import { CallPrivacy } from "~/app/const/calls";
import fieldStyles from "./inputs.module.css";

export function NewCallForm() {
	const t = useTranslations("Index");
	const [privacy, setPrivacy] = useState<CallPrivacy>(CallPrivacy.ANYONE);

	interface NewCallFormElements extends FormData {
		name: string;
		call_privacy: CallPrivacy;
	}

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(
			event.currentTarget
		) as NewCallFormElements;
		const form = Object.fromEntries(formData);
		console.log({
			name: form.name,
			call_privacy: form.call_privacy,
		});
	}

	return (
		<form className={fieldStyles.form} onSubmit={submit}>
			<div className={styles.fields}>
				<NewFormField image={<CircleUserRoundIcon />}>
					<input
						required
						name={"name"}
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
					}}
					image={<VideoIcon />}
				>
					{t("start")}
				</Button>
			</div>
		</form>
	);
}
