import { CommanderStatic } from 'commander';
import inquirer from 'inquirer';
import { Input } from './Input';

export interface Argument {
  name: string;
  shortName: string;
  description: string;
  isFlag?: boolean;
  isOptional?: boolean;
  getQuestion: (input: Input) => Promise<inquirer.Question> | Promise<inquirer.Question[]>;
  configure: (input: any) => void;
}

export namespace Argument {
  export enum NAMES {
    FORCE = 'force',
  }

  export const LIBRARY = {
    FORCE: {
      name: Argument.NAMES.FORCE,
      shortName: 'F',
      description: 'Skip input confirmation',
      isFlag: true,
      isOptional: true,
      getQuestion: () => undefined,
      configure: () => undefined,
    },
  };

  export async function requireArguments(
    requiredArguments: Argument[],
    commander: CommanderStatic,
  ) {
    console.log(`Requiring arguments: ${JSON.stringify(requiredArguments)}`);
    for (const argument of requiredArguments) {
      const commanderString = argument.isFlag
        ? `-${argument.shortName}, --${argument.name}`
        : `-${argument.shortName}, --${argument.name} <${argument.name}>`;
      commander.option(commanderString, argument.description);
    }
    commander.parse(process.argv);
  }

}
