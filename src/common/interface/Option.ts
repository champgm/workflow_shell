import inquirer from 'inquirer';
import { Input } from './Input';
import { Question } from './Question';
import { Names } from './Names';

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
  export const force: Option = {
    name: Names.FORCE,
    shortName: 'F',
    description: 'Skip input confirmation',
    isFlag: true,
    isOptional: true,
    getQuestion: () => undefined,
    configure: () => undefined,
  };

  export const branchName: Option = {
    name: Names.GIT_BRANCH,
    shortName: 'g',
    description: 'Git Branch',
    getQuestion: Question.getBranchName,
    configure: () => { },
  };

  export const number: Option = {
    name: Names.NUMBER,
    shortName: 'n',
    description: 'Number',
    getQuestion: Question.getNumber,
    configure: () => { },
  };
}
