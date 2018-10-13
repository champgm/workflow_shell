import sys
import click
from ..util import run
from ..cli import all_commands


command_string = "grb"
command_help = "Takes one argument, the number of commits to rebase. " + "Rebases interactively with the given number."
command_arguments = ["number_of_commits"]


def main(*args, **kwargs):
    context = args[0]
    argument = kwargs.get(command_arguments[0])
    head_number = "HEAD~%(argument)s" % locals()
    try:
        run(["git", "rebase", "-i", head_number], True, True)
    except Exception:
        # Show status to let user know what current state is
        context.invoke(all_commands["gs"])
        click.echo("Rebase encountered conflicts")
        sys.exit(1)
