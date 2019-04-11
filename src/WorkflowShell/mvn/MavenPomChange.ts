import Command from "../models/Command";

export default class MavenPomChange extends Command {

  static getString(): string {
    return "mpomchange";
  }

  static getDescription(): string {
    return "Changes the version of the module in the current directory and all submodules to the input version.";
  }

  getUsage(): string {
    return `${MavenPomChange.getString()} <New Version>`;
  }

  async run(args: any) {
    const ok: boolean = await super.run(args);
    if (!ok) {
      return false;
    }

    const newVersion = args._.shift();
    if (!newVersion) {
      console.log("You MUST specify the new version!");
      console.log("");
      console.log("Current version is...");
      super.execute("mvn help:evaluate -Dexpression=project.version|grep -Ev '(^\\[|Download\\w+:)'");
      this.printHelp();
      return false;
    }

    const baseCommand = `mvn versions:set -DnewVersion=${newVersion} -Djava.awt.headless=true -DgenerateBackupPoms=false`;
    super.execute(baseCommand);
    return true;
  }
}
