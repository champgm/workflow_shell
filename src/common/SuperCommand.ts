import inquirer from 'inquirer';
import { Option } from './interface/Option';
import { Argument } from './interface/Argument';
import { parseArgumentsAndOptions } from './interface/Input';
import FLAT from 'flatted';
import Commander, { Command, CommanderStatic } from 'commander';
import { inspect } from 'util';
import { Names } from './interface/Names';

export abstract class SuperCommand {
  abstract alias: string;
  abstract description: string;
  input: any;
  requiredOptions: Option[];
  commander: CommanderStatic;

  public async execute(options: Option[] = [], argumentss: Argument[] = [], input?: any) {
    this.commander = require('commander');
    options.unshift(Option.force);
    this.requiredOptions = options;
    this.input = await this.verifyInput(this.commander, options, argumentss, input);
    await this.configureInput();
  }

  public async confirm(message, confirmDefault = true, throwOnFalse = true): Promise<boolean> {
    if (!this.input[Names.FORCE]) {
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
    options: Option[],
    argumentss: Argument[],
    injectedInput: any,
  ) {
    if (injectedInput) {
      this.verifyInjectedInput(options, injectedInput);
      return injectedInput;
    }

    const parsedArguments = await parseArgumentsAndOptions(options, argumentss, commander);
    let somethingMissing = false;
    argumentss.forEach((argument) => {
      const found = !!parsedArguments[argument.name];
      if (!found) {
        console.log(`Did not find argument: ${argument.name}`);
        somethingMissing = true;
      }
    });
    if (somethingMissing) {
      const questions = await Promise.all(argumentss.map(argument => argument.getQuestion(parsedArguments)));
      const answers = await inquirer.prompt(questions) as any;
      return { ...parsedArguments, ...answers };
    }
    return parsedArguments;
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
