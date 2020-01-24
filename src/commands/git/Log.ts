import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';

const argumentss: Argument[] = [];
const options: Option[] = [];

export class Command extends SuperCommand {
  description: string = 'Displays the git log with each commit on one line in nice colors';
  alias: string = 'glog';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      const prettyFormat = '--pretty=format:\'%Cred %H %Cgreen %gD %Cblue %s %C(Yellow) %aN\'';
      await executeCommand('git', ['reflog', prettyFormat]);
    });
  }
}
