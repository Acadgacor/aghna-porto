import { getDictionary } from "@/lib/dictionary";
import ClientHome from "./ClientHome";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  // Ambil dictionary dari server (async)
  const dict = await getDictionary(resolvedParams.lang);

  // Lempar data text ke Client Component
  return <ClientHome dict={dict} lang={resolvedParams.lang} />;
}
