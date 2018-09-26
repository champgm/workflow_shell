const Command = require('../models/Command');

class GitAddDot extends Command {

  static getString() {
    return 'grc';
  }

  static getDescription() {
    return 'Continues rebasing';
  }

  getUsage() {
    return GitAddDot.getString();
  }

  run(args) {
    const ok = super.run(args);
    if (!ok) {
      return false;
    }

    const baseCommand = 'git rebase --continue';
    return super.execute(baseCommand);
  }
}

module.exports = GitAddDot;
