import { exponentialBackOff } from '..';
import { StackTraversal } from './StackTraversal';

export async function deleteNetworkInterfaces(traverseStack: StackTraversal) {
  if (!traverseStack) {
    return;
  }
  const toDetach = traverseStack.networkInterfaces
    .filter(networkInterface => networkInterface.Attachment && networkInterface.Attachment.Status !== 'detached');
  const detached = [];

  for (const networkInterface of toDetach) {
    try {
      console.log(`Detaching network interface, '${networkInterface.NetworkInterfaceId}'...`);
      await exponentialBackOff(async () => {
        await traverseStack.ec2.detachNetworkInterface({
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
      return await traverseStack.ec2.describeNetworkInterfaces({
        NetworkInterfaceIds: detached.map(networkInterface => networkInterface.NetworkInterfaceId),
      }).promise();
    });
    availableCount = result.NetworkInterfaces.filter(networkInterface => networkInterface.Status === 'available').length;
  }

  for (const networkInterface of traverseStack.networkInterfaces) {
    try {
      await exponentialBackOff(async () => {
        console.log(`Deleting network interface, '${networkInterface.NetworkInterfaceId}'...`);
        await traverseStack.ec2.deleteNetworkInterface({
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

export async function deleteSecurityGroups(traverseStack: StackTraversal) {
  if (!traverseStack) {
    return;
  }
  for (const securityGroup of traverseStack.securityGroups) {
    const dependentGroups = (await
      traverseStack.ec2.describeSecurityGroups({
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
        await traverseStack.ec2.revokeSecurityGroupIngress({
          GroupId: dependentGroup.GroupId,
          IpPermissions: ipPermissionsToRevoke,
        }).promise();
      });
    }

    try {
      await exponentialBackOff(async () => {
        console.log(`Deleting security group, '${securityGroup.GroupId}'...`);
        await traverseStack.ec2.deleteSecurityGroup({ GroupId: securityGroup.GroupId }).promise();
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

export async function deleteStacks(traverseStack: StackTraversal) {
  if (!traverseStack) {
    return;
  }
  for (const stackSummary of traverseStack.stackSummaries) {
    try {
      await exponentialBackOff(async () => {
        console.log(`Deleting stack, '${stackSummary.StackId}'...`);
        await traverseStack.cloudformation.deleteStack({ StackName: stackSummary.StackId }).promise();
      });
    } catch (error) {
      throw error;
    }
  }
}

export async function deleteNatGateways(traverseStack: StackTraversal) {
  if (!traverseStack) {
    return;
  }
  for (const natGateway of traverseStack.natGateways) {
    await exponentialBackOff(async () => {
      console.log(`Deleting NAT gateway, '${natGateway.NatGatewayId}'...`);
      try {
        await traverseStack.ec2.deleteNatGateway({ NatGatewayId: natGateway.NatGatewayId }).promise();
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
