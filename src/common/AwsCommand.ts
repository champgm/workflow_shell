import { SuperCommand } from './SuperCommand';
import { Option } from './interface/Option';
import { Argument } from './interface/Argument';

export abstract class AwsCommand extends SuperCommand {
  public async prepareExecution(options: Option[] = [], argumentss: Argument[] = [], input?: any) {
    options.unshift(Option.REGION);
    options.unshift(Option.PROFILE);
    await super.prepareExecution(options, argumentss, input);
  }
}
