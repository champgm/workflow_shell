import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';

import FLAT from 'flatted';

const argumentss: Argument[] = [Argument.GIT_BRANCH];

export class Command extends SuperCommand {
  description: string = 'Takes one argument, the name of the branch. Checks out a new branch.';
  alias: string = 'gcb';
  public async execute(input?: any) {
    await super.execute([], argumentss, input);
    await executeCommand('git', ['checkout', '-b', this.input[Argument.GIT_BRANCH.name]]);
  }
}
