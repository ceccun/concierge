"use client";

import Link from "next/link";
import { ButtonTypes } from "../const/buttons";
import { classes } from "../libs/ui";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

export const ButtonLink = ({
	children,
	image,
	type = ButtonTypes.PRIMARY,
	href,
	props,
}: {
	children?: React.ReactNode;
	image?: React.ReactNode;
	type?: ButtonTypes.PRIMARY | ButtonTypes.SECONDARY;
	href: string;
	props?: AnchorHTMLAttributes<HTMLAnchorElement>;
}) => {
	return (
		<Link href={href} className={classes("button", type)} {...props}>
			{image}
			{children}
		</Link>
	);
};

export const Button = ({
	children,
	image,
	type = ButtonTypes.PRIMARY,
	...props
}: {
	children?: React.ReactNode;
	image?: React.ReactNode;
	type?: ButtonTypes.PRIMARY | ButtonTypes.SECONDARY;
	props?: ButtonHTMLAttributes<HTMLButtonElement>;
}) => {
	return (
		<button className={classes("button", type)} {...props}>
			{image}
			{children}
		</button>
	);
};
