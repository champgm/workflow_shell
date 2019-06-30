from ..util import run
import pyperclip
import datetime
import time

command_string = "cbp"
command_help = "Puts a parameter URL on the clipboard"
short_help = "Clipboard - Puts a parameter URL on the clipboard"
command_arguments = ["stage", "region", "parameter_name"]
argument_required = False
argument_default = pyperclip.paste()


def main(*args, **kwargs):
    stage = kwargs.get(command_arguments[0])
    region = kwargs.get(command_arguments[1])
    parameter_name = kwargs.get(command_arguments[2])
    parameter_name = "/" + stage + parameter_name
    parameter_name = parameter_name.replace("/", "%252F")
    url = (
        "https://console.aws.amazon.com/systems-manager/parameters/" + parameter_name + "/description?region=" + region
    )
    pyperclip.copy(url + "")
