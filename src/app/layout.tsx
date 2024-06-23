import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const metadata = {
	title: "Concierge",
	description: "Virtual meetings",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale} dir={"rtl"}>
			<body>
				<TRPCReactProvider>
					<NextIntlClientProvider messages={messages}>
						{children}
					</NextIntlClientProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
