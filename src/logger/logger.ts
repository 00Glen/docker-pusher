import chalk from 'chalk';

export const logger = {
  error: (message: string, ...optionalParams: any[]) => {
    console.log(chalk.bgRed.bold(' Error '), chalk.red(message), ...optionalParams);
  },
  info: (message: string, ...optionalParams: any[]) => {
    console.log(chalk.bgBlue.bold(' Info  '), chalk.blue(message), ...optionalParams);
  },
  sucess: (message: string, ...optionalParams: any[]) => {
    console.log(chalk.bgGreen.bold('  O K  '), chalk.green(message), ...optionalParams);
  },
};
