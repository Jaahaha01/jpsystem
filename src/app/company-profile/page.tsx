import { getCompanyData } from "@/lib/strapi";
import CompanyClient from "./CompanyClient";

export const revalidate = 0; // Disable cache for real-time updates from CMS

export default async function CompanyProfilePage() {
  const [th, en, jp] = await Promise.all([
    getCompanyData("th"),
    getCompanyData("en"),
    getCompanyData("ja"),
  ]);

  return <CompanyClient data={{ th, en, jp }} />;
}