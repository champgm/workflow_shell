from ..util import run


command_string = "gad"
command_help = "Stages all files and folders in the current directory"
short_help = "Git - adds all files in current directory"


def main(*args, **kwargs):
    run(["git", "add", "."])
