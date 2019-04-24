import { Command, flags } from '@oclif/command';
import Questionable from '../common/Questionable';
import { getCommandOutput, executeCommand } from '../common/Cli';
import Argument from '../common/Argument';

export default class GitAddDot extends Questionable {
  static description = 'Stages all files and folders in the current directory';

  static examples = [
    `⇒  wsh gad

Running: git add .`,
  ];

  static flags = {};

  static args: Argument[] = [];

  async run() {
    const { args } = this.parse(GitAddDot);
    await executeCommand('git', ['add', '.']);
  }
}
