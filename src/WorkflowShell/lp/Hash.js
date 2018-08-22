const crypto = require('crypto');
const Command = require('../models/Command');

class Hash extends Command {

  static getString() {
    return 'hash';
  }

  static getDescription() {
    return `${Hash.getString()} <Phone Number>`;
  }

  getUsage() {
    return Hash.getString();
  }

  run(args) {
    const ok = super.run(args);
    if (!ok) {
      return false;
    }

    // console.log(`args: ${JSON.stringify(args)}`);

    const phoneNumber = args._.shift().toString();
    if (!phoneNumber) {
      console.log('You MUST specify the phone number!');
      this.printHelp();
      return false;
    }

    try {
      const userId = crypto.createHash('sha512').update(phoneNumber).digest('hex');
      console.log(`Phone Number: ${phoneNumber}`);
      console.log(`User ID: ${userId}`);
    } catch (error) {
      console.log(`Unable to hash phone number: ${phoneNumber}`);
      console.log(`${error.stack}`);
    }
    return true;
  }
}

module.exports = Hash;
