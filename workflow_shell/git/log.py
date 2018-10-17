from ..util import run


command_string = "glog"
command_help = "Displays the git log with each commit on one line in nice colors"
short_help = "Git - displays reflog with nice colors"


def main(*args, **kwargs):
    pretty_format = "--pretty=format:'%Cred %H %Cgreen %gD %Cblue %s %C(Yellow) %aN'"
    run(["git", "reflog", pretty_format])
