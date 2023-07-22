import { parse } from 'ts-command-line-args';
import { getVersions } from './versionReader';
import { IArgs } from './types';
import { getConfig } from './config';
import { logger } from './logger';
import { validateRepo } from './validator/validator';
import { dockerBuild, dockerPush } from './dockerCommandRunner';
import { updatePackageVersion } from './packageActions';
import { commitNewVersion, createVersionTag, isAlreadyVersioned, pushNewVersion } from './gitCommandRunner';

// Setup command line options.
const args = parse<IArgs>({
  version: {
    type: String,
    optional: true,
  },
  beta: { type: Boolean, alias: 'b', optional: true },
  skipGit: { type: Boolean, optional: true },
  branchName: {
    type: String,
    optional: true,
  },
  commitSubjectTemplate: {
    type: String,
    optional: true,
  },
  imageName: {
    type: String,
    optional: true,
  },
});

const config = getConfig(args);
const versions = getVersions();

//Validate repo, args and configurations
validateRepo(config, versions.version);

//Docker build and push
const nextVersion = config.version ?? config.beta ? versions.nextBeta() : versions.nextPatch();
logger.info(`Current version: ${versions.version}`);
logger.info(`New version: ${nextVersion}`);
dockerBuild(config.imageName || '', nextVersion);
dockerPush(config.imageName || '', nextVersion);

//Bumb version
updatePackageVersion(nextVersion);

//Git commit and tag
if (!config.skipGit) {
  if (isAlreadyVersioned(config.commitSubjectTemplate, versions.version)) {
    logger.error(`Already versioned`);
    process.exit(1);
  }
  commitNewVersion(nextVersion, config.commitSubjectTemplate);
  createVersionTag(nextVersion);
  pushNewVersion(nextVersion);
} else {
  logger.info(`Git tag skipped`);
}

//finish
logger.sucess(`Version ${nextVersion} pushed successfully!`);
