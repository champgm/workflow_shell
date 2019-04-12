import inquirer from 'inquirer';
import { getCommandOutput } from '../Cli';
import { Option } from './Option';
import { Input } from './Input';

export namespace Question {

  export const LIBRARY = {
    BRANCH: async (input: Input): Promise<inquirer.Question> => {
      return {
        type: 'input',
        name: Option.NAMES.GIT_BRANCH,
        message: 'Enter your Git branch name',
        default: async () => await getCommandOutput('git', ['rev-parse', '--abbrev-ref', 'HEAD']),
      };
    },
  };

}
