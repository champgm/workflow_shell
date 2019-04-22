import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';

const requiredOptions: Option[] = [];

export class Command extends SuperCommand {
  description: string = 'Displays the git log with one line for each commit';
  alias: string = 'gpretty';
  public async execute(input?: any) {
    await super.execute(requiredOptions, input);
    await executeCommand('git', ['log', '--pretty=oneline']);
  }
}
