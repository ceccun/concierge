"use client";
import { useEffect, useState } from "react";
import { CallBar } from "./call-bar";
import { CallCanvas } from "./call-canvas";
import styles from "./call-ui.module.css";
import { checkToken } from "~/app/libs/authentication";
import { Call } from "@prisma/client";
import { useRouter } from "next/router";

export default function CallPage({ params }: { params: { id: string } }) {
	const callID = params.id;
	const [token, setToken] = useState<string | null>(null);
	const [call, setCall] = useState<Call | null>(null);

	useEffect(() => {
		checkToken(setToken);
	}, []);

	useEffect(() => {
		if (!token) return;

		fetch(`/api/call/get?id=${callID}`, {
			headers: {
				authorization: token,
			},
		}).then((res) => {
			if (!res.ok) {
				return;
			}

			res.json().then((data) => {
				setCall(data);
			});
		});
	}, [token]);

	useEffect(() => {
		if (!call) return;

		const socket = new WebSocket(`ws://localhost:3000/api/call/signaling`);

		socket.onopen = () => {
			socket.send(
				JSON.stringify({
					id: callID,
					authorisation: token,
					action: "register",
				})
			);
		};
	}, [call]);

	return (
		<div className={styles.call}>
			<CallCanvas />
			<CallBar />
		</div>
	);
}
