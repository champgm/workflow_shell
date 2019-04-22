import inquirer from 'inquirer';
import { getCommandOutput } from '../Cli';
import { Option } from './Option';
import { Input } from './Input';

export namespace Question {
  export async function getBranchName(input: Input): Promise<inquirer.Question> {
    return {
      type: 'input',
      name: Option.NAMES.BRANCH_NAME,
      message: 'Enter your Git branch name',
      default: async () => await getCommandOutput('git', ['rev-parse', '--abbrev-ref', 'HEAD']),
    };
  }

  export async function getCommitMessage(input: Input): Promise<inquirer.Question> {
    return {
      type: 'input',
      name: Option.NAMES.BRANCH_NAME,
      message: 'Enter your commit message',
      default: 'Test commit, please fixup',
    };
  }

  export async function getNumber(input: Input): Promise<inquirer.Question> {
    return {
      type: 'input',
      name: Option.NAMES.NUMBER,
      message: 'How many/what number?',
      default: 1,
    };
  }
}
