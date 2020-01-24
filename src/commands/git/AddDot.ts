import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';

const argumentss: Argument[] = [];
const options: Option[] = [];

export class Command extends SuperCommand {
  description: string = 'Stages all files and folders in the current directory';
  alias: string = 'gad';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      await executeCommand('git', ['add', '.']);
    });
  }
}
