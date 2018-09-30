from ..util import run
from ..cli import all_commands

command_string = 'gfi'
command_help = 'Attempts to fix gitignore not working properly'


def main(*args, **kwargs):
    context = args[0]

    # Commit before
    context.invoke(
        all_commands['gcam'],
        commit_message='"Before Fixing gitignore"'
    )

    # Remove cached, add everything back
    # (except what's been defined in gitignore)
    run(['git', 'rm', '-r', '--cached', '.'])
    run(['git', 'add', '.'])

    # Commit after
    context.invoke(
        all_commands['gcam'],
        commit_message='"Fixed gitignore"'
    )
