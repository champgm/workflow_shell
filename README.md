workflow_shell
==============

Workflow Shell

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/workflow_shell.svg)](https://npmjs.org/package/workflow_shell)
[![Downloads/week](https://img.shields.io/npm/dw/workflow_shell.svg)](https://npmjs.org/package/workflow_shell)
[![License](https://img.shields.io/npm/l/workflow_shell.svg)](https://github.com/champgm/workflow_shell/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g workflow-shell
$ wsh COMMAND
running command...
$ wsh (-v|--version|version)
workflow-shell/0.0.1 darwin-x64 node-v10.15.3
$ wsh --help [COMMAND]
USAGE
  $ wsh COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`wsh gcb [BRANCH]`](#wsh-gcb-branch)
* [`wsh gs`](#wsh-gs)
* [`wsh hello [FILE]`](#wsh-hello-file)
* [`wsh help [COMMAND]`](#wsh-help-command)

## `wsh gcb [BRANCH]`

describe the command here

```
USAGE
  $ wsh gcb [BRANCH]

EXAMPLE
  ⇒  wsh gcb wahtever

  Running: git checkout -b wahtever
  Switched to a new branch 'wahtever'
```

_See code: [src/commands/gcb.ts](https://github.com/champgm/workflow_shell/blob/v0.0.1/src/commands/gcb.ts)_

## `wsh gs`

Displays the current status of the git repository

```
USAGE
  $ wsh gs

EXAMPLE
  ⇒  wsh gs

       Running: git status
       On branch OCLIF
       Your branch is up to date with 'origin/OCLIF'.

       Changes to be committed:
         (use "git reset HEAD <file>..." to unstage)

         modified:   README.md
         modified:   bin/run
         modified:   package-lock.json
         modified:   package.json
         new file:   src/commands/gs.ts
         modified:   src/commands/hello.ts
         new file:   src/common/Cli.ts
         modified:   src/index.ts
         modified:   tsconfig.json
         modified:   tslint.json

       Changes not staged for commit:
         (use "git add <file>..." to update what will be committed)
         (use "git checkout -- <file>..." to discard changes in working directory)

         modified:   src/commands/gs.ts

       Untracked files:
         (use "git add <file>..." to include in what will be committed)

         src/commands/gcb.ts
         src/common/Questionable.ts
```

_See code: [src/commands/gs.ts](https://github.com/champgm/workflow_shell/blob/v0.0.1/src/commands/gs.ts)_

## `wsh hello [FILE]`

describe the command here

```
USAGE
  $ wsh hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ wsh hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/champgm/workflow_shell/blob/v0.0.1/src/commands/hello.ts)_

## `wsh help [COMMAND]`

display help for wsh

```
USAGE
  $ wsh help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_
<!-- commandsstop -->
