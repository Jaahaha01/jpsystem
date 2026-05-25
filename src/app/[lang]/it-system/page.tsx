import { getItSystemData } from "@/lib/strapi";
import ITSystemClient from "./ITSystemClient";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";


export default async function ITSystemPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const data = await getItSystemData(lang);

  return <ITSystemClient data={data} dict={dict} />;
}
