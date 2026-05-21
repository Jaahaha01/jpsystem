import { put, list } from "@vercel/blob";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

/** Read a JSON config by key */
export async function readConfig<T>(key: string, fallback: T): Promise<T> {
  if (useBlob) {
    try {
      const { blobs } = await list({ prefix: key });
      if (blobs.length === 0) return fallback;
      const res = await fetch(blobs[0].url);
      return await res.json();
    } catch {
      return fallback;
    }
  }

  // Local file fallback
  try {
    const filePath = path.join(DATA_DIR, key);
    const content = await readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return fallback;
  }
}

/** Write a JSON config by key */
export async function writeConfig(key: string, data: unknown): Promise<void> {
  if (useBlob) {
    await put(key, JSON.stringify(data), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }

  // Local file fallback
  await mkdir(DATA_DIR, { recursive: true });
  const filePath = path.join(DATA_DIR, key);
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

/** Upload a file (image) */
export async function uploadFile(
  key: string,
  data: ArrayBuffer | File,
  contentType: string
): Promise<string> {
  if (useBlob) {
    const blob = await put(key, data, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType,
    });
    return blob.url;
  }

  // Local: save to public/ folder
  const publicDir = path.join(process.cwd(), "public");
  const fileName = path.basename(key.replace("images/", ""));
  const filePath = path.join(publicDir, fileName);
  const buffer = Buffer.from(data instanceof File ? await data.arrayBuffer() : data);
  await writeFile(filePath, buffer);
  return `/${fileName}`;
}
