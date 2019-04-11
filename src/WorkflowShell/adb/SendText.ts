import Command from "../models/Command";

export default class SendText extends Command {

  static getString(): string {
    return "ast";
  }

  static getDescription(): string {
    return "Sends text with ADB.";
  }

  getUsage(): string {
    return `${SendText.getString()} <Message>`;
  }

  async run(args: any) {
    const ok: boolean = await super.run(args);
    if (!ok) {
      return false;
    }

    let textToSend: string = args._.shift();
    if (!textToSend) {
      console.log("You MUST specify the text to send!");
      this.printHelp();
      return false;
    }

    textToSend = textToSend.replace(/\(/g, "\(");
    textToSend = textToSend.replace(/\)/g, "\)");
    textToSend = textToSend.replace(/</g, "\<");
    textToSend = textToSend.replace(/>/g, "\>");
    textToSend = textToSend.replace(/\|/g, "\|");
    textToSend = textToSend.replace(/;/g, "\;");
    textToSend = textToSend.replace(/&/g, "\&");
    textToSend = textToSend.replace(/\*/g, "\*");
    textToSend = textToSend.replace(/~/g, "\~");
    textToSend = textToSend.replace(/"/g, "\\\"");
    textToSend = textToSend.replace(/'/g, "\\'");
    textToSend = textToSend.replace(/ /g, "%s");

    const baseCommand: string = `adb shell input text "${textToSend}"`;
    super.execute(baseCommand);
    return true;
  }
}
