import subprocess
import click
from ..util import get_result
from ..util import run


command_string = 'gp'
command_help = 'Takes one optional argument, the name of the base branch to pull and rebase with'
command_arguments = ['base_branch']
argument_required = False
argument_default = 'develop'


def main(*args, **kwargs):
    # click.echo(str(args))
    # click.echo(str(kwargs))
    base_branch = kwargs.get(command_arguments[0])
    click.echo('base_branch: '+str(base_branch))
    current_branch = get_result(['git', 'rev-parse', '--abbrev-ref', 'HEAD'])