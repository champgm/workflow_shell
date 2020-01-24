import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';
import { Names } from '../../common/interface/Names';
import { Option } from '../../common/interface/Option';

const options: Option[] = [];
const argumentss: Argument[] = [Argument.COMMIT_SHA];

export class Command extends SuperCommand {
  description: string = 'Takes one argument, the commit SHA. Cherry picks that commit.';
  alias: string = 'gcp';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      await executeCommand('git', ['cherry-pick', this.input[Names.COMMIT_SHA]]);
    });
  }
}
