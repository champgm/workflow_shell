from ..util import run


command_string = 'grc'
command_help = 'Continues rebasing'


def main(*args, **kwargs):
    run(['git', 'rebase', '--continue'])
