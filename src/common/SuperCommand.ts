import inquirer from 'inquirer';
import { Argument } from './interface/Argument';

export default abstract class SuperCommand {
  abstract alias: string;
  input: any;
  requiredArguments: Argument[];
  inquirerQuestions: any[];
  commander: any;

  public async execute(requiredArguments: Argument[] = [], input?: any) {
    this.commander = require('commander');
    this.inquirerQuestions = [];
    requiredArguments.unshift(Argument.LIBRARY.FORCE);
    this.requiredArguments = requiredArguments;
    this.input = await this.verifyInput(this.commander, this.inquirerQuestions, requiredArguments, input);
    await this.configureInput();
  }

  public async confirm(message, confirmDefault = true, throwOnFalse = true): Promise<boolean> {
    if (!this.input[Argument.LIBRARY.FORCE.name]) {
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

  public async verifyInput(commander: any, inquirerQuestions: any[], requiredArguments: Argument[], injectedInput: any) {
    if (injectedInput) {
      this.verifyInjectedInput(requiredArguments, injectedInput);
      return injectedInput;
    }

    await Argument.requireArguments(requiredArguments, commander);
    const somethingMissing = requiredArguments.find((argument) => {
      if (!argument.isOptional) {
        const argumentFound = !!commander[argument.name];
        if (!argumentFound) {
          console.log(`Did not find required argument: ${JSON.stringify(argument)}`);
          console.log(`Will prompt for all values.`);
        }
        return !argumentFound;
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
    for (const argument of this.requiredArguments) {
      await argument.configure(this.input);
    }
  }

  public verifyInjectedInput(requiredArguments: Argument[], injectedInput: any) {
    const injectedInputMissing = requiredArguments.find((argument) => {
      return !injectedInput[argument.name];
    });
    if (injectedInputMissing) {
      throw new Error(`Required input not found.\n` +
        `Required: ${JSON.stringify(injectedInputMissing)}\n` +
        `Found: ${JSON.stringify(injectedInput)} `);
    }
  }
}
