import { getETaxData } from "@/lib/strapi";
import ETaxClient from "./ETaxClient";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";


export default async function ETaxPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const data = await getETaxData(lang);

  return <ETaxClient data={data} dict={dict} />;
}
