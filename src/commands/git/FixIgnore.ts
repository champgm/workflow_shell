import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Command as GitCommit } from './CommitAllWithMessage';
import { Command as GitAddDot } from './AddDot';
import { Argument } from '../../common/interface/Argument';

const argumentss: Argument[] = [];
const options: Option[] = [];

export class Command extends SuperCommand {
  description: string = 'Attempts to fix gitignore not working properly.';
  alias: string = 'gfi';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      await (new GitCommit()).execute(false, { message: 'Before Fixing gitignore' });
      await executeCommand('git', ['rm', '-r', '--cached', '.']);
      await (new GitAddDot()).execute(false);
      await (new GitCommit()).execute(false, { message: 'Fixed gitignore' });
    });
  }
}
