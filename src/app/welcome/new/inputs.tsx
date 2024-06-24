import { ChangeEvent, ChangeEventHandler } from "react";
import styles from "./inputs.module.css";

export function NewFormField({
	image,
	children,
}: {
	image: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<div className={styles.field}>
			<div className={styles.image}>{image}</div>
			{children}
		</div>
	);
}
