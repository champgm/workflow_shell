from ..util import run


command_string = "grc"
command_help = "Continues rebasing"
short_help = "Git - continues a rebase in progress"


def main(*args, **kwargs):
    run(["git", "rebase", "--continue"])
