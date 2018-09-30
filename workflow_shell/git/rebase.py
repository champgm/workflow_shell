import subprocess
import click
from ..util import get_result
from ..util import run


command_string = 'grb'
command_help = 'Takes one argument, the number of commits to rebase. Rebases interactively with the given number.'
command_arguments = ['number_of_commits']

def main(*args, **kwargs):
    argument = kwargs.get(command_arguments[0])
    head_number = 'HEAD~%(argument)s' % locals()
    run(['git','rebase','-i',head_number])
