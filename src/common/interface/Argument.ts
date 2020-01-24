import inquirer from 'inquirer';

import { Input } from './Input';
import { Question } from './Question';
import { Names } from './Names';

export interface Argument {
  name: string;
  description: string;
  getQuestion: (input: Input) => Promise<inquirer.Question> | Promise<inquirer.Question[]>;
  configure: (input: any) => void | Promise<void>;
  default?: string;
}

export namespace Argument {
  export const GIT_BRANCH: Argument = {
    name: Names.GIT_BRANCH,
    description: 'Git Branch',
    getQuestion: Question.getBranchName,
    configure: () => { },
  };

  export const GIT_COMMIT_MESSAGE: Argument = {
    name: Names.GIT_COMMIT_MESSAGE,
    description: 'Git Commit Message',
    getQuestion: Question.getCommitMessage,
    configure: () => { },
    default: 'Test commit, please fixup',
  };

  export const NUMBER: Argument = {
    name: Names.NUMBER,
    description: 'A Number',
    getQuestion: Question.getCommitMessage,
    configure: () => { },
  };
}
