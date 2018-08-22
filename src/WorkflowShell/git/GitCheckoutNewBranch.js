const Command = require('../models/Command');

class GitCheckout extends Command {

  static getString() {
    return 'gcb';
  }

  static getDescription() {
    return 'Checks out a new branch';
  }

  getUsage() {
    return `${GitCheckout.getString()} <Branch Name>`;
  }

  run(args) {
    const ok = super.run(args);
    if (!ok) {
      return false;
    }

    const branchName = args._.shift();
    if (!branchName) {
      console.log('You MUST specify the branch name!');
      this.printHelp();
      return false;
    }

    return super.execute(`git checkout -b ${branchName}`);
  }
}

module.exports = GitCheckout;
