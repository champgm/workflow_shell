# Workflow Shell

A set of scripts built into a shell utility to help speed up your workflow.


# Installation

    $ ./install.sh

or

    pip3 install --editable .

# Usage

    ⇒  wsh --help
    Usage: wsh [OPTIONS] COMMAND [ARGS]...

      Workflow Shell, A set of scripts built into a shell utility to help speed
      up your workflow.

    Options:
      --help  Show this message and exit.

    Commands:
      ga        Git - amends recent commit author and timestamp
      gad       Git - adds all files in current directory
      gc        Git - Checks out a base branch and pulls
      gcam      Git - commits all changes
      gcb       Git - checks out a new branch
      gcp       Git - cherry-picks a SHA
      gfi       Git - fixes .gitignore
      ggo       Git - commits all, rebases, amends, force pushes
      glog      Git - displays reflog with nice colors
      gp        Git - pulls and rebases with base branch
      gpfo      Git - force pushes to origin
      gpretty   Git - displays commit history with nice colors
      grb       Git - interactive rebase
      grc       Git - continues a rebase in progress
      gs        Git - display repository status
      gsu       Git - sets target upstream branch
      nrun      NPM - run a command in all sub-projects
      nupdate   NPM - update dependencies in all sub-projects
      nupgrade  NPM - update dependencies in all sub-projects



