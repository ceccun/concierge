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
			{image}
			{children}
		</div>
	);
}

export function HeadlessTextInput({ fieldName }: { fieldName: string }) {
	return <input type={"text"} placeholder={fieldName}></input>;
}
