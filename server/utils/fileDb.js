import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'data');

async function ensureFile(file, fallback) {
  await fs.mkdir(dataDir, { recursive: true });
  const full = path.join(dataDir, file);
  try {
    await fs.access(full);
  } catch {
    await fs.writeFile(full, JSON.stringify(fallback, null, 2));
  }
  return full;
}

export async function readJson(file, fallback = []) {
  const full = await ensureFile(file, fallback);
  const raw = await fs.readFile(full, 'utf8');
  return JSON.parse(raw || JSON.stringify(fallback));
}

export async function writeJson(file, data) {
  const full = await ensureFile(file, []);
  await fs.writeFile(full, JSON.stringify(data, null, 2));
}
