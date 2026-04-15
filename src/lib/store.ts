import { promises as fs } from "fs";
import path from "path";

const storageRoot = path.join(process.cwd(), "storage");

async function ensureDir() {
  await fs.mkdir(storageRoot, { recursive: true });
}

export async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  await ensureDir();
  const filePath = path.join(storageRoot, filename);

  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), "utf8");
    return fallback;
  }
}

export async function writeJsonFile<T>(filename: string, data: T) {
  await ensureDir();
  const filePath = path.join(storageRoot, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}
