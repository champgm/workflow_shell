import AWS from 'aws-sdk';

import { exponentialBackOff } from '..';
import { StackTraversal } from './StackTraversal';
import { ObjectList, ObjectIdentifier, DeleteObjectsRequest } from 'aws-sdk/clients/s3';

export async function deleteNetworkInterfaces(stackTraversal: StackTraversal) {
  if (!stackTraversal) {
    return;
  }
  const toDetach = stackTraversal.networkInterfaces
    .filter(networkInterface => networkInterface.Attachment && networkInterface.Attachment.Status !== 'detached');
  const detached = [];

  for (const networkInterface of toDetach) {
    try {
      console.log(`Detaching network interface, '${networkInterface.NetworkInterfaceId}'...`);
      await exponentialBackOff(async () => {
        await stackTraversal.ec2.detachNetworkInterface({
          AttachmentId: networkInterface.Attachment.AttachmentId,
          Force: true,
        }).promise();
      });
      detached.push(networkInterface);
    } catch (error) {
      if (
        error.message.indexOf('cannot be detached') > -1 ||
        error.message.indexOf('does not exist') > -1 ||
        error.message.indexOf('do not have permission to access') > -1 ||
        error.message.indexOf('not allowed to manage') > -1 ||
        error.message.indexOf('subnet you own') > -1) {
        // That's fine
      } else {
        throw error;
      }
    }
  }

  // wait for interfaces to be detached
  let availableCount = 0;
  while (availableCount < detached.length) {
    console.log(`Available network interfaces: ${availableCount}`);
    const result = await exponentialBackOff(async () => {
      return await stackTraversal.ec2.describeNetworkInterfaces({
        NetworkInterfaceIds: detached.map(networkInterface => networkInterface.NetworkInterfaceId),
      }).promise();
    });
    availableCount = result.NetworkInterfaces.filter(networkInterface => networkInterface.Status === 'available').length;
  }

  for (const networkInterface of stackTraversal.networkInterfaces) {
    try {
      await exponentialBackOff(async () => {
        console.log(`Deleting network interface, '${networkInterface.NetworkInterfaceId}'...`);
        await stackTraversal.ec2.deleteNetworkInterface({
          NetworkInterfaceId: networkInterface.NetworkInterfaceId,
        }).promise();
      });
    } catch (error) {
      if (error.message.indexOf('is currently in use') > -1 ||
        error.message.indexOf('does not exist') > -1) {
        // That's fine
      } else {
        throw error;
      }
    }
  }
}

export async function deleteSecurityGroups(stackTraversal: StackTraversal) {
  if (!stackTraversal) {
    return;
  }
  for (const securityGroup of stackTraversal.securityGroups) {
    const dependentGroups = (await
      stackTraversal.ec2.describeSecurityGroups({
        Filters: [{
          Name: 'ip-permission.group-id',
          Values: [securityGroup.GroupId],
        }],
      }).promise()
    ).SecurityGroups;
    for (const dependentGroup of dependentGroups) {
      console.log(`Group, '${dependentGroup.GroupId}' depends on group, '${securityGroup.GroupId}'`);
      // the ip permissions with user id group pairs associated with the given security group
      const ipPermissionsToRevoke = dependentGroup.IpPermissions
        .filter(permissions => permissions.UserIdGroupPairs
          .some(userGroup => userGroup.GroupId === securityGroup.GroupId))
        .map((it) => {
          return {
            FromPort: it.FromPort,
            IpProtocol: it.IpProtocol,
            ToPort: it.ToPort,
            UserIdGroupPairs: it.UserIdGroupPairs.filter(uigp => uigp.GroupId === securityGroup.GroupId),
          };
        });
      // revoke the access to the current security group from the dependent

      await exponentialBackOff(async () => {
        console.log(`Revoking ingress for security group, '${securityGroup.GroupId}'...`);
        await stackTraversal.ec2.revokeSecurityGroupIngress({
          GroupId: dependentGroup.GroupId,
          IpPermissions: ipPermissionsToRevoke,
        }).promise();
      });
    }

    try {
      await exponentialBackOff(async () => {
        console.log(`Deleting security group, '${securityGroup.GroupId}'...`);
        await stackTraversal.ec2.deleteSecurityGroup({ GroupId: securityGroup.GroupId }).promise();
      });
    } catch (error) {
      if (error.message.indexOf('has a dependent object') > -1 ||
        error.message.indexOf('does not exist') > -1) {
        // That's fine
      } else {
        throw error;
      }
    }
  }
}

export async function deleteStacks(stackTraversal: StackTraversal) {
  if (!stackTraversal) {
    return;
  }
  for (const stackSummary of stackTraversal.stackSummaries) {
    try {
      await exponentialBackOff(async () => {
        console.log(`Deleting stack, '${stackSummary.StackId}'...`);
        await stackTraversal.cloudformation.deleteStack({ StackName: stackSummary.StackId }).promise();
      });
    } catch (error) {
      throw error;
    }
  }
}

export async function deleteNatGateways(stackTraversal: StackTraversal) {
  if (!stackTraversal) {
    return;
  }
  for (const natGateway of stackTraversal.natGateways) {
    await exponentialBackOff(async () => {
      console.log(`Deleting NAT gateway, '${natGateway.NatGatewayId}'...`);
      try {
        await stackTraversal.ec2.deleteNatGateway({ NatGatewayId: natGateway.NatGatewayId }).promise();
      } catch (error) {
        if (error.message.indexOf('was not found') > -1) {
          // That's fine
        } else {
          throw error;
        }
      }
    });
  }
}

export async function deleteElasticContainerRegistries(stackTraversal: StackTraversal) {
  if (!stackTraversal) {
    return;
  }
  for (const elasticContainerRegistry of stackTraversal.elasticContainerRegistries) {
    await exponentialBackOff(async () => {
      console.log(`Deleting ECR, '${elasticContainerRegistry.repositoryName}'...`);
      try {
        if (elasticContainerRegistry.imageIds && elasticContainerRegistry.imageIds.length > 0) {
          await stackTraversal.ecr.batchDeleteImage(elasticContainerRegistry).promise();
        }
      } catch (error) {
        if (error.message.indexOf('was not found') > -1) {
          // That's fine
        } else {
          throw error;
        }
      }
    });
  }
}

export async function deleteS3Bucket(stackTraversal: StackTraversal) {
  if (!stackTraversal) {
    return;
  }
  for (const s3Bucket of stackTraversal.s3Buckets) {
    await exponentialBackOff(async () => {
      console.log(`Deleting S3 bucket, '${s3Bucket.PhysicalResourceId}'...`);
      try {
        const objectList = (await stackTraversal.s3
          .listObjects({ Bucket: s3Bucket.PhysicalResourceId })
          .promise());
        console.log(`objectList${JSON.stringify(objectList, null, 2)}`);
        const objects: ObjectList = (await stackTraversal.s3
          .listObjects({ Bucket: s3Bucket.PhysicalResourceId })
          .promise())
          .Contents;
        console.log(`objects${JSON.stringify(objects, null, 2)}`);
        const objectIdentifiers: ObjectIdentifier[] = objects.map(
          (object) => {
            return { Key: object.Key };
          });
        for (const objectIdentifier of objectIdentifiers) {
          console.log(`Deleting object from bucket, '${objectIdentifiers}'...`);
          await stackTraversal.s3.deleteObjects({
            Bucket: s3Bucket.PhysicalResourceId,
            Delete: {
              Objects: [objectIdentifier],
            },
          }).promise();
        }
        await stackTraversal.s3.deleteBucket({ Bucket: s3Bucket.PhysicalResourceId }).promise();
      } catch (error) {
        if (error.message.indexOf('does not exist') > -1) {
          // That's fine
        } else {
          throw error;
        }
      }
    });
  }
}

export async function deleteElasticsearchDomains(stackTraversal: StackTraversal) {
  if (!stackTraversal) {
    return;
  }
  for (const domainName of stackTraversal.elasticsearchDomainNames) {
    await exponentialBackOff(async () => {
      console.log(`Deleting Elasticsearch domain, '${domainName}'...`);
      try {
        await stackTraversal.es.deleteElasticsearchDomain({ DomainName: domainName }).promise();
      } catch (error) {
        if (error.message.indexOf('was not found') > -1) {
          // That's fine
        } else {
          throw error;
        }
      }
    });
  }
}

export async function awaitDeletion(stackName: string, cloudFormation: AWS.CloudFormation) {
  console.log(`\nAwaiting destruction of stack, '${stackName}'...`);
  const parameters = { StackName: stackName };
  try {
    const response = await cloudFormation.waitFor('stackDeleteComplete', parameters).promise();
    console.log(`Response: ${JSON.stringify(response, null, 2)}`);
  } catch (error) {
    if (error.message.indexOf('Resource is not in the state stackDeleteComplete') > -1) {
      console.log(`Stack still not deleted after two minutes, trying again.`);
      await awaitDeletion(stackName, cloudFormation);
    } else {
      throw error;
    }
  }
}
