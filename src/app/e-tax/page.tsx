import { getETaxData } from "@/lib/strapi";
import ETaxClient from "./ETaxClient";

export const revalidate = 0; // Disable cache for real-time updates from CMS

export default async function ETaxPage() {
  const [th, en, jp] = await Promise.all([
    getETaxData("th"),
    getETaxData("en"),
    getETaxData("ja"),
  ]);

  return <ETaxClient data={{ th, en, jp }} />;
}