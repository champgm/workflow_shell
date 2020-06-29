import AWS from 'aws-sdk';

import { Argument } from '../../common/interface/Argument';
import { Option } from '../../common/interface/Option';
import { Names } from '../../common/interface/Names';
import { AwsCommand } from '../../common/aws/AwsCommand';
import { StackTraversal } from '../../common/aws/StackTraversal';
import { deleteStacks, deleteNatGateways, deleteNetworkInterfaces, deleteSecurityGroups, awaitDeletion, deleteElasticContainerRegistries, deleteElasticsearchDomains, deleteS3Bucket } from '../../common/aws/Stacks';

const argumentss: Argument[] = [];
const options: Option[] = [Option.STACK, Option.WAIT];

export class Command extends AwsCommand {
  description: string = 'Destroys an AWS stack';
  alias: string = 'ads';
  public async execute(vital?: boolean, input?: any) {
    await super.executeWithInput(argumentss, options, input, vital, async () => {

      await this.confirm(`Ready to use profile, '${this.input[Names.PROFILE]}' ` +
        `to delete stack, '${this.input[Names.STACK]}' ` +
        `in region, '${this.input[Names.REGION]}'?`);

      console.log(`Collecting data on stack, '${this.input[Names.STACK]}' ` +
        `in region, '${this.input[Names.REGION]}'...`);
      const stackTraversal = await StackTraversal.createTraversal(
        this.input[Names.STACK],
        this.input[Names.REGION],
      );

      // TODO: Add step to delete stuff from s3 bucket

      console.log(`Deleting stacks...`);
      await deleteStacks(stackTraversal);

      console.log(`Deleting Elasticsearch domains...`);
      await deleteElasticsearchDomains(stackTraversal);

      console.log(`Deleting Elastic Container Registries...`);
      await deleteElasticContainerRegistries(stackTraversal);

      console.log(`Deleting NAT gateways...`);
      await deleteNatGateways(stackTraversal);

      console.log(`Deleting network interfaces...`);
      await deleteNetworkInterfaces(stackTraversal);

      console.log(`Deleting security groups...`);
      await deleteSecurityGroups(stackTraversal);

      // This doesnt' work yet
      // console.log(`Deleting s3 buckets...`);
      // await deleteS3Bucket(stackTraversal);

      if (this.input[Names.WAIT] && this.input[Names.WAIT].toLocaleUpperCase() === 'TRUE') {
        await awaitDeletion(this.input[Names.STACK], new AWS.CloudFormation());
      }
    });
  }
}
