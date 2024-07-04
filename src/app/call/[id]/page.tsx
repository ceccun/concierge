import { CallBar } from "./call-bar";
import { CallCanvas } from "./call-canvas";
import styles from "./call-ui.module.css";

export default function CallPage({ params }: { params: { id: string } }) {
	return (
		<div className={styles.call}>
			<CallCanvas />
			<CallBar />
		</div>
	);
}
