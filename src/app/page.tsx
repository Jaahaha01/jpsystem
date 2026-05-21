import { getHomepageData } from "@/lib/strapi";
import HomePageClient from "./HomePageClient";

export const revalidate = 0; // Disable cache to ensure real-time updates from CMS

export default async function Home() {
  const [th, en, jp] = await Promise.all([
    getHomepageData("th"),
    getHomepageData("en"),
    getHomepageData("ja"),
  ]);

  return <HomePageClient data={{ th, en, jp }} />;
}