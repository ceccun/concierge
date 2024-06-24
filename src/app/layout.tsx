import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { getLangDir } from "rtl-detect";

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
	const direction = getLangDir(locale)

	return (
		<html lang={locale} dir={direction}>
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
