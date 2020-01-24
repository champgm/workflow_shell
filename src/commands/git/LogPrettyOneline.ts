import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';

const argumentss: Argument[] = [];
const options: Option[] = [];

export class Command extends SuperCommand {
  description: string = 'Displays the git log with one line for each commit';
  alias: string = 'gpretty';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      await executeCommand('git', ['log', '--pretty=oneline']);
    });
  }
}
