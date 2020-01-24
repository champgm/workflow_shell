import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';
import { Names } from '../../common/interface/Names';
import { Option } from '../../common/interface/Option';

const options: Option[] = [];
const argumentss: Argument[] = [Argument.COMMIT_MESSAGE];

export class Command extends SuperCommand {
  description: string = 'Takes one optional argument, the commit message. Commits all files with given message.';
  alias: string = 'gcam';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      await executeCommand('git', ['commit', '-am', this.input[Names.COMMIT_MESSAGE]]);
    });
  }
}
