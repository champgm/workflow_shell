import { Command, flags } from '@oclif/command';
import Questionable from '../common/Questionable';
import { getCommandOutput, executeCommand } from '../common/Cli';
import Argument from '../common/Argument';
// import GitCommitAllMessage

export default class GitCheckout extends Questionable {
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
      type: 'input',
      name: 'description',
      message: 'Which branch do you want to check out and pull changes for?',
      default: 'develop',
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
