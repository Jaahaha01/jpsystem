import { getMarketingData } from "@/lib/strapi";
import MarketingClient from "./MarketingClient";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";


export default async function MarketingPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const data = await getMarketingData(lang);

  return <MarketingClient data={data} dict={dict} />;
}
