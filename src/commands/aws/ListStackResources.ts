import AWS from 'aws-sdk';

import { Argument } from '../../common/interface/Argument';
import { Option } from '../../common/interface/Option';
import { Names } from '../../common/interface/Names';
import { AwsCommand } from '../../common/AwsCommand';
import { exponentialBackOff } from '../../common';

const argumentss: Argument[] = [];
const options: Option[] = [];

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
      const stackSummaries = (await cloudFormation.listStacks().promise()).StackSummaries;
      let headersWritten = false;
      for (const ss of stackSummaries) {
        await exponentialBackOff(async () => {
          const stackResourceSummaries = (await cloudFormation.listStackResources({
            StackName: ss.StackId,
          }).promise()).StackResourceSummaries;
          if (stackResourceSummaries.length) {
            if (!headersWritten) {
              process.stdout.write(headers.join('\t'));
              process.stdout.write('\n');
              headersWritten = true;
            }
            stackResourceSummaries.forEach((srs) => {
              const item = { ...srs, ...ss };
              headers.forEach((h, j) => {
                const value = JSON.stringify(item[h]) || '';
                process.stdout.write(value);
                if (j !== headers.length - 1) {
                  process.stdout.write('\t');
                } else {
                  process.stdout.write('\n');
                }
              });
            });
          }
        });
      }
    });
  }
}
