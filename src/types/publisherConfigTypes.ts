export interface IConfigFile {
  imageName?: string;
  commitSubjectTemplate?: string;
  branchName?: string;
}

export interface IArgs extends IConfigFile {
  version?: string;
  beta?: boolean;
  skipGit?: boolean;
}

export interface IValidationError {
  message: string;
}
