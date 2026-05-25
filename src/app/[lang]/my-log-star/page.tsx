import { getMyLogStarData } from "@/lib/strapi";
import MyLogStarClient from "./MyLogStarClient";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";


export default async function MyLogStarPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const data = await getMyLogStarData(lang);

  return <MyLogStarClient data={data} dict={dict} />;
}
