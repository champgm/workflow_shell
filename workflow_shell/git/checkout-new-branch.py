from ..util import run


command_string = "gcb"
command_help = "Takes one argument, the name of the branch. Checks out a new branch"
short_help = "Git - checks out a new branch"
command_arguments = ["branch_name"]
argument_required = True


def main(*args, **kwargs):
    argument = kwargs.get(command_arguments[0])
    run(["git", "checkout", "-b", argument])
