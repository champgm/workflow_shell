from ..util import run


command_string = 'gad'
command_help = 'Stages all files and folders in the current directory'


def main(*args, **kwargs):
    run(['git', 'add', '.'])
