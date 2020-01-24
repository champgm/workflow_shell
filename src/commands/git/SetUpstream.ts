import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';
import { getCurrentBranchName } from '../../common/Git';

const argumentss: Argument[] = [];
const options: Option[] = [];

export class Command extends SuperCommand {
  description: string = 'Sets the target upstream branch';
  alias: string = 'gsu';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      const currentBranch = await getCurrentBranchName();
      const remoteBranchPath = `origin/${currentBranch}`;
      await executeCommand('git', ['branch', '--set-upstream-to', remoteBranchPath]);
    });
  }
}
