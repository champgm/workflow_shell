from ..util import run
import pyperclip
import uuid

command_string = "cbu"
command_help = "Puts a timestamp onto the clipboard"
short_help = "Clipboard - Puts a timestamp onto the clipboard"


def main(*args, **kwargs):
    pyperclip.copy(str(uuid.uuid4()))
