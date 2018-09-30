import subprocess
import click
from ..util import get_result
from ..util import run


command_string = 'gcam'
command_help = 'Takes one argument, the message. Commits all staged changes with the given message'
command_arguments = ['commit_message']
argument_required = False
argument_default = 'test commit, please fixup'


def main(*args, **kwargs):
    argument = kwargs.get(command_arguments[0])
    run(['git', 'commit', '--all', '--message', argument])
