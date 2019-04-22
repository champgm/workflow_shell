import inquirer from 'inquirer';
import { Option } from './interface/Option';
import { Argument } from './interface/Argument';
import { parseWithCommander } from './interface/Input';
import FLAT from 'flatted';
import Commander, { Command, CommanderStatic } from 'commander';
import { inspect } from 'util';

export abstract class SuperCommand {
  abstract alias: string;
  abstract description: string;
  input: any;
  requiredOptions: Option[];
  inquirerQuestions: any[];
  commander: CommanderStatic;

  public async execute(options: Option[] = [], argumentss: Argument[] = [], input?: any) {
    this.commander = require('commander');
    this.inquirerQuestions = [];
    options.unshift(Option.force);
    this.requiredOptions = options;
    this.input = await this.verifyInput(this.commander, this.inquirerQuestions, options, argumentss, input);
    await this.configureInput();
  }

  public async confirm(message, confirmDefault = true, throwOnFalse = true): Promise<boolean> {
    if (!this.input[Option.NAMES.FORCE]) {
      const answers: any = await inquirer.prompt({
        message,
        type: 'confirm',
        name: 'confirm',
        default: confirmDefault,
      });
      if (throwOnFalse && !answers.confirm) {
        console.log(`Confirmation failed, aborting.`);
        process.exit();
      }
      return answers.confirm;
    }
    return true;
  }

  public async verifyInput(
    commander: CommanderStatic,
    inquirerQuestions: any[],
    options: Option[],
    argumentss: Argument[],
    injectedInput: any,
  ) {
    if (injectedInput) {
      this.verifyInjectedInput(options, injectedInput);
      return injectedInput;
    }

    const parsedArguments = await parseWithCommander(options, argumentss, commander);
    const somethingMissing = argumentss.find((argument) => {
      const found = !!parsedArguments[argument.name];
      if (!found) {
        console.log(`\nDid not find required option: ${JSON.stringify(argument)}`);
        console.log(`\nWill prompt for all values.`);
      }
      return !found;
    });
    if (somethingMissing) {
      console.log(`\nSomething missing: ${JSON.stringify(somethingMissing)}`);
    }
    const input = somethingMissing
      ? await inquirer.prompt(inquirerQuestions)
      : parsedArguments;
    return input;
  }

  public async configureInput() {
    for (const option of this.requiredOptions) {
      await option.configure(this.input);
    }
  }

  public verifyInjectedInput(requiredOptions: Option[], injectedInput: any) {
    const injectedInputMissing = requiredOptions.find((option) => {
      return !injectedInput[option.name];
    });
    if (injectedInputMissing) {
      throw new Error(`Required input not found.\n` +
        `Required: ${JSON.stringify(injectedInputMissing)}\n` +
        `Found: ${JSON.stringify(injectedInput)} `);
    }
  }
}
