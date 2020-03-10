import AWS from 'aws-sdk';
import { ConfigurationOptions } from 'aws-sdk/lib/config';
import fs from 'fs';
import ini from 'ini';
import os from 'os';

export interface BootstrapValueObject {
  [name: string]: { [name: string]: string };
}

export interface AwsCredentials {
  aws_access_key_id: string;
  aws_secret_access_key: string;
  aws_session_token: string;
  aws_security_token: string;
  last_updated: string;
  expiration: string;
}

// export function getAwsConfigPath() {
//   const home = os.homedir;
//   return `${home}/.aws/config`;
// }

export function getAwsCredentialsPath() {
  const home = os.homedir;
  return `${home}/.aws/credentials`;
}

// export function getAwsConfiguration() {
//   const awsConfigurationPath = getAwsConfigPath();
//   const configuration = ini.parse(fs.readFileSync(awsConfigurationPath, 'utf-8'));
//   return configuration;
// }

export function getAwsCredentials(): { [profileName: string]: AwsCredentials } {
  const awsConfigurationPath = getAwsCredentialsPath();
  const credentials = ini.parse(fs.readFileSync(awsConfigurationPath, 'utf-8'));
  return credentials;
}

export function configureRegion(region: string) {
  AWS.config.update({ region });
}

export async function configureAwsProfile(profileName) {
  const awsCredentials = getAwsCredentials();
  const credentials = awsCredentials[profileName];
  if (!credentials) {
    console.log(`Could not retrieve profile, '${profileName}' from configuration.`);
    console.log(`Known AWS configuration profiles: ${JSON.stringify(Object.keys(awsCredentials), null, 2)}`);
    throw new Error('Invalid profile specified');
  }

  AWS.config.update(new AWS.Config());
  const configurationUpdate: ConfigurationOptions = {};
  configurationUpdate.accessKeyId = credentials.aws_access_key_id;
  configurationUpdate.secretAccessKey = credentials.aws_secret_access_key;
  configurationUpdate.sessionToken = credentials.aws_session_token;
  AWS.config.update(configurationUpdate);
}

export async function getAllStackSummaries() {
  const cloudFormation = new AWS.CloudFormation();
  const stackStatusFilter = [
    'CREATE_IN_PROGRESS', 'CREATE_FAILED', 'CREATE_COMPLETE',
    'ROLLBACK_IN_PROGRESS', 'ROLLBACK_FAILED', 'ROLLBACK_COMPLETE',
    'DELETE_IN_PROGRESS', 'DELETE_FAILED', /*"DELETE_COMPLETE", */
    'UPDATE_IN_PROGRESS', 'UPDATE_COMPLETE_CLEANUP_IN_PROGRESS', 'UPDATE_COMPLETE',
    'UPDATE_ROLLBACK_IN_PROGRESS', 'UPDATE_ROLLBACK_FAILED',
    'UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS', 'UPDATE_ROLLBACK_COMPLETE',
    'REVIEW_IN_PROGRESS',
  ];
  let output = await cloudFormation.listStacks({ StackStatusFilter: stackStatusFilter }).promise();
  let allStackSummaries = output.StackSummaries;
  while (output.NextToken) {
    output = await cloudFormation.listStacks({
      NextToken: output.NextToken,
      StackStatusFilter: stackStatusFilter,
    }).promise();
    allStackSummaries = allStackSummaries.concat(output.StackSummaries);
  }
  return allStackSummaries;
}

export async function getAllLambdas(
  lambda: AWS.Lambda,
  nextToken?: string,
) {
  if (!nextToken) {
    console.log(`Retrieving functions...`);
  } else {
    console.log(`Retrieving functions with continuation token '${nextToken}'...`);
  }
  let functions: AWS.Lambda.FunctionConfiguration[] = [];
  const result = await lambda.listFunctions({
    Marker: nextToken,
    MaxItems: 500,
  }).promise();
  if (result.Functions) {
    console.log(`Retrieved ${result.Functions.length} functions`);
    functions = functions.concat(result.Functions);
  }
  if (result.NextMarker) {
    const nextParameters = await getAllLambdas(lambda, result.NextMarker);
    functions = functions.concat(nextParameters);
  }
  return functions;
}

export async function createStringParameter(
  parameters: BootstrapValueObject,
  stage: string,
  overwrite: boolean,
  ssm: AWS.SSM,
  type: string,
) {
  for (const parameterName of Object.keys(parameters)) {
    const name = `/${stage}${parameterName}`;
    let paramString = parameters[parameterName].default;
    if (parameters[parameterName][stage]) {
      paramString = parameters[parameterName][stage];
    }
    const getParameters = { Name: name };
    const putParameters = { Name: name, Value: paramString, Type: type, Overwrite: true };

    try {
      await ssm.getParameter(getParameters).promise();
      if (overwrite) {
        console.log(`Overwriting string parameter with name, '${name}'...`);
        await ssm.putParameter(putParameters).promise();
      } else {
        console.log(`Parameter with name, '${name}' already exists.`);
      }
    } catch (error) {
      if (error.code === 'ParameterNotFound') {
        console.log(`Creating string parameter with name, '${name}'...`);
        await ssm.putParameter(putParameters).promise();
      } else {
        throw error;
      }
    }
  }
}

export async function getParameter(ssm: AWS.SSM, name: string) {
  try {
    return (await ssm.getParameter({ Name: name }).promise()).Parameter.Value;
  } catch (error) {
    console.error(`Could not retrieve parameter with name: ${name}`);
    throw error;
  }
}

export async function getSecretString(name: string, ssm: AWS.SecretsManager): Promise<string> {
  const getSecret: AWS.SecretsManager.GetSecretValueRequest = { SecretId: name };
  try {
    const response = await ssm.getSecretValue(getSecret).promise();
    return response.SecretString;
  } catch (error) {
    console.log(`Unexpected error while retrieving secret: ${JSON.stringify(error, null, 2)}`);
    throw error;
  }
}
