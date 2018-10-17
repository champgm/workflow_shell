from ..util import run


command_string = "gs"
command_help = "Displays the current status of the git repository"
short_help = "Git - display repository status"


def main(*args, **kwargs):
    run(["git", "status"])
