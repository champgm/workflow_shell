from ..util import run


command_string = 'gcp'
command_help = 'Takes one argument, the commit SHA. ' +\
    'Cherry picks that commit'
command_arguments = ['sha']
argument_required = True


def main(*args, **kwargs):
    argument = kwargs.get(command_arguments[0])
    run(['git', 'cherry-pick', argument], True)
