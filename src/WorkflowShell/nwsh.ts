

import * as fs from "fs";
import * as path from "path";
import * as minimist from "minimist";
// import Command from "./models/Command";

const argv = minimist(process.argv.slice(2));

// From applegrain
// https://gist.github.com/kethinov/6658166
const walkSync = (dir: string, inputFileList: Array<string> = []): Array<string> => {
  let fileList: Array<string> = inputFileList;
  fs.readdirSync(dir).forEach((file) => {
    fileList = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), fileList)
      : fileList.concat(path.join(dir, file));
  });
  return fileList;
};

// Keep track of commands we"ve found, in case we don't find what we're looking for.
let foundCommand: boolean = false;
const foundCommands: Array<string> = [];
const workingDirectory: string = __dirname;
const desiredCommand: string = argv._.shift();
walkSync(workingDirectory, []).forEach((filePath) => {
  if (!foundCommand &&
    filePath.indexOf("util") < 0 &&
    filePath.indexOf("models") < 0 &&
    filePath.indexOf("nwsh.ts") < 0 &&
    filePath.indexOf(".ts") > -1) {
    try {
      // Try to require the class
      const ClassObject = require(filePath).default;
      // console.log(`Class Object: ${JSON.stringify(ClassObject)}`);
      // for (const thing in ClassObject) {
      //   console.log(`Thing: ${thing}`);
      //   for (const thing2 in ClassObject[thing]) {
      //     console.log(`Thing2: ${thing2}`);
      //   }
      // }
      // If it"s the right one, instantiate it and run it
      if (desiredCommand === ClassObject.getString()) {
        const commandInstance = new ClassObject();
        commandInstance.run(argv);
        foundCommand = true;
      } else {
        // Otherwise, take note of it
        foundCommands.push(`${ClassObject.getString()}\t${ClassObject.getDescription()}`);
      }
    } catch (error) {
      console.log(`Problem occurred while trying to instantiate "${filePath}"`);
      console.log(`Error: ${error} `);
      throw error;
    }
  }
});

// No commands matched... print out the available ones.
if (!foundCommand && typeof foundCommands !== "undefined" && foundCommands.length > 0) {
  console.log(`Unknown command specified: ${desiredCommand} `);
  foundCommands.forEach((command) => {
    console.log(`${command} `);
  });
}
