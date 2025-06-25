# Workflow Shell (wsh)

Workflow Shell (wsh) is a TypeScript-powered command-line toolkit that streamlines many day-to-day developer chores.  
Instead of memorising long, repetitive shell commands, invoke concise aliases such as `gcam`, `gsb`, or `ads` and let *wsh* do the heavy lifting for you.

---

## ✨ Features

* **Single binary** – one entry-point (`wsh`) with dozens of sub-commands written in TypeScript.
* **Git helpers** – speed up common Git flows: interactive rebases, force-pushes, pretty logs, syncing a branch with its base, and more.
* **AWS utilities** – list resources inside a CloudFormation stack or destroy a stack in one go.
* **Clipboard goodies** – quickly copy a UUID or a Unix timestamp to your clipboard.
* **Project maintenance** – bump service versions, decompress archives, poll endpoints, and other misc tools.
* **Interactive** – unanswered options are asked for using [inquirer](https://github.com/SBoudrias/Inquirer.js), with an override `--force/-F` flag for non-interactive runs.
* **Extensible** – add your own command by dropping a new class under `src/commands/**` that extends `SuperCommand`.

---

## 📦 Installation

```bash
# 1. Clone and install dependencies
$ git clone https://github.com/champgm/workflow_shell.git && cd workflow_shell
$ npm install

# 2. Build the TypeScript sources
$ npm run build

# 3. (optional) Link globally so that `wsh` is available everywhere
$ npm link   # requires npm ≥5
```

> **Node 12+** is recommended – the project is compiled down to the version targeted in the local `tsconfig.json`.

To keep the generated files tidy you can run `npm run clean`.

---

## 🚀 Usage

After installation simply run:

```bash
wsh <command> [args] [options]
```

If the command is omitted or unknown, *wsh* prints a helpful list of all available aliases and their short descriptions.

### CLI conventions

* **Arguments** are positional – they appear right after the alias, e.g. `wsh gcp <sha>`.
* **Options** are key–value pairs in the form `-<shortName> <value>`, e.g. `wsh ads -s MyStack -r us-east-1`.
* `-F/--force` skips any confirmation prompts.

### Command cheat-sheet

Below is an at-a-glance table of the built-in commands.  The list is generated from the current codebase – inspect the sources under `src/commands/**` for the authoritative behaviour.

| Alias | Category | Description |
|-------|----------|-------------|
| **Git** |||
| `gad` | git | Stages all files and folders in the current directory |
| `ga`  | git | Amends the most recent commit to ensure that it has the correct author and an updated timestamp |
| `gcb` | git | Takes one argument, the name of the branch. Checks out a new branch. |
| `gcam`| git | Commits **all** modifications with the supplied commit message |
| `gcp` | git | Takes one argument, the commit SHA. Cherry-picks that commit. |
| `gfi` | git | Attempts to fix `.gitignore` not working properly |
| `gp`  | git | Pulls the base branch (defaults to `master`) and rebases the current branch on top |
| `gpfo`| git | Force-pushes the current branch to its upstream counterpart |
| `glog`| git | Displays the git log with each commit on one line in nice colours |
| `gpretty` | git | Displays the git log with one line for each commit |
| `grb` | git | Interactive rebase of the last *n* commits *(argument required)* |
| `grc` | git | Continues an in-progress rebase |
| `gs`  | git | Shorthand for `git status` |
| `gsb` | git | Rebases your branch on top of its base branch *(defaults to `master`)* |
| `gsu` | git | Sets the target upstream branch |
| `ggo` | git | Convenience macro: commit all, optional rebase, amend, then force-push |
| **AWS** |||
| `ads` | aws | Destroys a CloudFormation stack |
| `aws-print-stack-resources` | aws | Prints AWS stack resources |
| **Clipboard** |||
| `cbu` | clipboard | Copies a freshly generated UUID to the clipboard |
| `cbt` | clipboard | Copies the current Unix timestamp to the clipboard |
| **Misc** |||
| `bump-event-bus` | misc | Bumps versions |
| `bump-postgres` | misc | Bumps Postgres versions |
| `bump-project`  | misc | Bumps project versions |
| `bump-search`   | misc | Bumps search versions |
| `clay-import`   | misc | Attempts to import pages into a Clay instance |
| `unzip`         | misc | Decompresses a `.zip` archive |
| `poll`          | misc | Poll an endpoint |
| `temp`          | misc | Temporary / experimental command |

> Many commands accept the common AWS options `-p <profile>`, `-r <region>`, and `-s <stack>`.

---

## 🛠️ Development

1. **Watch mode** – run `npm run watch` to compile TypeScript on file changes.
2. **Linting** – `npm run lint` automatically fixes lint issues based on the Airbnb TSLint preset.
3. **Adding a command**
   1. Create a new `.ts` file under `src/commands/<category>/` that exports a `Command` class extending `SuperCommand`.
   2. Implement `alias`, `description`, and `execute()`.
4. **Testing** – Jasmine is configured (`spec/support/jasmine.json`) but no specs ship with the repo. Add `*.spec.ts` under `spec/` and wire a `npm test` script as desired.

---

## 🤝 Contributing

Pull requests are welcome!  Please file an issue first if you intend to introduce a bigger change so that we can discuss the approach.

Make sure that your code follows the existing style, passes linting, and compiles.

---

## 📄 License

This project is licensed under the ISC License – see the [LICENSE](LICENSE) file for details. 
