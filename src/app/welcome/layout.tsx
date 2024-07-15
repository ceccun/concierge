import { Card } from "../_components/card";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <Card>{children}</Card>;
}
