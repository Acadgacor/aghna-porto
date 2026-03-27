import { getDictionary } from "@/lib/dictionary";
import ClientContact from "./ClientContact";

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
    const resolvedParams = await params;
    const dict = await getDictionary(resolvedParams.lang);
    return <ClientContact dict={dict} />;
}