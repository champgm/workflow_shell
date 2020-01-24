import clipboardy from 'clipboardy';
import { v4 } from 'uuid';

import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';

const argumentss: Argument[] = [];
const options: Option[] = [];

export class Command extends SuperCommand {
  description: string = 'Puts a UUID onto the clipboard';
  alias: string = 'cbu';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      clipboardy.writeSync(v4());
    });
  }
}
