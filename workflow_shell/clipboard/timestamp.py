from ..util import run
import pyperclip
import datetime
import time

command_string = "cbt"
command_help = "Puts a timestamp onto the clipboard"
short_help = "Clipboard - Puts a timestamp onto the clipboard"


def main(*args, **kwargs):
    timestamp = time.time()
    formatted = datetime.datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d %H:%M")
    pyperclip.copy(formatted + " ")
