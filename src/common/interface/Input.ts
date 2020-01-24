import _ from 'lodash';
import { Option } from './Option';
import { Argument } from './Argument';
import { CommanderStatic } from 'commander';

export interface Input {
  defaultName?: string;
  defaultMessage?: string;
  defaultSearchString?: string;
  type?: string;
  [key: string]: any;
}

export async function parseArgumentsAndOptions(
  options: Option[],
  argumentss: Argument[],
  commander: CommanderStatic,
) {
  for (const option of options) {
    const commanderString = option.isFlag
      ? `-${option.shortName}, --${option.name}`
      : `-${option.shortName}, --${option.name} <${option.name}>`;
    commander.option(commanderString, option.description);
  }

  // Commander sucks at parsing arguments, I'll do it myself.
  const argv = _.clone(process.argv);
  const parsedArguments: { [argumentName: string]: any } = {};
  if (argumentss.length > 0) {
    // argv will look like this: [
    //   "/Users/userName/.nvm/versions/node/v12.13.0/bin/node",
    //   "/Users/userName/.nvm/versions/node/v12.13.0/bin/wsh",
    //   "gcam",
    //   "ok" ]
    for (let index = 0; index < argumentss.length; index += 1) {
      const argument = argumentss[index];
      const argumentIndex = index + 3; // because of node, wsh, and subcommand
      parsedArguments[argument.name] = argv[argumentIndex] || argument.default;
    }
  }
  try {
    commander._exit = () => { };
    commander.parse(process.argv);
    return parsedArguments;
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return {};
  }
}
