import inquirer from 'inquirer';

import { Input } from './Input';
import { Question } from './Question';

export interface Argument {
  name: string;
  description: string;
  getQuestion: (input: Input) => Promise<inquirer.Question> | Promise<inquirer.Question[]>;
  configure: (input: any) => void;
}

export namespace Argument {
  export enum NAMES {
    GIT_BRANCH = 'branch',
  }
  export const LIBRARY: { [name: string]: Argument } = {
    GIT_BRANCH: {
      name: 'branch',
      description: 'Git Branch',
      getQuestion: Question.LIBRARY.BRANCH,
      configure: () => { },
    },
  };
}
