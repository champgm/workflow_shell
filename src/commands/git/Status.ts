#!/usr/bin/env node

import { Argument } from '../../common/interface/Argument';
import SuperCommand from '../../common/SuperCommand';
import { execute } from '../../common';
import { executeCommand } from '../../common/Cli';

const requiredArguments: Argument[] = [];

export class Command extends SuperCommand {
  alias: string = 'gs';
  public async execute(input?: any) {
    await super.execute(requiredArguments, input);

    await executeCommand('git', [
      'status',
    ]);// , { cwd: baseDirectory });
  }
}

// This is the part that actually executes
if (require.main === module) {
  execute(new Command());
}
