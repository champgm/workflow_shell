import { Command, flags } from '@oclif/command';
import { executeCommand } from '../common/Cli';

export default class GitStatus extends Command {
  static description = 'Displays the current status of the git repository';

  static examples = [
    `⇒  wsh gs

    Running: git status
    On branch OCLIF
    Your branch is up to date with 'origin/OCLIF'.

    Changes to be committed:
      (use "git reset HEAD <file>..." to unstage)

      modified:   README.md
      modified:   bin/run
      modified:   package-lock.json
      modified:   package.json
      new file:   src/commands/gs.ts
      modified:   src/commands/hello.ts
      new file:   src/common/Cli.ts
      modified:   src/index.ts
      modified:   tsconfig.json
      modified:   tslint.json

    Changes not staged for commit:
      (use "git add <file>..." to update what will be committed)
      (use "git checkout -- <file>..." to discard changes in working directory)

      modified:   src/commands/gs.ts

    Untracked files:
      (use "git add <file>..." to include in what will be committed)

      src/commands/gcb.ts
      src/common/Questionable.ts`,
  ];

  static flags = {};

  static args = [];

  async run() {
    const { args, flags } = this.parse(GitStatus);
    await executeCommand('git', ['status']);
  }
}
