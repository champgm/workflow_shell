
import fs from 'fs';

import AWS from 'aws-sdk';
import { StackResourceSummary, StackSummary } from 'aws-sdk/clients/cloudformation';
import { ResourceType } from 'aws-sdk/clients/configservice';
import { InternetGateway, NatGateway, NetworkInterface, SecurityGroup } from 'aws-sdk/clients/ec2';
import { getAllStackSummaries } from '.';
import { exponentialBackOff } from '..';
import { ImageIdentifierList, ImageIdentifier } from 'aws-sdk/clients/ecr';
import { DomainName, DomainInfoList } from 'aws-sdk/clients/es';
import { DeleteObjectsRequest, ObjectList, ObjectIdentifier } from 'aws-sdk/clients/s3';

export class StackTraversal {
  stackSummaries: StackSummary[] = [];
  networkInterfaces: NetworkInterface[] = [];
  securityGroups: SecurityGroup[] = [];
  internetGateways: InternetGateway[] = [];
  natGateways: NatGateway[] = [];
  vpcGatewayAttachments: StackResourceSummary[] = [];
  elasticContainerRegistries: { repositoryName: string, imageIds: ImageIdentifier[] }[] = [];
  s3Buckets: StackResourceSummary[] = [];
  elasticsearchDomainNames: DomainName[] = [];

  constructor(
    public region: string,
    public cloudformation = new AWS.CloudFormation(),
    public ec2 = new AWS.EC2(),
    public ecr = new AWS.ECR(),
    public es = new AWS.ES(),
    public s3 = new AWS.S3(),
  ) { }

  static async createTraversal(
    stack: string,
    region: string,
    cloudformation = new AWS.CloudFormation(),
    ec2 = new AWS.EC2(),
    ecr = new AWS.ECR(),
    es = new AWS.ES(),
    s3 = new AWS.S3(),
  ) {
    const stackTraversal = new StackTraversal(region, cloudformation, ec2, ecr, es, s3);
    return stackTraversal.traverseStackName(stack);
  }

  async traverseStackName(stackName: string) {
    // console.log(`Getting all stack summaries for stack, '${stackName}'...`);
    const stackSummary = (await getAllStackSummaries()).find(stackSummary => stackSummary.StackName === stackName);
    if (stackSummary) {
      await this.traverseStackSummary(stackSummary);
      return this;
    }
  }

  async traverseStackResourceSummary(summary: StackResourceSummary) {
    const resourceType: ResourceType = summary.ResourceType;
    switch (resourceType) {
      case 'AWS::CloudFormation::Stack':
        await this.recordStack(summary);
        break;
      case 'AWS::EC2::SecurityGroup':
        await this.recordSecurityGroupResource(summary);
        break;
      case 'AWS::EC2::InternetGateway':
        await this.recordInternetGateway(summary);
        break;
      case 'AWS::EC2::NatGateway':
        await this.recordNatGateway(summary);
        break;
      case 'AWS::EC2::VPCGatewayAttachment':
        await this.recordVpcGatewayAttachment(summary);
        break;
      case 'AWS::ECR::Repository':
        await this.recordEcrImages(summary);
        break;
      case 'AWS::Elasticsearch::Domain':
        await this.recordElasticsearchDomains(summary);
        break;
      case 'AWS::S3::Bucket':
        await this.recordS3Bucket(summary);
        break;
      default:
        break;
    }
  }

  async recordStack(summary: StackResourceSummary) {
    // console.log(`Getting all stack summaries...`);
    const stackSummary = (await getAllStackSummaries()).find(stackSummary => stackSummary.StackId === summary.PhysicalResourceId);
    if (!stackSummary) {
      return;
    }
    // console.log(`Traversing stack summary...`);
    await this.traverseStackSummary(stackSummary);
  }

  async traverseStackSummary(summary: StackSummary) {
    this.stackSummaries.push(summary);
    console.log(`Found a stack: ${summary.StackName}`);
    const resourceSummaries = (await this.cloudformation.listStackResources({
      StackName: summary.StackName,
    }).promise()).StackResourceSummaries;
    for (const resourceSummary of resourceSummaries) {
      try {
        await exponentialBackOff(async () => {
          await this.traverseStackResourceSummary(resourceSummary);
        });
      } catch (error) {
        if (error.message.indexOf('does not exist') > -1) {
          // That's fine
        } else {
          throw error;
        }
      }
    }
  }

  async recordSecurityGroupResource(summary: StackResourceSummary) {
    // console.log(`Retrieving security groups...`);
    try {
      const securityGroups = (await this.ec2.describeSecurityGroups({
        GroupIds: [summary.PhysicalResourceId],
      }).promise()).SecurityGroups;
      for (const securityGroup of securityGroups) {
        console.log(`Found a security group: ${securityGroup.GroupName}`);
        this.securityGroups.push(securityGroup);
        await exponentialBackOff(async () => {
          const networkInterfaces = (await this.ec2.describeNetworkInterfaces(
            {
              Filters: [{
                Name: 'group-id',
                Values: [summary.PhysicalResourceId],
              }],
            })
            .promise()).NetworkInterfaces;
          this.networkInterfaces = this.networkInterfaces.concat(networkInterfaces);
        });
      }
    } catch (error) {
      if (error.message.indexOf('does not exist') > -1) {
        // That's fine
      } else {
        throw error;
      }
    }
  }

  async recordInternetGateway(summary: StackResourceSummary) {
    const internetGateways = (await this.ec2.describeInternetGateways({
      InternetGatewayIds: [summary.PhysicalResourceId],
    }).promise()).InternetGateways;
    for (const internetGateway of internetGateways) {
      await exponentialBackOff(async () => {
        console.log(`Found an internet gateway: ${internetGateway.InternetGatewayId}`);
        this.internetGateways.push(internetGateway);
      });
    }
  }

  async recordNatGateway(summary: StackResourceSummary) {
    const natGateways = (await this.ec2.describeNatGateways({
      NatGatewayIds: [summary.PhysicalResourceId],
    }).promise()).NatGateways;
    for (const natGateway of natGateways) {
      await exponentialBackOff(async () => {
        console.log(`Found a NAT gateway: ${natGateway.NatGatewayId}`);
        this.natGateways.push(natGateway);
      });
    }
  }

  async recordVpcGatewayAttachment(summary: StackResourceSummary) {
    console.log(`Found a VPC gateway attachment: ${summary.PhysicalResourceId}`);
    this.vpcGatewayAttachments.push(summary);
  }

  async recordEcrImages(summary: StackResourceSummary) {
    const ecrImageIdentifiers: ImageIdentifierList =
      await exponentialBackOff(async () => {
        return (await this.ecr.listImages({
          repositoryName: summary.PhysicalResourceId,
          maxResults: 1000,
        }).promise()).imageIds;
      });
    console.log(`Found an Elastic Container Registry: ${summary.PhysicalResourceId}`);
    this.elasticContainerRegistries.push({
      repositoryName: summary.PhysicalResourceId,
      imageIds: ecrImageIdentifiers,
    });
  }

  async recordElasticsearchDomains(summary: StackResourceSummary) {
    const elasticsearchDomainNames: DomainName[] =
      await exponentialBackOff(async () => {
        const domainInfoList = (await this.es.listDomainNames().promise()).DomainNames;
        return domainInfoList.reduce(
          (aggregatedDomainNames, domainInfo) => {
            if (domainInfo.DomainName && domainInfo.DomainName === summary.PhysicalResourceId) {
              return aggregatedDomainNames.concat(domainInfo.DomainName);
            }
            return aggregatedDomainNames;
          },
          [],
        );
      });
    for (const elasticsearchDomainName of elasticsearchDomainNames) {
      console.log(`Found an Elasticsearch domain: ${elasticsearchDomainName}`);
      this.elasticsearchDomainNames.push(elasticsearchDomainName);
    }
  }

  async recordS3Bucket(summary: StackResourceSummary) {
    console.log(`Found an S3 bucket: ${summary.PhysicalResourceId}`);
    this.s3Buckets.push(summary);
  }

  writeFileSync(fileName: string) {
    fs.writeFileSync(fileName, JSON.stringify({
      networkInterfaces: this.networkInterfaces,
      securityGroups: this.securityGroups,
    }));
  }

  readFileSync(fileName: string) {
    const data = JSON.parse(fs.readFileSync(fileName).toString());
    this.networkInterfaces = data.networkInterfaces;
    this.securityGroups = data.securityGroups;
  }

  // async collectStackResourceSummaries(StackName: string, NextToken?: string): Promise<StackResourceSummary[]> {
  //   const output = await this.cloudformation.listStackResources({ StackName, NextToken }).promise();
  //   if (output.NextToken) {
  //     return await output.StackResourceSummaries.concat(
  // await this.collectStackResourceSummaries(StackName, output.NextToken));
  //   } else {
  //     return output.StackResourceSummaries;
  //   }
  // }
}
