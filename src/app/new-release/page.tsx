import { getNewReleaseData } from "@/lib/strapi";
import NewReleaseClient from "./NewReleaseClient";

export const revalidate = 0; // Disable cache for real-time updates from CMS

export default async function NewReleasePage() {
  const [th, en, jp] = await Promise.all([
    getNewReleaseData("th"),
    getNewReleaseData("en"),
    getNewReleaseData("ja"),
  ]);

  return <NewReleaseClient data={{ th, en, jp }} />;
}