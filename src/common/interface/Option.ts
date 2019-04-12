import { CommanderStatic } from 'commander';
import inquirer from 'inquirer';
import { Input } from './Input';
import { Question } from './Question';

export interface Option {
  name: string;
  shortName: string;
  description: string;
  isFlag?: boolean;
  isOptional?: boolean;
  getQuestion: (input: Input) => Promise<inquirer.Question> | Promise<inquirer.Question[]>;
  configure: (input: any) => void;
}

export namespace Option {
  export enum NAMES {
    FORCE = 'force',
    GIT_BRANCH = 'branch',
  }

  export const LIBRARY = {
    FORCE: {
      name: Option.NAMES.FORCE,
      shortName: 'F',
      description: 'Skip input confirmation',
      isFlag: true,
      isOptional: true,
      getQuestion: () => undefined,
      configure: () => undefined,
    },
    BRANCH: {
      name: Option.NAMES.GIT_BRANCH,
      shortName: 'g',
      description: 'Git Branch',
      getQuestion: Question.LIBRARY.BRANCH,
      configure: () => { },
    },
  };

  export async function requireOptions(
    requiredOptions: Option[],
    commander: CommanderStatic,
  ) {
    console.log(`Requiring options: ${JSON.stringify(requiredOptions)}`);
    for (const option of requiredOptions) {
      const commanderString = option.isFlag
        ? `-${option.shortName}, --${option.name}`
        : `-${option.shortName}, --${option.name} <${option.name}>`;
      commander.option(commanderString, option.description);
    }
    commander.parse(process.argv);
  }

}
