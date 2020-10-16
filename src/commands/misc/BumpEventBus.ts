import fs from 'fs';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';
import { Names } from '../../common/interface/Names';
import { Option } from '../../common/interface/Option';

import { pathToEventBus, pathToClay, pathToSearch } from '../../common/Configuration'

const options: Option[] = [];
const argumentss: Argument[] = [];

export class Command extends SuperCommand {
  description: string = 'Bumps versions';
  alias: string = 'bump-event-bus';
  regex: RegExp = new RegExp(/alpha\.\d\d/g);
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      const eventBusJsonPath = `${pathToEventBus}/package.json`;
      let eventBusPackageJson = fs.readFileSync(eventBusJsonPath).toString('UTF-8');
      const currentVersion = this.regex.exec(eventBusPackageJson);

      console.log(`Current version: ${currentVersion}`);
      const nextNumber = parseInt(currentVersion.toString().split('.')[1]) + 1;
      const nextVersion = `alpha.${nextNumber}`
      console.log(`Next Version: ${nextVersion}`);

      eventBusPackageJson = eventBusPackageJson.replace(this.regex, nextVersion);
      fs.writeFileSync(eventBusJsonPath, eventBusPackageJson)
      await executeCommand('npm', ['publish'], { cwd: pathToEventBus });

      const searchJsonPath = `${pathToSearch}/package.json`;
      let searchPackageJson = fs.readFileSync(searchJsonPath).toString('UTF-8');
      searchPackageJson = searchPackageJson.replace(this.regex, nextVersion);
      fs.writeFileSync(searchJsonPath, searchPackageJson)
      await executeCommand('npm', ['publish'], { cwd: pathToSearch });

      const clayJsonPath = `${pathToClay}/package.json`;
      let clayPackageJson = fs.readFileSync(clayJsonPath).toString('UTF-8');
      clayPackageJson = clayPackageJson.replace(this.regex, nextVersion);
      fs.writeFileSync(clayJsonPath, clayPackageJson)
    });
  }
}
