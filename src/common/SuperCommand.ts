import _ from 'lodash';
import inquirer from 'inquirer';

import { Option } from './interface/Option';
import { Argument } from './interface/Argument';
import { Names } from './interface/Names';

export abstract class SuperCommand {
  abstract alias: string;
  abstract description: string;
  input: any;
  requiredOptions: Option[];
  public abstract execute(vital?: boolean, input?: any): Promise<void>;

  public async prepareExecution(options: Option[] = [], argumentss: Argument[] = [], input?: any) {
    options.unshift(Option.force);
    this.requiredOptions = options;
    this.input = await this.verifyInput(options, argumentss, input);
    await this.configureInput();
  }

  public async executeWithInput(
    argumentss: Argument[],
    options: Option[],
    input: any,
    vital: boolean,
    functionToExecute: (input: any) => Promise<void>,
  ) {
    try {
      await this.prepareExecution(options, argumentss, input);
      await functionToExecute(input);
    } catch (error) {
      console.log(`An error ocurred: ${error}`);
      if (vital) process.exit(1);
    }
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

  public async verifyInput(options: Option[], argumentss: Argument[], injectedInput: any) {
    if (injectedInput) {
      this.verifyInjectedInput(argumentss, injectedInput);
      return injectedInput;
    }

    const parsedArguments = await this.parseArgumentsAndOptions(options, argumentss);
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

  private async parseArgumentsAndOptions(
    options: Option[],
    argumentss: Argument[],
  ) {
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
      return parsedArguments;
    } catch (error) {
      console.log(`ERROR: ${error}`);
      return {};
    }
  }

  public async configureInput() {
    for (const option of this.requiredOptions) {
      await option.configure(this.input);
    }
  }

  public verifyInjectedInput(argumentss: Argument[], injectedInput: any) {
    const injectedInputMissing = argumentss.find((option) => {
      return !injectedInput[option.name];
    });
    if (injectedInputMissing) {
      throw new Error(`Required input not found.\n` +
        `Required: ${JSON.stringify(injectedInputMissing)}\n` +
        `Found: ${JSON.stringify(injectedInput)} `);
    }
  }
}
