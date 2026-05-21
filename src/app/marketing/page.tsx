import { getMarketingData } from "@/lib/strapi";
import MarketingClient from "./MarketingClient";

export const revalidate = 0; // Disable cache for real-time updates from CMS

export default async function MarketingPage() {
  const [th, en, jp] = await Promise.all([
    getMarketingData("th"),
    getMarketingData("en"),
    getMarketingData("ja"),
  ]);

  return <MarketingClient data={{ th, en, jp }} />;
}