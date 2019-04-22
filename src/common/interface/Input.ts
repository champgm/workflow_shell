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

export async function configureCommander(
  options: Option[],
  args: Argument[],
  commander: CommanderStatic,
) {
  console.log(`Adding options: ${JSON.stringify(options)}`);
  for (const option of options) {
    const commanderString = option.isFlag
      ? `-${option.shortName}, --${option.name}`
      : `-${option.shortName}, --${option.name} <${option.name}>`;
    commander.option(commanderString, option.description);
  }
  console.log(`Adding arguments: ${JSON.stringify(arguments)}`);
  if (args.length > 0) {
    const argsString = args.map(arg => arg.name).join('> <');
    commander.arguments(`<${argsString}>`);
  }
  commander.parse(process.argv);
}
