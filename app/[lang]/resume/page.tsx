import { getDictionary } from "@/lib/dictionary";
import ClientResume from "./ClientResume";

export default async function Resume({ params }: { params: Promise<{ lang: string }> }) {
    const resolvedParams = await params;
    const dict = await getDictionary(resolvedParams.lang);
    return <ClientResume dict={dict} />;
}