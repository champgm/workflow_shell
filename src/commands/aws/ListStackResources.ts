import AWS from 'aws-sdk';

import { Argument } from '../../common/interface/Argument';
import { Option } from '../../common/interface/Option';
import { Names } from '../../common/interface/Names';
import { AwsCommand } from '../../common/aws/AwsCommand';
import { exponentialBackOff } from '../../common';

const argumentss: Argument[] = [];
const options: Option[] = [Option.STACK];

const headers = [
  // STACK_SUMMARY_PROPERTIES
  'CreationTime',
  'DeletionTime',
  'LastUpdatedTime',
  'ParentId',
  'RootId',
  'StackId',
  'StackName',
  'StackStatus',
  'StackStatusReason',
  'TemplateDescription',
  // RESOURCE_SUMMARY_PROPERTIES
  'LastUpdatedTimestamp',
  'LogicalResourceId',
  'PhysicalResourceId',
  'ResourceStatus',
  'ResourceType',
];

export class Command extends AwsCommand {
  description: string = 'Prints AWS stack resources';
  alias: string = 'aws-print-stack-resources';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {

      await this.confirm(`Ready to use profile, '${this.input[Names.PROFILE]}' ` +
        `to list stack resources in region, '${this.input[Names.REGION]}'?`);

      const cloudFormation = new AWS.CloudFormation();
      // const stackSummaries = (await cloudFormation.listStacks().promise()).StackSummaries;
      let headersWritten = false;
      // for (const ss of stackSummaries) {
      await exponentialBackOff(async () => {
        const stackSummary = await cloudFormation.describeStacks({
          StackName: this.input[Names.STACK],
        }).promise();
        const stackResourceSummaries = (await cloudFormation.listStackResources({
          StackName: this.input[Names.STACK],
        }).promise()).StackResourceSummaries;
        if (stackResourceSummaries.length) {
          if (!headersWritten) {
            process.stdout.write(headers.join('\t'));
            process.stdout.write('\n');
            headersWritten = true;
          }
          stackResourceSummaries.forEach((stackResourceSummary) => {
            const summaryBlob = { ...stackResourceSummary, ...stackSummary };
            headers.forEach((header, headerIndex) => {
              const value = JSON.stringify(summaryBlob[header]) || '';
              process.stdout.write(value);
              if (headerIndex !== headers.length - 1) {
                process.stdout.write('\t');
              } else {
                process.stdout.write('\n');
              }
            });
          });
        }
      });
      // }
    });
  }
}
