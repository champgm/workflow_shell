import { Command } from '@oclif/command';
import Argument from './Argument';
import inquirer from 'inquirer';
import { flattenArray } from '.';

export default abstract class Questionable extends Command {
  async askQuestions(args: Argument[]) {
    const questionses = args.map(arg => arg.questions);
    const questions = flattenArray(questionses);
    return await inquirer.prompt(questions);
  }
}
