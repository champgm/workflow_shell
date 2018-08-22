const Command = require('../models/Command');

class GitCheckout extends Command {

  static getString() {
    return 'gc';
  }

  static getDescription() {
    return 'Checks out a branch';
  }

  getUsage() {
    return `${GitCheckout.getString()} <Optional Branch Name>`;
  }

  run(args) {
    const ok = super.run(args);
    if (!ok) {
      return false;
    }

    const masterBranchName = 'develop';
    const branchName = args._.shift() || masterBranchName;
    super.execute(`git checkout ${branchName}`);

    if (branchName === masterBranchName) {
      super.execute('git fetch origin');
      super.execute('git pull');
    }

    return true;
  }
}

module.exports = GitCheckout;
