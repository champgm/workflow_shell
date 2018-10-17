from ..util import run


command_string = "gpretty"
command_help = "Displays the git log with each commit taking only one line"
short_help = "Git - displays commit history with nice colors"


def main(*args, **kwargs):
    run(["git", "log", "--pretty=oneline"])
