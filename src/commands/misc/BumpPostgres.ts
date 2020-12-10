import fs from 'fs';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';
import { Names } from '../../common/interface/Names';
import { Option } from '../../common/interface/Option';

import {
  pathToClay,
  // pathToAmphora,
  // pathToAmphoraAuth,
  pathToAmphoraStoragePostgres,
  // pathToAmphoraSitemaps,
} from '../../common/Configuration';

const options: Option[] = [];
const argumentss: Argument[] = [];

export class Command extends SuperCommand {
  description: string = 'Bumps postgres versions';
  alias: string = 'bump-postgres';
  regex: RegExp = new RegExp(/alpha\.m\d/g);
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      const amphoraJsonPath = `${pathToAmphoraStoragePostgres}/package.json`;
      let amphoraPackageJson = fs.readFileSync(amphoraJsonPath).toString('UTF-8');
      const currentVersion = this.regex.exec(amphoraPackageJson);

      console.log(`Current version: ${currentVersion}`);
      const nextNumber = parseInt(currentVersion.toString().split('.m')[1]) + 1;
      const nextVersion = `alpha.m${nextNumber}`
      console.log(`Next Version: ${nextVersion}`);

      for (const path of [pathToAmphoraStoragePostgres]) {
        await this.bump(path, nextVersion);
      }
      await this.bump(pathToClay, nextVersion);

      for (const path of [pathToAmphoraStoragePostgres]) {
        await this.publish(path);
      }
    });
  }

  private async bump(path, nextVersion) {
    const jsonPath = `${path}/package.json`;
    let packageJson = fs.readFileSync(jsonPath).toString('UTF-8');
    packageJson = packageJson.replace(this.regex, nextVersion);
    fs.writeFileSync(jsonPath, packageJson)
  }

  private async publish(path) {
    await executeCommand('npm', ['publish'], { cwd: path });
  }
}
