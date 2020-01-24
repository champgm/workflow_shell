import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';
import { Command as GitSyncBase } from './SyncBase';
import { Command as GitRebase } from './Rebase';
import { Names } from '../../common/interface/Names';
import { getCurrentBranchName } from '../../common/Git';

const argumentss: Argument[] = [Argument.BASE_BRANCH];
const options: Option[] = [];

export class Command extends SuperCommand {
  description: string = 'Takes one optional argument, the name of the base branch to pull and rebase with';
  alias: string = 'gp';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      const originalBranch = await getCurrentBranchName();
      if (this.input[Names.NUMBER]) await (new GitRebase()).execute(true, this.input);
      await (new GitSyncBase()).execute(true, this.input);
      await executeCommand('git', ['checkout', originalBranch]);
      await executeCommand('git', ['rebase', this.input[Names.BASE_BRANCH]]);
    });
  }
}
