import { Button } from "~/app/_components/button";
import styles from "./new.module.css";
import {
	ArrowLeftIcon,
	CalendarPlus2Icon,
	CircleUserRoundIcon,
	MonitorSmartphoneIcon,
	TimerOffIcon,
	VideoIcon,
} from "lucide-react";
import { ButtonTypes } from "~/app/const/buttons";
import cardStyles from "../card.module.css";
import Link from "next/link";
import { NewFormField } from "./inputs";
import { useTranslations } from "next-intl";

export default function New() {
	const t = useTranslations("Index");

	return (
		<>
			<div className={styles.left}>
				<div className={cardStyles.miniHero}>
					<h1>{t("before_you_start")}</h1>
					<p>{t("provide_information")}</p>
				</div>

				<NewFormField image={<CircleUserRoundIcon />}>hi</NewFormField>

				<div className={styles.buttonStrip}>
					<Link href="start">
						<Button
							image={<ArrowLeftIcon />}
							type={ButtonTypes.SECONDARY}
						></Button>
					</Link>

					<Link href="new">
						<Button image={<VideoIcon />}>{t("start")}</Button>
					</Link>
				</div>
			</div>
			<div className={styles.right}>
				<Feature
					title={t("switch_easily")}
					image={<MonitorSmartphoneIcon />}
				>
					{t("switch_easily_desc")}
				</Feature>

				<Feature title={t("no_time_limit")} image={<TimerOffIcon />}>
					{t("no_time_limit_desc")}
				</Feature>
			</div>
		</>
	);
}

function Feature({
	title,
	image,
	children,
}: {
	title: string;
	image: React.ReactNode;
	children: string;
}) {
	return (
		<div className={styles.feature}>
			<div className={styles.featureHeading}>
				{image}
				<h3>{title}</h3>
			</div>
			<p>{children}</p>
		</div>
	);
}
