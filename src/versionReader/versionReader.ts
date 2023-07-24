import { getPackageContent } from "../packageActions/packageReader";
import { VERSION_REGEX } from "../regex";

export function getVersions() {
  const packageData = getPackageContent();
  const version = JSON.parse(packageData).version;
  const [core, preRelease] = version.split('-');
  const versionValue = core.match(VERSION_REGEX) ?? [];
  const major = Number(versionValue[1] ?? '0'),
    minor = Number(versionValue[2] ?? '0'),
    patch = Number(versionValue[3] ?? '0');

  let pre = 0;
  if (typeof preRelease === 'string') {
    const [, preVersion = '0'] = preRelease.split('.');
    pre = Number(preVersion);
  }

  return {
    version,
    current: {
      major,
      minor,
      patch,
      pre,
    },
    nextBeta: () => [major, minor, `${patch}-beta`, pre + 1].join('.'),
    nextPatch: () => [major, minor, patch + 1].join('.'),
    nextMinor: () => [major, minor + 1, 0].join('.'),
    nextMajor: () => [major + 1, 0, 0].join('.'),
  };
}
