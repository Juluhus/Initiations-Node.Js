import { promises as fs } from "fs";
import path from "path";

export async function lireFichierJSON<T>(chemin: string): Promise<T> {
  const data = await fs.readFile(path.resolve(chemin), "utf-8");
  return JSON.parse(data || "[]") as T;
}

export async function ecrireFichierJSON<T>(
  chemin: string,
  data: T
): Promise<void> {
  await fs.writeFile(
    path.resolve(chemin),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}