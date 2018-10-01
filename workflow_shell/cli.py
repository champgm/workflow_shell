import os
import click
import importlib
from os import walk
from glob import glob
from .util import print_dir
from click import Argument


@click.group()
def wsh():
    """Workflow Shell, A set of scripts built into a shell utility to help speed up your workflow."""


# A dictionary so commands can retrieve and run other commands
all_commands = {}


def commandize(module):
    if hasattr(module, 'command_string'):
        @wsh.command(name=module.command_string)
        @click.pass_context
        def wrapper(*args, **kwargs):
            return module.main(*args, **kwargs)
        wrapper.help = module.command_help
        if hasattr(module, 'command_arguments'):
            for command_argument in module.command_arguments:
                if hasattr(module, 'argument_required') and not module.argument_required:
                    argument = Argument(
                        [command_argument],
                        module.argument_required,
                        **{'default': module.argument_default}
                    )
                    wrapper.params.append(argument)
                else:
                    argument = Argument([command_argument])
                    wrapper.params.append(argument)
        all_commands[module.command_string] = wrapper
        return wrapper
    return None


# create a list of all subdirectories
scriptDirectory = os.path.dirname(os.path.realpath(__file__))
directory_glob = scriptDirectory+"/*/"
subfolders = glob(directory_glob)
blacklist = ['__pycache__']


def blacklisted(path):
    for banned in blacklist:
        if banned in path:
            return True
    return False


# Filter out any unwanted subfolders
subfolder_paths = list(filter(lambda path: not blacklisted(path), subfolders))


def last_folder(path: str):
    split = path.rsplit('/')
    if len(split) > 1:
        return split[-2]
    else:
        split = path.rsplit('\\')
        return split[-2]


# Strip the full path off of the folder name
subfolder_names = list(map(lambda path: last_folder(path), subfolder_paths))

# Look through each subfolder's __init__.py for commands, and commandize them
package, module = __name__.rsplit('.', 1)
for subfolder_name in subfolder_names:
    module_name = package + '.' + str(subfolder_name)
    command_names = importlib.import_module(module_name).__all__
    for command_name in command_names:
        function = importlib.import_module(module_name+'.'+command_name)
        command = commandize(function)
