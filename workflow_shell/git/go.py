from ..cli import all_commands

command_string = "ggo"
command_help = (
    "Takes one optional argument, number of commits to rebase. "
    + "Commits all staged changes, "
    + "rebases interactively, "
    + "amends the most recent commit, "
    + "then force pushes"
)
short_help = "Git - commits all, rebases, amends, force pushes"
command_arguments = ["number_of_commits"]
argument_required = False
argument_default = 0


def main(*args, **kwargs):
    context = args[0]

    # Commit current changes
    context.invoke(all_commands["gcam"])

    # Interactive rebase
    argument = kwargs.get(command_arguments[0])
    if argument > 0:
        context.invoke(all_commands["grb"], number_of_commits=argument)

    # Amend commit
    context.invoke(all_commands["ga"])

    # Push
    context.invoke(all_commands["gpfo"])
