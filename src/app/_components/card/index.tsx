import style from "./card.module.css";

export function Card({ children }: { children: React.ReactNode }) {
	return (
		<div className={style.centre}>
			<div className={style.card}>{children}</div>
		</div>
	);
}
