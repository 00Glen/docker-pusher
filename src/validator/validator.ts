import { IConfig } from '../config';
import { hasUncommitedChanges, isAllowedBranch, isAlreadyVersioned } from '../gitCommandRunner';
import { logger } from '../logger';
import { VERSION_REGEX } from '../regex';
import { IValidationError } from '../types';

export function validateRepo(config: IConfig, currentVersion: string) {
  const validationError: IValidationError[] = [];
  if (hasUncommitedChanges()) {
    validationError.push({
      message: 'There are changes pending to commit',
    });
  }

  if (!isAllowedBranch(config.branchName) && !config.beta) {
    validationError.push({
      message: `You must be in the ${config.branchName} branch to be able to publish changes`,
    });
  }
  if (!config.imageName || config.imageName.trim() == '') {
    validationError.push({
      message: 'The docker image name is required to be able to version',
    });
  }
  if (config.version && !VERSION_REGEX.test(config.version)) {
    validationError.push({
      message: `Invalid version: ${config.version}, please use the Semantic Versioning Specification (SemVer) https://semver.org/`,
    });
  }
  if (!config.skipGit && isAlreadyVersioned(config.commitSubjectTemplate, currentVersion)) {
    validationError.push({
      message: `Already versioned (v${currentVersion})`,
    });
  }

  if (validationError.length > 0) {
    validationError.forEach((err) => {
      logger.error(err.message);
    });
    process.exit(1);
  }
}
