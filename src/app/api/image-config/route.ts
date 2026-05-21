import { readConfig } from "@/lib/storage";

const CONFIG_KEY = "image-overrides.json";

export const dynamic = "force-dynamic";

export async function GET() {
  const overrides = await readConfig<Record<string, string>>(CONFIG_KEY, {});
  return Response.json({ overrides });
}
