import subprocess
import click
from ..util import get_result
from ..util import run


command_string = 'grb'
command_help = 'Takes one argument, the number of commits to rebase. Rebases interactively with the given number.'
command_arguments = ['number_of_commits']

def main(*args, **kwargs):
    number_of_commits = kwargs.get(command_arguments[0])
    head_number = 'HEAD~%(number_of_commits)s' % locals()
    run(['git','rebase','-i',head_number])
