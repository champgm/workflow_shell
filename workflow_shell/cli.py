import os
import click
import importlib
from os import walk
from glob import glob
from .command import get_class
from .util import print_dir
from click import Argument


@click.group()
def wshp():
    """Workflow Shell"""


def commandize(module):
    if 'command_string' in dir(module):
        @wshp.command(name=module.command_string, cls=get_class())
        # @click.argument('filename')
        def wrapper(*args, **kwargs):
            return module.main(*args, **kwargs)
        wrapper.help = module.command_help
        if hasattr(module,'command_arguments'):
          argument = Argument(module.command_arguments)
          wrapper.params.append(argument)
        # print_dir(wrapper)
        return wrapper
    return None


# create a list of all subdirectories
scriptDirectory = os.path.dirname(os.path.realpath(__file__))
directory_glob = scriptDirectory+"/*/"
subfolders = glob(directory_glob)


def blacklisted(path):
    blacklist = ['__pycache__']
    for banned in blacklist:
        if banned in path:
            return True
    return False


# Filter out any unwanted subfolders
subfolder_paths = list(filter(lambda path: not blacklisted(path), subfolders))


def last_folder(path):
    split = path.rsplit('/')
    return split[-2]


# Strip the full path off of the folder name
subfolder_names = list(map(lambda path: last_folder(path), subfolder_paths))

# Look through each subfolder's __init__.py for commands, and commandize them
package, module = __name__.rsplit('.', 1)
for subfolder_name in subfolder_names:
    module_name = package + '.' + str(subfolder_name)
    command_names = importlib.import_module(module_name).__all__
    for command_name in command_names:
        command = importlib.import_module(module_name+'.'+command_name)
        commandize(command)
