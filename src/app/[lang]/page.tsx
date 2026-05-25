import { getHomepageData } from "@/lib/strapi";
import HomePageClient from "./HomePageClient";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";

// Wait, I will remove revalidate = 0 later in Phase 2

export default async function Home(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  
  // Since we are refactoring to use a single data fetch for the current locale instead of all 3:
  const data = await getHomepageData(lang);

  return <HomePageClient data={data} dict={dict} />;
}