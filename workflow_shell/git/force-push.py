import click
from ..util import get_result
from ..util import run


command_string = "gpfo"
command_help = "Force pushes the current branch into a remote branch of the same name"
short_help = "Git - force pushes to origin"


def main(*args, **kwargs):
    branch_name = get_result(["git", "rev-parse", "--abbrev-ref", "HEAD"])
    run(["git", "push", "-f", "origin", branch_name])
