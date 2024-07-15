"use client";
import { CircleUserRoundIcon, VideoIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { type FormEvent, useState } from "react";
import { Button } from "~/app/_components/button";
import { NewFormField } from "~/app/welcome/new/inputs";
import fieldStyles from "~/app/welcome/new/inputs.module.css";
import styles from "~/app/welcome/new/new.module.css";

export function PremeetingForm({
	token,
	defaultName,
}: {
	token: string;
	defaultName: string;
}) {
	const t = useTranslations("Index");
	const [name] = useState<string>(defaultName);
	const [submitting, setSubmitting] = useState(false);

	interface NewCallFormElements extends FormData {
		name: string;
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
		});

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
		}
	}

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
			</div>

			<div className={styles.buttonStrip}>
				<div></div>
				<Button
					props={{
						type: "submit",
						disabled: submitting,
					}}
					inProgress={submitting}
					image={<VideoIcon />}
				>
					{t("join")}
				</Button>
			</div>
		</form>
	);
}
