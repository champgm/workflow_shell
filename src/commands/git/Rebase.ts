import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';

const argumentss: Argument[] = [Argument.NUMBER];

export class Command extends SuperCommand {
  description: string = 'Takes one required argument, the number of commits to rebase.';
  alias: string = 'grb';
  public async execute(input?: any) {
    await super.execute([], argumentss, input);
    await executeCommand('git', ['rebase', '-i', `HEAD~${this.input[Argument.NAMES.NUMBER]}`]);
  }
}
