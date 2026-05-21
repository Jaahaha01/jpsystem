import { getItSystemData } from "@/lib/strapi";
import ITSystemClient from "./ITSystemClient";

export const revalidate = 0; // Disable cache for real-time updates from CMS

export default async function ITSystemPage() {
  const [th, en, jp] = await Promise.all([
    getItSystemData("th"),
    getItSystemData("en"),
    getItSystemData("ja"),
  ]);

  return <ITSystemClient data={{ th, en, jp }} />;
}
