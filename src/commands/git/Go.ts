import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';
import { Command as GitCommit } from './CommitAllWithMessage';
import { Command as GitRebase } from './Rebase';
import { Command as GitAmend } from './Amend';
import { Command as GitForcePush } from './ForcePush';
import { Names } from '../../common/interface/Names';

const argumentss: Argument[] = [Argument.NUMBER];
const options: Option[] = [];

export class Command extends SuperCommand {
  description: string =
    'Takes one optional argument, number of commits to rebase. '
    + 'Commits all staged changes, '
    + 'rebases interactively, '
    + 'amends the most recent commit, '
    + 'then force pushes';
  alias: string = 'ggo';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      await (new GitCommit()).execute(false);
      if (this.input[Names.NUMBER]) await (new GitRebase()).execute(true, input);
      await (new GitAmend()).execute(true);
      await (new GitForcePush()).execute(true);
    });
  }
}
