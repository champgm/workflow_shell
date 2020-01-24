import clipboardy from 'clipboardy';

import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';

const argumentss: Argument[] = [];
const options: Option[] = [];

export class Command extends SuperCommand {
  description: string = 'Puts a timestamp onto the clipboard';
  alias: string = 'cbt';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      const date = new Date();
      const year = `${date.getFullYear()}`;
      const month = date.getMonth() < 10 ? `0${date.getMonth()}` : `${date.getMonth()}`;
      const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
      const hours = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;

      clipboardy.writeSync(`${year}-${month}-${day} ${hours}:${minutes}`);
    });
  }
}
