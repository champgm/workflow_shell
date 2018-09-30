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
    context = args[0]
    original_branch = get_result(['git', 'rev-parse', '--abbrev-ref', 'HEAD'])

    # Commit current changes
    context.invoke(all_commands['gcam'])

    # Fetch the base branch
    base_branch = kwargs.get(command_arguments[0])
    click.echo('base_branch: '+str(base_branch))
    run(['git', 'checkout', base_branch])
    run(['git', 'fetch', 'origin'])
    run(['git', 'pull'])

    # Go back to original branch and rebase
    run(['git', 'checkout', original_branch])
    run(['git', 'rebase', base_branch])
