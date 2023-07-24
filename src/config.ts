import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { IArgs, IConfigFile } from './types';
import defaults from './defaults.json';

const PUBLISHER_CONFIG_FILE = join(process.cwd(), 'docker-pusher-config.json');

export interface IConfig extends IArgs {
  branchName: string;
  commitSubjectTemplate: string;
}

function getConfigFromFile(): IConfigFile {
  if (!existsSync(PUBLISHER_CONFIG_FILE)) {
    return {};
  }
  try {
    const data = readFileSync(PUBLISHER_CONFIG_FILE, { encoding: 'utf8' });
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export function getConfig(args: IArgs): IConfig {
  return {
    ...defaults,
    ...getConfigFromFile(),
    ...args,
  };
}
