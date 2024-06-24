import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { getLangDir } from "rtl-detect";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
	const direction = getLangDir(locale);
	// const direction = "rtl";

	return (
		<html lang={locale} dir={direction}>
			<body>
				<TRPCReactProvider>
					<NextIntlClientProvider messages={messages}>
						<SkeletonTheme
							baseColor="#464c56"
							highlightColor="#858990"
							inline={false}
							enableAnimation={false}
						>
							{children}
						</SkeletonTheme>
					</NextIntlClientProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
