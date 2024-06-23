import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.user.create({
    name: "Ejaz"
  });
  
  return (
    <main>
      <h1>Hello</h1>
    </main>
  );
}