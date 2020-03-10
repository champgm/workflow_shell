import inquirer from 'inquirer';
import { Input } from './Input';
import { Question } from './Question';
import { Names } from './Names';
import AWS from 'aws-sdk';
import { configureAwsProfile } from '../AWS';

export interface Option {
  name: string;
  shortName: string;
  description: string;
  isFlag?: boolean;
  isOptional?: boolean;
  getQuestion: (input: Input) => Promise<inquirer.Question> | Promise<inquirer.Question[]>;
  configure: (input: any) => void;
}

export namespace Option {
  export const force: Option = {
    name: Names.FORCE,
    shortName: 'F',
    description: 'Skip input confirmation',
    isFlag: true,
    isOptional: true,
    getQuestion: () => undefined,
    configure: () => undefined,
  };

  export const branchName: Option = {
    name: Names.BRANCH,
    shortName: 'g',
    description: 'Git Branch',
    getQuestion: Question.getBranchName,
    configure: () => { },
  };

  export const number: Option = {
    name: Names.NUMBER,
    shortName: 'n',
    description: 'Number',
    getQuestion: Question.getNumber,
    configure: () => { },
  };

  export const REGION: Option = {
    name: Names.REGION,
    shortName: 'r',
    description: 'The AWS region to use',
    getQuestion: Question.getRegion,
    configure: (input: any) => {
      AWS.config.update({ region: input[Names.REGION] });
    },
  };

  export const PROFILE: Option = {
    name: Names.PROFILE,
    shortName: 'p',
    description: 'The AWS profile to use',
    getQuestion: Question.getProfile,
    configure: async (input: any) => {
      await configureAwsProfile(input[Names.PROFILE]);
    },
  };
}
