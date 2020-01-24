import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';
import { Command as GitCommit } from './CommitAllWithMessage';
import { Command as GitRebase } from './Rebase';
import { Command as GitAmend } from './Amend';
import { Command as GitForcePush } from './ForcePush';
import { Names } from '../../common/interface/Names';
import { Question } from '../../common/interface/Question';

const argumentss: Argument[] = [Argument.BASE_BRANCH];
const options: Option[] = [];

export class Command extends SuperCommand {
  description: string = 'Takes one optional argument, the name of the base branch to rebase your branch on top of';
  alias: string = 'gsb';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async (input) => {
      await (new GitCommit()).execute(false);
      await executeCommand('git', ['checkout', this.input[Names.BASE_BRANCH]]);
      await executeCommand('git', ['fetch', 'origin']);
      await executeCommand('git', ['pull']);
    });
  }
}
