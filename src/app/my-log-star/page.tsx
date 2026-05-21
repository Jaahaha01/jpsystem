import { getMyLogStarData } from "@/lib/strapi";
import MyLogStarClient from "./MyLogStarClient";

export const revalidate = 0; // Disable cache for real-time updates from CMS

export default async function MyLogStarPage() {
  const [th, en, jp] = await Promise.all([
    getMyLogStarData("th"),
    getMyLogStarData("en"),
    getMyLogStarData("ja"),
  ]);

  return <MyLogStarClient data={{ th, en, jp }} />;
}