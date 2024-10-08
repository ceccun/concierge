import styles from "./new.module.css";
import { MonitorSmartphoneIcon, TimerOffIcon } from "lucide-react";
import cardStyles from "~/app/_components/card/card.module.css";
import { useTranslations } from "next-intl";
import { NewCallForm } from "./form";

export default function New() {
	const t = useTranslations("Index");

	return (
		<>
			<div className={styles.left}>
				<div className={cardStyles.miniHero}>
					<h1>{t("before_you_start")}</h1>
					<p>{t("provide_information")}</p>
				</div>

				<NewCallForm />
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
