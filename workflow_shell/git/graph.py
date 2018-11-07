from ..util import run


command_string = "ggraph"
command_help = "Shows the git log in a graph"
short_help = "Git - Shows the graph"


def main(*args, **kwargs):
    run(["git", "commit", "--all", "--message", argument], False)
