import { Command, flags } from '@oclif/command';
import { executeCommand } from '../common/Cli';

export default class GitStatus extends Command {
  static description = 'Amends the most recent commit to ensure that it has the correct author and an updated timestamp';

  static examples = [
    `⇒  wsh ga

    Running: git commit --amend --reset-author --no-edit
    [OCLIF 10cb83a] Integrate questions
     15 files changed, 450 insertions(+), 24 deletions(-)
     create mode 100644 src/commands/gad.ts
     create mode 100644 src/commands/gcb.ts
     create mode 100644 src/commands/gs.ts
     create mode 100644 src/common/Argument.ts
     create mode 100644 src/common/Cli.ts
     create mode 100644 src/common/Questionable.ts
     create mode 100644 src/common/index.ts
     rewrite tslint.json (93%)`,
  ];

  static flags = {};

  static args = [];

  async run() {
    const { args, flags } = this.parse(GitStatus);
    await executeCommand('git', ['commit', '--amend', '--reset-author', '--no-edit']);
  }
}
