#!/usr/bin/env node

import glob from 'glob';

import { SuperCommand } from './common/SuperCommand';

const desiredCommand: string = process.argv[2];
const commandPaths: string[] = glob.sync(`${__dirname}/commands/**/*.js`);
const foundCommands: { [alias: string]: SuperCommand } = {};

commandPaths.forEach(async (path) => {
  try {
    const command: SuperCommand = new (require(path).Command);
    if (desiredCommand === command.alias) {
      await command.execute();
      process.exit();
    } else {
      foundCommands[command.alias] = command;
    }
  } catch (error) {
    console.log(`Problem occurred while trying to instantiate Command in file, '${path}'`);
    console.log(`Error: ${error} `);
    throw error;
  }
});

console.log(`Command not found, available commands:`);
for (const commandAlias of Object.keys(foundCommands).sort()) {
  console.log(`${commandAlias}\t${foundCommands[commandAlias].description}`);
}
