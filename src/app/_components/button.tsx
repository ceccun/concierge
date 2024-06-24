"use client";

import Link from "next/link";
import { ButtonTypes } from "../const/buttons";
import { classes } from "../libs/ui";

export const ButtonLink = ({
	children,
	image,
	type = ButtonTypes.PRIMARY,
	href,
}: {
	children?: React.ReactNode;
	image?: React.ReactNode;
	type?: ButtonTypes.PRIMARY | ButtonTypes.SECONDARY;
	href: string;
}) => {
	return (
		<Link href={href} className={classes("button", type)}>
			{image}
			{children}
		</Link>
	);
};

export const Button = ({
	children,
	image,
	type = ButtonTypes.PRIMARY,
}: {
	children?: React.ReactNode;
	image?: React.ReactNode;
	type?: ButtonTypes.PRIMARY | ButtonTypes.SECONDARY;
}) => {
	return (
		<button className={classes("button", type)}>
			{image}
			{children}
		</button>
	);
};
