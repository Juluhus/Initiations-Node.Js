import { mkdir, access, readFile, writeFile } from "fs/promises";
import { constants } from "fs";
import { homedir } from "os";
import { join } from "path";

import { Note } from "./types";

const NOTES_DIR = join(homedir(), ".notes");

const NOTES_FILE = join(NOTES_DIR, "notes.json");

export async function initialiserStockage(): Promise<void> {
  await mkdir(NOTES_DIR, {recursive: true});

  try {
    await access(NOTES_FILE, constants.F_OK);
  } catch {
    await writeFile(NOTES_FILE, "[]", "utf-8");
  }
}

export async function lireNotes(): Promise<Note[]> {
  const contenu = await readFile(NOTES_FILE, "utf-8");

  return JSON.parse(contenu);
}

export async function sauvegarderNotes(notes: Note[]): Promise<void> {
  await writeFile(NOTES_FILE, JSON.stringify(notes, null, 2), "utf-8");
}

export { NOTES_FILE };