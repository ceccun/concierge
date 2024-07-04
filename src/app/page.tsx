import { Button } from "./_components/button";
import { CalendarPlus2Icon, VideoIcon } from "lucide-react";
import { ButtonTypes } from "./const/buttons";
import { redirect } from "next/dist/server/api-utils";
import { permanentRedirect } from "next/navigation";

export default async function Home() {
	return permanentRedirect("/welcome/start");
}
