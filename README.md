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
      ga       Amends the most recent commit to ensure that it has the correct...
      gad      Stages all files and folders in the current directory
      gcam     Takes one argument, the message.
      gcb      Takes one argument, the name of the branch.
      gfi      Attempts to fix gitignore not working properly
      ggo      Takes one optional argument, number of commits to rebase.
      glog     Displays the git log with each commit on one line in nice colors
      gp       Takes one optional argument, the name of the base branch to pull...
      gpfo     Force pushes the current branch into a remote branch of the same...
      gpretty  Displays the git log with each commit taking only one line
      grb      Takes one argument, the number of commits to rebase.
      grc      Continues rebasing
      gs       Displays the current status of the git repository
      gsu      Sets the target upstream branch



