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

export function HeadlessTextInput({ fieldName }: { fieldName: string }) {
	return (
		<input
			className={styles.headlessInput}
			type={"text"}
			placeholder={fieldName}
		></input>
	);
}

interface Dropdown {
	[key: string]: string;
}

export function HeadlessDropdownInput({
	items,
	setValue,
}: {
	items: Dropdown;
	setValue: any;
}) {
	return (
		<select
			onChange={(event: ChangeEvent<HTMLSelectElement>) => {
				setValue(event.target.value);
			}}
			className={styles.select}
		>
			{Object.entries(items).map(([key, value]) => (
				<option value={key}>{value}</option>
			))}
		</select>
	);
}
