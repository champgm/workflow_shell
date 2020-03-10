import path from 'path';
import fs from 'fs';
import Zip from 'node-7z';

import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { Argument } from '../../common/interface/Argument';
import { Names } from '../../common/interface/Names';
import { executeCommand } from '../../common/Cli';
import { spawn } from 'child_process';

const argumentss: Argument[] = [];
const options: Option[] = [];

export class Command extends SuperCommand {
  description: string = 'Attempts to import pages into a clay instance a bunch at a time';
  alias: string = 'clay-import';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {

      const importPromises: Promise<any>[] = [];
      for (let index = 0; index < 10; index += 1) {
        importPromises.push(this.executeImport(index));
      }

      for (const importPromise of importPromises) {
        try {
          await importPromise;
        } catch (error) {
          console.log(`An error ocurred: ${error}`);
        }
      }
    });
  }

  private async executeImport(index: number) {
    // Eh, having trouble piping, so let's just dump the full command to shell
    const child = spawn('cat 50.yml | clay import -k ${_clay_access_key} -y https://${_clay_site_host}', {
      shell: true,
    });
    child.stderr.on('data', (data) => {
      console.error(`STDERR ${index}:`, data.toString());
    });
    child.stdout.on('data', (data) => {
      console.log(`STDOUT ${index}:`, data.toString());
    });
    child.on('exit', (exitCode) => {
      console.log(`Child ${index} exited with code:` + exitCode);
    });

    return new Promise((resolve, reject) => {
      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(`Failure: ${code}`);
        }
      });
    });
  }

}
