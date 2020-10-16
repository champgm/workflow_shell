import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';
import { Names } from '../../common/interface/Names';
import { Option } from '../../common/interface/Option';
import { sleep } from '../../common';
import request from 'request-promise-native'

const options: Option[] = [];
const argumentss: Argument[] = [Argument.COMMIT_MESSAGE];

export class Command extends SuperCommand {
  description: string = 'Poll an endpoint';
  alias: string = 'poll';
  public async execute(vital?: boolean, input?: any) {
    while (true) {
      const response = await request
        .get("https://web-stage-batch2.content-hub.cnn-cms.net/_components/alerts/instances/all")
      console.log(`STRING: ${response}`);
      console.log(`JSON: ${JSON.stringify(response, null, 2)}`);
      await sleep(500)
    }
  }
}
