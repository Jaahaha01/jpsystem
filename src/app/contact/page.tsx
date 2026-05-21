import { getContactData } from "@/lib/strapi";
import ContactClient from "./ContactClient";

export const revalidate = 0; // Disable cache for real-time updates from CMS

export default async function ContactPage() {
  const [th, en, jp] = await Promise.all([
    getContactData("th"),
    getContactData("en"),
    getContactData("ja"),
  ]);

  return <ContactClient data={{ th, en, jp }} />;
}