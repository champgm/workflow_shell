import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';

const requiredOptions: Option[] = [Option.LIBRARY.BRANCH];

export class Command extends SuperCommand {
  description: string = 'Takes one argument, the name of the branch. Checks out a new branch.';
  alias: string = 'gcb';
  public async execute(input?: any) {
    await super.execute(requiredOptions, input);
    console.log(`${JSON.stringify(this.input, null, 2)}`);
    await executeCommand('git', ['checkout', '-b']);
  }
}
