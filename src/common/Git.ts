import { getCommandOutput } from './Cli';

export async function getCurrentBranchName() {
  return getCommandOutput('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
}
