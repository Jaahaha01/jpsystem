import { getContactData } from "@/lib/strapi";
import ContactClient from "./ContactClient";
import { getDictionary } from "@/i18n/dictionaries";
import { Locale } from "@/i18n/config";


export default async function ContactPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const data = await getContactData(lang);

  return <ContactClient data={data} dict={dict} />;
}
