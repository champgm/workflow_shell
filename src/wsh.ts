#!/usr/bin/env node

import glob from 'glob';

import { SuperCommand } from './common/SuperCommand';
import { revealAllProperties } from './common';

const desiredCommand: string = process.argv[2];
const commandPaths: string[] = glob.sync(`${__dirname}/commands/**/*.js`);
const foundCommands: { [alias: string]: SuperCommand } = {};

const commandPromises = commandPaths.map(async (path) => {
  try {
    const command: SuperCommand = new (require(path).Command);
    if (desiredCommand === command.alias) {
      try {
        await command.execute();
        process.exit();
      } catch (error) {
        console.error(`An error occurred:`);
        console.error(JSON.stringify(revealAllProperties(error), null, 2));
        throw error;
      }
    } else {
      return command;
    }
  } catch (error) {
    console.error(`Problem occurred while trying to instantiate Command in file, '${path}'`);
    console.error(`Error: ${error} `);
    throw error;
  }
});

(async () => {
  const commands = await Promise.all(commandPromises);
  console.log(`Command not found, available commands:`);
  for (const command of commands) {
    console.log(`${command.alias}\t${command.description}`);
  }
})();
