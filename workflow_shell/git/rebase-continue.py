import subprocess
import click
from ..util import run


command_string = 'grc'
command_help = 'Continues rebasing'


def main():
    run(['git', 'rebase', '--continue'])
