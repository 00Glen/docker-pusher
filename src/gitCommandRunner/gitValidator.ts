import * as mustache from 'mustache';
import { execSync } from 'child_process';

export function hasUncommitedChanges(): boolean {
  const command = `git status`;
  const stateOutput = execSync(command);
  return stateOutput.toString().indexOf('nothing to commit') === -1;
}

export function getBranchName(): string {
  const command = `git rev-parse --abbrev-ref HEAD`;
  const stateOutput = execSync(command);
  return stateOutput.toString().trim();
}

export function isAllowedBranch(branchName: string) {
  const currentBranchName = getBranchName();
  const branchRegEx = new RegExp(branchName, 'i');
  return branchRegEx.test(currentBranchName);
}

export function isAlreadyVersioned(subject: string, version: string) {
  const command = `git log -1 --format=%s`;
  const stateOutput = execSync(command);
  return stateOutput.toString().trim() === mustache.render(subject, { version });
}
