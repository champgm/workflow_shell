import { Command, flags } from '@oclif/command';
import Questionable from '../common/Questionable';
import { getCommandOutput, executeCommand } from '../common/Cli';
import Argument from '../common/Argument';

export default class GitCheckoutBranch extends Questionable {
  static description = 'describe the command here';

  static examples = [
    `⇒  wsh gcb wahtever

Running: git checkout -b wahtever
Switched to a new branch 'wahtever'`,
  ];

  static flags = {};

  static args: Argument[] = [{
    name: 'branch',
    questions: [{
      type: 'list',
      name: 'type',
      message: 'Which type of branch will this be?',
      choices: ['feature', 'hotfix', 'bugfix'],
      default: 'feature',
    }, {
      type: 'input',
      name: 'issue',
      message: 'Enter your github issue number',
    }, {
      type: 'input',
      name: 'description',
      message: 'Enter your feature description',
      filter: (description: string) => { return description.replace(' ', '-'); },
    }],
  }];

  async run() {
    let { args } = this.parse(GitCheckoutBranch);
    if (!args.branch) {
      args = await this.askQuestions(GitCheckoutBranch.args);
      await executeCommand('git', ['checkout', '-b', `${args.type}/GH-${args.issue}-${args.description}`]);
    } else {
      await executeCommand('git', ['checkout', '-b', args.branch]);
    }
  }
}
