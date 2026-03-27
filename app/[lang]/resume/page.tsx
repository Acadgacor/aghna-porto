import { redirect } from "next/navigation";

export default async function Resume({ params }: { params: Promise<{ lang: string }> }) {
    const resolvedParams = await params;
    redirect(`/${resolvedParams.lang}#resume`);
}