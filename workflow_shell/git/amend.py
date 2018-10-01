from ..util import run


command_string = 'ga'
command_help = 'Amends the most recent commit to ensure that it has the ' +\
    'correct author and an updated timestamp'


def main(*args, **kwargs):
    run(['git', 'commit', '--amend', '--reset-author', '--no-edit'])
