import { getDictionary } from "@/lib/dictionary";
import ClientOnePage from "./ClientOnePage";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  return <ClientOnePage dict={dict} lang={resolvedParams.lang} />;
}
