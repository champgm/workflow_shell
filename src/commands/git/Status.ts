import { executeCommand } from '../../common/Cli';
import { SuperCommand } from '../../common/SuperCommand';
import { Argument } from '../../common/interface/Argument';
import { Option } from '../../common/interface/Option';

const argumentss: Argument[] = [];
const options: Option[] = [];

export class Command extends SuperCommand {
  description: string = 'Displays the current status of the git repository';
  alias: string = 'gs';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      await executeCommand('git', ['status']);
    });
  }
}
