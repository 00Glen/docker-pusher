import { readFileSync } from 'fs';
import { join } from "path";

export const PACKAGE_FILE = join(process.cwd(), 'package.json');

export function getPackageContent() {
  return readFileSync(PACKAGE_FILE, { encoding: 'utf8' });
}
