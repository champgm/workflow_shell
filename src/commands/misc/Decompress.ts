import path from 'path';
import fs from 'fs';
import Zip from 'node-7z';

import { Option } from '../../common/interface/Option';
import { SuperCommand } from '../../common/SuperCommand';
import { Argument } from '../../common/interface/Argument';
import { Names } from '../../common/interface/Names';

const argumentss: Argument[] = [Argument.PASSWORD];
const options: Option[] = [];

export class Command extends SuperCommand {
  description: string = 'Stages all files and folders in the current directory';
  alias: string = 'unzip';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {
      const files = this.findByExtension('.', ['.zip', '.rar', '.7z']);
      console.log(`files${JSON.stringify(files, null, 2)}`);
      files.forEach(async (filePath) => {
        try {
          const file = path.parse(filePath);
          const targetPath = path.join(file.dir, file.name);
          if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath);

          const zipOptions = {
            $progress: true,
            password: this.input[Names.PASSWORD],
          };
          await ((Zip as any).extractFull(filePath, file.dir, zipOptions));
        } catch (error) {
          console.log(`An error ocurred while extracting '${filePath}': ${error}`);
        }
      });
    });
  }

  // https://gist.github.com/victorsollozzo/4134793
  private findByExtension(
    basePath: string,
    extensions: string[],
    filesToCheck: string[] = fs.readdirSync(basePath),
    previousResults: string[] = [],
  ): string[] {
    let newResults: string[] = [].concat(previousResults);
    filesToCheck.forEach((file) => {
      const newBasePath = path.join(basePath, file);
      try {
        if (fs.statSync(newBasePath).isDirectory()) {
          const newFilesToCheck = fs.readdirSync(newBasePath);
          newResults = newResults.concat(this.findByExtension(newBasePath, extensions, newFilesToCheck, previousResults));
        } else if (extensions.includes(path.extname(newBasePath))) {
          newResults.push(newBasePath);
        }
      } catch (error) {
        console.log(`An error ocurred reading '${newBasePath}': ${error}`);
      }
    });
    return newResults.sort();
  }
}
