import { Option } from './Option';
import { Argument } from './Argument';
import { CommanderStatic } from 'commander';
import JSON from 'flatted';

export interface Input {
  defaultName?: string;
  defaultMessage?: string;
  defaultSearchString?: string;
  type?: string;
  [key: string]: any;
}

export async function configureCommander(
  options: Option[],
  argumentss: Argument[],
  commander: CommanderStatic,
) {
  console.log(`Adding options: ${JSON.stringify(options)}`);
  for (const option of options) {
    const commanderString = option.isFlag
      ? `-${option.shortName}, --${option.name}`
      : `-${option.shortName}, --${option.name} <${option.name}>`;
    commander.option(commanderString, option.description);
  }
  console.log(`Adding arguments: ${JSON.stringify(argumentss)}`);
  if (argumentss.length > 0) {
    const argumentsString = argumentss.map(argss => argss.name).join('> <');
    console.log(`arguments stirng: ${argumentsString}`);
    console.log(`argv: ${JSON.stringify(process.argv)}`);
    commander.arguments(`<${argumentsString}>`)
      .action((...argumentsArray) => {
        console.log(`got arguments: ${JSON.stringify(argumentsArray)}`);
      });
  }
  commander.parse(process.argv);
}
