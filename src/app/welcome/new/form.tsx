"use client";

import {
	CircleUserRoundIcon,
	LockKeyholeOpenIcon,
	ArrowLeftIcon,
	VideoIcon,
	LockKeyholeIcon,
} from "lucide-react";
import { ButtonLink } from "~/app/_components/button";
import { ButtonTypes } from "~/app/const/buttons";
import {
	NewFormField,
	HeadlessTextInput,
	HeadlessDropdownInput,
} from "./inputs";
import styles from "./new.module.css";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CallPrivacy } from "~/app/const/calls";

export function NewCallForm() {
	const t = useTranslations("Index");
	const [privacy, setPrivacy] = useState<CallPrivacy>(CallPrivacy.ANYONE);

	return (
		<>
			<NewFormField image={<CircleUserRoundIcon />}>
				<HeadlessTextInput fieldName={t("your_name")} />
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
				<HeadlessDropdownInput
					items={{
						[CallPrivacy.ANYONE]: "Anyone can join",
						[CallPrivacy.INVITED]: "Only those invited",
					}}
					setValue={setPrivacy}
				/>
			</NewFormField>

			<div className={styles.buttonStrip}>
				<ButtonLink
					image={<ArrowLeftIcon />}
					type={ButtonTypes.SECONDARY}
					href={"start"}
				></ButtonLink>
				<ButtonLink image={<VideoIcon />} href={"new"}>
					{t("start")}
				</ButtonLink>
			</div>
		</>
	);
}
