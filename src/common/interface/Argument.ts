import inquirer from 'inquirer';

import { Input } from './Input';
import { Question } from './Question';

export interface Argument {
  name: string;
  description: string;
  getQuestion: (input: Input) => Promise<inquirer.Question> | Promise<inquirer.Question[]>;
  configure: (input: any) => void;
  default?: string;
}

export namespace Argument {
  export enum NAMES {
    GIT_BRANCH = 'branch',
    GIT_COMMIT_MESSAGE = 'message',
    NUMBER = 'number',
  }

  export const GIT_BRANCH: Argument = {
    name: Argument.NAMES.GIT_BRANCH,
    description: 'Git Branch',
    getQuestion: Question.getBranchName,
    configure: () => { },
  };

  export const GIT_COMMIT_MESSAGE: Argument = {
    name: Argument.NAMES.GIT_COMMIT_MESSAGE,
    description: 'Git Commit Message',
    getQuestion: Question.getCommitMessage,
    configure: () => { },
    default: 'Test commit, please fixup',
  };

  export const NUMBER: Argument = {
    name: Argument.NAMES.NUMBER,
    description: 'A Number',
    getQuestion: Question.getCommitMessage,
    configure: () => { },
  };
}
