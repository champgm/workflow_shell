import subprocess
import click
from ..util import get_result
from ..util import run
from ..cli import all_commands

command_string = 'gp'
command_help = 'Takes one optional argument, the name of the base branch to pull and rebase with'
command_arguments = ['base_branch']
argument_required = False
argument_default = 'develop'


def main(*args, **kwargs):
    # click.echo(str(args))
    # click.echo(str(kwargs))
    context = args[0]
    context.invoke(all_commands['gcam'])
    base_branch = kwargs.get(command_arguments[0])
    click.echo('base_branch: '+str(base_branch))
    current_branch = get_result(['git', 'rev-parse', '--abbrev-ref', 'HEAD'])
