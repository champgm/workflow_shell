import subprocess
import click
from ..util import get_result
from ..util import run


command_string = 'gpfo'
command_help = 'Force pushes the current branch into a remote branch of the same name'


def main():
    branch_name = get_result(['git', 'rev-parse', '--abbrev-ref', 'HEAD'])
    if branch_name != 'master' and branch_name != 'develop':
      run(['git', 'push', '-f', 'origin', branch_name])
    else:
      click.echo('Branch is master or develop, will not push')

