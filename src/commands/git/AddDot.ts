import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';

const requiredOptions: Option[] = [];

export class Command extends SuperCommand {
  description: string = 'Stages all files and folders in the current directory';
  alias: string = 'gad';
  public async execute(input?: any) {
    await super.execute(requiredOptions, input);
    await executeCommand('git', ['add', '.']);
  }
}
