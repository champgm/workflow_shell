import { executeCommand } from '../../common/Cli';
import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';

const requiredOptions: Option[] = [];

export class Command extends SuperCommand {
  description: string = 'Displays the current status of the git repository';
  alias: string = 'gs';
  public async execute(input?: any) {
    await super.execute(requiredOptions, input);
    await executeCommand('git', ['status']);
  }
}
