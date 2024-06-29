export default function CallPage({ params }: { params: { id: string } }) {
	return <h1>{params.id}</h1>;
}
