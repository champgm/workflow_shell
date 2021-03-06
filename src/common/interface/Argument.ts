import inquirer from 'inquirer';
import AWS from 'aws-sdk';

import { Names } from './Names';
import { Input } from './Input';
import { Question } from './Question';
import { configureAwsProfile } from '../aws';

export interface Argument {
  name: string;
  description: string;
  getQuestion: (input: Input) => Promise<inquirer.Question> | Promise<inquirer.Question[]>;
  configure: (input: any) => void | Promise<void>;
  default?: string;
}

export namespace Argument {
  export const BRANCH: Argument = {
    name: Names.BRANCH,
    description: 'Git Branch',
    getQuestion: Question.getBranchName,
    configure: () => { },
  };

  export const BASE_BRANCH: Argument = {
    name: Names.BASE_BRANCH,
    description: 'Base Git Branch',
    getQuestion: Question.getBaseBranchName,
    configure: () => { },
    default: 'master',
  };

  export const COMMIT_MESSAGE: Argument = {
    name: Names.COMMIT_MESSAGE,
    description: 'Git Commit Message',
    getQuestion: Question.getCommitMessage,
    configure: () => { },
    default: 'Test commit, please fixup',
  };
  export const COMMIT_SHA: Argument = {
    name: Names.COMMIT_SHA,
    description: 'Git Commit SHA',
    getQuestion: Question.getCommitSha,
    configure: () => { },
  };

  export const NUMBER: Argument = {
    name: Names.NUMBER,
    description: 'A Number',
    getQuestion: Question.getCommitMessage,
    configure: () => { },
    default: '1',
  };

  export const PASSWORD: Argument = {
    name: Names.PASSWORD,
    description: 'The password',
    getQuestion: Question.getPassword,
    configure: () => { },
  };
}
