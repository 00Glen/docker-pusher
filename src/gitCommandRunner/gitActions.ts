import * as mustache from 'mustache';
import { execSync } from 'child_process';
import { logger } from '../logger';

export function commitNewVersion(version: string, subject: string) {
  const command = `git commit -am "${mustache.render(subject, { version })}"`;
  logger.info(`Executing: `, command);
  execSync(command);
}

export function createVersionTag(version: string) {
  const command = `git tag -a v${version} -m "Auto tag ${version}"`;
  execSync(command);
}

export function pushNewVersion(version: string) {
  const command = `git push && git push origin v${version}`;
  execSync(command);
}
