import inquirer from 'inquirer';

export default interface Argument {
  name: string;
  questions?: inquirer.Question[];
}
