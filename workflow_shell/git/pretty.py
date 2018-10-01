from ..util import run


command_string = 'gpretty'
command_help = 'Displays the git log ' + \
    'with each commit taking only one line'


def main(*args, **kwargs):
    run(['git', 'log', '--pretty=oneline'])
