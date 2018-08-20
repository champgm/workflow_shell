const Command = require('../models/Command');

class GitPull extends Command {

  static getString() {
    return 'gp';
  }

  static getDescription() {
    return 'Commits any changes, pulls current version of develop, rebases your branch on top';
  }

  getUsage() {
    return `${GitPull.getString()} <optional name of master branch>`;
  }

  run(args) {
    const ok = super.run(args);
    if (!ok) {
      return false;
    }

    const originalBranchName = super.executeWithReturn('git rev-parse --abbrev-ref HEAD');

    const GitCommitAllMessage = require('./GitCommitAllMessage');
    new GitCommitAllMessage().run({ _: ['test commit, please fixup'] });

    const masterBranchParameter = args._.shift();
    const masterBranchName = masterBranchParameter || 'develop';

    super.execute(`git checkout ${masterBranchName}`);
    super.execute('git fetch origin');
    super.execute('git pull');

    super.execute(`git checkout ${originalBranchName}`);

    return super.execute(`git rebase ${masterBranchName}`);
  }
}

module.exports = GitPull;
