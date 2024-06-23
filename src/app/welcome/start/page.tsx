import { Button } from "~/app/_components/button";
import styles from "./start.module.css";
import { CalendarPlus2, CalendarPlus2Icon, VideoIcon } from "lucide-react";
import { ButtonTypes } from "~/app/const/buttons";
import cardStyles from "../card.module.css";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Start() {
	const t = useTranslations("Index");

	return (
		<>
			<div className={styles.left}>
				<div className={cardStyles.miniHero}>
					<h1>{t("product_name")}</h1>
					<p>{t("tag_alert")}</p>
				</div>

				<div className={styles.buttonStrip}>
					<Link href="new">
						<Button image={<VideoIcon />}>{t("new_call")}</Button>
					</Link>
					<Button
						image={<CalendarPlus2Icon />}
						type={ButtonTypes.SECONDARY}
					></Button>
				</div>

				<p>{t("call_link_advisory")}</p>
			</div>
		</>
	);
}
