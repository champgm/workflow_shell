import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';

const requiredOptions: Option[] = [];

export class Command extends SuperCommand {
  description: string = 'Amends the most recent commit to ensure that it has the correct author and an updated timestamp';
  alias: string = 'ga';
  public async execute(input?: any) {
    await super.execute(requiredOptions, input);
    await executeCommand('git', ['commit', '--amend', '--reset-author', '--no-edit']);
  }
}
