#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
// import * as minimist from 'minimist';
import SuperCommand from './common/SuperCommand';
import glob from 'glob';
// import Command from "./models/Command";

// const argv = minimist(process.argv.slice(2));

// From applegrain
// https://gist.github.com/kethinov/6658166
// function walkSync(dir: string, inputFileList: string[] = []): string[] {
//   let fileList: string[] = inputFileList;
//   fs.readdirSync(dir).forEach((file) => {
//     fileList = fs.statSync(path.join(dir, file)).isDirectory()
//       ? walkSync(path.join(dir, file), fileList)
//       : fileList.concat(path.join(dir, file));
//   });
//   return fileList;
// }

// Keep track of commands we"ve found, in case we don't find what we're looking for.
const foundCommand: boolean = false;
const foundCommands: string[] = [];
const workingDirectory: string = __dirname;
// const desiredCommand: string = argv._.shift();

console.log(`${JSON.stringify(process.argv, null, 2)}`);

const commandPaths: string[] = glob.sync(`${__dirname}/commands/**/*.js`);
console.log(`${commandPaths}`);

// walkSync(workingDirectory, []).forEach((filePath) => {
//   if (!foundCommand &&
//     filePath.includes('commands') &&
//     filePath.includes('.ts')) {
//     try {
//       // Try to require the class
//       const command: SuperCommand = new (require(filePath).Command);
//       // If it's the right one, instantiate it and run it
//       if (desiredCommand === command.alias) {
//         command.execute();
//         process.exit();
//       } else {
//         // Otherwise, take note of it
//         foundCommands.push(`${command.alias}\t${command.description}`);
//       }
//     } catch (error) {
//       console.log(`Problem occurred while trying to instantiate "${filePath}"`);
//       console.log(`Error: ${error} `);
//       throw error;
//     }
//   }
// });

// No commands matched... print out the available ones.
if (!foundCommand && typeof foundCommands !== 'undefined' && foundCommands.length > 0) {
  console.log(`Unknown command specified:  `);
  foundCommands.forEach((command) => {
    console.log(`${command} `);
  });
}
