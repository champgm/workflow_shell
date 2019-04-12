import inquirer from 'inquirer';
import { Option } from './interface/Option';

export abstract class SuperCommand {
  abstract alias: string;
  abstract description: string;
  input: any;
  requiredOptions: Option[];
  inquirerQuestions: any[];
  commander: any;

  public async execute(requiredOptions: Option[] = [], input?: any) {
    this.commander = require('commander');
    this.inquirerQuestions = [];
    requiredOptions.unshift(Option.LIBRARY.FORCE);
    this.requiredOptions = requiredOptions;
    this.input = await this.verifyInput(this.commander, this.inquirerQuestions, requiredOptions, input);
    await this.configureInput();
  }

  public async confirm(message, confirmDefault = true, throwOnFalse = true): Promise<boolean> {
    if (!this.input[Option.LIBRARY.FORCE.name]) {
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

  public async verifyInput(commander: any, inquirerQuestions: any[], requiredOptions: Option[], injectedInput: any) {
    if (injectedInput) {
      this.verifyInjectedInput(requiredOptions, injectedInput);
      return injectedInput;
    }

    await Option.requireOptions(requiredOptions, commander);
    const somethingMissing = requiredOptions.find((option) => {
      if (!option.isOptional) {
        const optionFound = !!commander[option.name];
        if (!optionFound) {
          console.log(`Did not find required option: ${JSON.stringify(option)}`);
          console.log(`Will prompt for all values.`);
        }
        return !optionFound;
      }
      return false;
    });
    if (somethingMissing) {
      console.log(`Something missing: ${JSON.stringify(somethingMissing)}`);
    }
    const input = somethingMissing
      ? await inquirer.prompt(inquirerQuestions)
      : commander;
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
