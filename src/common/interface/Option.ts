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
    BRANCH_NAME = 'branchName',
    NUMBER = 'number',
  }

  export const force: Option = {
    name: Option.NAMES.FORCE,
    shortName: 'F',
    description: 'Skip input confirmation',
    isFlag: true,
    isOptional: true,
    getQuestion: () => undefined,
    configure: () => undefined,
  };

  export const branchName: Option = {
    name: Option.NAMES.BRANCH_NAME,
    shortName: 'g',
    description: 'Git Branch',
    getQuestion: Question.getBranchName,
    configure: () => { },
  };

  export const number: Option = {
    name: Option.NAMES.NUMBER,
    shortName: 'n',
    description: 'Number',
    getQuestion: Question.getNumber,
    configure: () => { },
  };
}
