import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';
import { Names } from '../../common/interface/Names';
import { Option } from '../../common/interface/Option';

const options: Option[] = [];
const argumentss: Argument[] = [Argument.NUMBER];

export class Command extends SuperCommand {
  description: string = 'Takes one required argument, the number of commits to rebase.';
  alias: string = 'grb';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      await executeCommand('git', ['rebase', '-i', `HEAD~${this.input[Names.NUMBER]}`]);
    });
  }
}
