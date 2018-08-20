const Command = require('../models/Command');

class GitPushForceOrigin extends Command {

  static getString() {
    return 'gpfo';
  }

  static getDescription() {
    return 'Force pushes the current branch into a remote branch of the same name.';
  }

  getUsage() {
    return GitPushForceOrigin.getString();
  }

  run(args) {
    const ok = super.run(args);
    if (!ok) {
      return false;
    }


    const branchCommand = 'git rev-parse --abbrev-ref HEAD';
    const branchName = super.executeWithReturn(branchCommand);

    if (branchName === 'master' || branchName === 'develop') {
      console.log('You are on master or develop');
      return false;
    }

    const pushCommand = `git push -f origin ${branchName}`;
    return super.execute(pushCommand);
  }
}

module.exports = GitPushForceOrigin;
