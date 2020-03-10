import inquirer from 'inquirer';
import { Input } from './Input';
import { Names } from './Names';
import { getCurrentBranchName } from '../Git';
import { getAwsCredentials } from '../AWS';
import AWS from 'aws-sdk';

export namespace Question {
  export async function getBranchName(input: Input): Promise<inquirer.Question> {
    return {
      type: 'input',
      name: Names.BRANCH,
      message: 'Enter your Git branch name',
      default: async () => await getCurrentBranchName(),
    };
  }

  export async function getBaseBranchName(input: Input): Promise<inquirer.Question> {
    return {
      type: 'input',
      message: 'Enter your Git branch name',
      name: Names.BASE_BRANCH,
      default: 'master',
    };
  }

  export async function getCommitMessage(input: Input): Promise<inquirer.Question> {
    return {
      type: 'input',
      name: Names.COMMIT_MESSAGE,
      message: 'Enter your commit message',
      default: 'Test commit, please fixup',
    };
  }

  export async function getPassword(input: Input): Promise<inquirer.Question> {
    return {
      type: 'input',
      name: Names.PASSWORD,
      message: 'Enter the password',
    };
  }

  export async function getCommitSha(input: Input): Promise<inquirer.Question> {
    return {
      type: 'input',
      name: Names.COMMIT_SHA,
      message: 'Enter your commit SHA',
    };
  }

  export async function getNumber(input: Input): Promise<inquirer.Question> {
    return {
      type: 'input',
      name: Names.NUMBER,
      message: 'How many/what number?',
      default: 1,
    };
  }

  export async function getProfile(input: Input): Promise<inquirer.Question> {
    console.log(`get profile question`);
    const credentials = getAwsCredentials();
    return {
      type: 'list',
      choices: Object.keys(credentials),
      name: Names.PROFILE,
      message: 'Which AWS profile do you want to use?',
      default: 1,
    } as any;
  }

  export async function getRegion(input: Input): Promise<inquirer.Question> {
    console.log(`getting region question...`);
    const s3 = new AWS.S3();
    const ec2 = new AWS.EC2({ region: s3.config.region });
    const regions = await ec2.describeRegions().promise();
    console.log(`regions${JSON.stringify(regions, null, 2)}`);
    const regionNames = regions.Regions.map(region => region.RegionName);
    console.log(`regionNames${JSON.stringify(regionNames, null, 2)}`);
    const regionQuestion = {
      type: 'list',
      choices: () =>  regionNames,
      name: Names.REGION,
      message: 'Which AWS region do you want to use?',
      default: s3.config.region,
    };
    console.log(`regionQuestion${JSON.stringify(regionQuestion, null, 2)}`);
    return regionQuestion;
  }
}
