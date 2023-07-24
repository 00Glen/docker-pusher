import { writeFileSync } from 'fs';
import { PACKAGE_FILE, getPackageContent } from './packageReader';

export function updatePackageVersion(version: string) {
  let data = getPackageContent();
  data = data.replace(`"version": "${JSON.parse(data).version}"`, `"version": "${version}"`);
  writeFileSync(PACKAGE_FILE, data, { encoding: 'utf8' });
}
