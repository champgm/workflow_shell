import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';

const argumentss: Argument[] = [Argument.GIT_COMMIT_MESSAGE];

export class Command extends SuperCommand {
  description: string = 'Takes one optional argument, the commit message. Commits all files with given message.';
  alias: string = 'gcam';
  public async execute(input?: any) {
    await super.execute([], argumentss, input);
    await executeCommand('git', ['commit', '-am', this.input[Argument.NAMES.GIT_COMMIT_MESSAGE]]);
  }
}
