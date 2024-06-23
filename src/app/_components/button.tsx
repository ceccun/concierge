"use client";

import { ButtonTypes } from "../const/buttons";
import { classes } from "../libs/ui";

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
