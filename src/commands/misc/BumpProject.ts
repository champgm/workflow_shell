import fs from 'fs';
import { SuperCommand } from '../../common/SuperCommand';
import { executeCommand } from '../../common/Cli';
import { Argument } from '../../common/interface/Argument';
import { Names } from '../../common/interface/Names';
import { Option } from '../../common/interface/Option';

import {
  pathToClay,
  pathToAmphora,
  // pathToEventBus,
  pathToAmphoraStoragePostgres,
  // pathToSearch,
  pathToAmphoraSitemaps,
} from '../../Configuration.json';

const options: Option[] = [];
const argumentss: Argument[] = [];

export class Command extends SuperCommand {
  description: string = 'Bumps project versions';
  alias: string = 'bump-project';
  regex: RegExp = new RegExp(/alpha\.m\d\d\d/g);
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      const amphoraJsonPath = `${pathToAmphora}/package.json`;
      let amphoraPackageJson = fs.readFileSync(amphoraJsonPath).toString('UTF-8');
      const currentVersion = this.regex.exec(amphoraPackageJson);

      console.log(`Current version: ${currentVersion}`);
      const nextNumber = parseInt(currentVersion.toString().split('.m')[1]) + 1;
      const nextVersion = `alpha.m${nextNumber}`
      console.log(`Next Version: ${nextVersion}`);

      for (const path of [
        pathToAmphoraStoragePostgres,
        pathToAmphora,
        // pathToEventBus,
        // pathToSearch,
        pathToAmphoraSitemaps,
      ]) {
        console.log(`Bumping versions for ${path} ...`);
        await this.bump(path, nextVersion);
        console.log(`Bumping versions DONE`);
      }
      console.log(`Bumping Clay versions...`);
      await this.bump(pathToClay, nextVersion);
      console.log(`Bumping Clay versions DONE`);

      for (const path of [
        pathToAmphoraStoragePostgres,
        pathToAmphora,
        // pathToEventBus,
        // pathToSearch,
        pathToAmphoraSitemaps,
      ]) {
        console.log(`Publishing ${path} ...`);
        await this.publish(path);
        console.log(`Publishing DONE`);
      }
    });
  }

  private async bump(path, nextVersion) {
    const jsonPath = `${path}/package.json`;
    console.log(`Bumping versions in ${jsonPath}`);
    let packageJson = fs.readFileSync(jsonPath).toString('UTF-8');
    packageJson = packageJson.replace(this.regex, nextVersion);
    fs.writeFileSync(jsonPath, packageJson)
  }

  private async publish(path) {
    await executeCommand('npm', ['run','release'], { cwd: path });
  }
}
