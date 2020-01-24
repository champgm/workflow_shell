import { Argument } from '../../common/interface/Argument';
import { executeCommand } from '../../common/Cli';
import { getCurrentBranchName } from '../../common/Git';
import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';

const argumentss: Argument[] = [];
const options: Option[] = [];

export class Command extends SuperCommand {
  description: string = 'Force pushes the current branch into a remote branch of the same name';
  alias: string = 'gpfo';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      await executeCommand('git', ['push', '-f', 'origin', await getCurrentBranchName()]);
    });
  }
}
