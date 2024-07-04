import { MicIcon, MicOffIcon, UnplugIcon, VideoOffIcon } from "lucide-react";
import { Button } from "../../_components/button";
import { useTranslations } from "next-intl";
import { ButtonTypes } from "~/app/const/buttons";
import styles from "./call-bar.module.css";

export const CallBar = () => {
	const t = useTranslations("Index");

	return (
		<div className={styles.buttonStrip}>
			<Button image={<UnplugIcon />} type={ButtonTypes.NEGATIVE}>
				{t("disconnect")}
			</Button>
			<Button
				image={<VideoOffIcon />}
				type={ButtonTypes.SECONDARY}
			></Button>
			<Button image={<MicIcon />}></Button>
		</div>
	);
};
