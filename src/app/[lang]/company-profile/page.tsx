import { getCompanyData } from "@/lib/strapi";
import CompanyClient from "./CompanyClient";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";


export default async function CompanyPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const data = await getCompanyData(lang);

  return <CompanyClient data={data} dict={dict} />;
}
