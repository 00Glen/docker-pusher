import { execSync } from 'child_process';
import { logger } from '../logger';

export function dockerBuild(name: string, version: string) {
  const command = `docker build -t ${name}:${version} "${process.cwd()}"`;
  logger.info(`Running: ${command}`);
  execSync(command);
  logger.sucess('Docker image successfully built');
}

export function dockerPush(name: string, version: string) {
  const command = `docker push ${name}:${version}`;
  logger.info(`Running: ${command}`);
  execSync(command);
  logger.sucess('Docker image successfully pushed');
}
