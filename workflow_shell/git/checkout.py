from ..util import run
from ..cli import all_commands

command_string = 'gc'
command_help = 'Takes one optional argument, ' +\
    'the name of the base branch to check out and pull'
command_arguments = ['base_branch']
argument_required = False
argument_default = 'develop'


def main(*args, **kwargs):
    context = args[0]

    # Commit current changes
    context.invoke(all_commands['gcam'])

    # Fetch the base branch
    base_branch = kwargs.get(command_arguments[0])
    run(['git', 'checkout', base_branch])
    run(['git', 'fetch', 'origin'])
    run(['git', 'pull'])
