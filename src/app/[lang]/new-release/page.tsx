import { getNewReleaseData } from "@/lib/strapi";
import NewReleaseClient from "./NewReleaseClient";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";


export default async function NewReleasePage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const data = await getNewReleaseData(lang);

  return <NewReleaseClient data={data} dict={dict} />;
}
