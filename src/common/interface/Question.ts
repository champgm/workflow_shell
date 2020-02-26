import inquirer from 'inquirer';
import { Input } from './Input';
import { Names } from './Names';
import { getCurrentBranchName } from '../Git';

export namespace Question {
  export async function getBranchName(input: Input): Promise<inquirer.Question> {
    return {
      type: 'input',
      name: Names.BRANCH,
      message: 'Enter your Git branch name',
      default: async () => await getCurrentBranchName(),
    };
  }

  export async function getBaseBranchName(input: Input): Promise<inquirer.Question> {
    return {
      type: 'input',
      message: 'Enter your Git branch name',
      name: Names.BASE_BRANCH,
      default: 'master',
    };
  }

  export async function getCommitMessage(input: Input): Promise<inquirer.Question> {
    return {
      type: 'input',
      name: Names.COMMIT_MESSAGE,
      message: 'Enter your commit message',
      default: 'Test commit, please fixup',
    };
  }

  export async function getPassword(input: Input): Promise<inquirer.Question> {
    return {
      type: 'input',
      name: Names.PASSWORD,
      message: 'Enter the password',
    };
  }

  export async function getCommitSha(input: Input): Promise<inquirer.Question> {
    return {
      type: 'input',
      name: Names.COMMIT_SHA,
      message: 'Enter your commit SHA',
    };
  }

  export async function getNumber(input: Input): Promise<inquirer.Question> {
    return {
      type: 'input',
      name: Names.NUMBER,
      message: 'How many/what number?',
      default: 1,
    };
  }
}
