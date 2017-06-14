const Command = require('../models/Command');

class ArpListen extends Command {

  static getString() {
    return 'gad';
  }

  static getDescription() {
    return 'Stages all files and folders in the current directory.';
  }

  getUsage() {
    return GitAddDot.getString();
  }

  run(args) {
    const ok = super.run(args);
    if (!ok) {
      return false;
    }

    const baseCommand = 'git add .';
    return super.execute(baseCommand);
  }
}

module.exports = GitAddDot;
