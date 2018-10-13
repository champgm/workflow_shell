import click
from ..util import run
from ..util import find_package_jsons
from ..util import get_containing_folder


command_string = 'nrun'
command_help = 'Takes one argument, the command to run. ' +\
    'Runs the command on all NPM projects'
command_arguments = ['command']
argument_required = True
argument_default = None


def main(*args, **kwargs):
    command = kwargs.get(command_arguments[0])

    package_json_paths = find_package_jsons()
    for package_json_path in package_json_paths:
        click.echo('Project ' + str(package_json_paths.index(package_json_path)+1) +
                   ' of ' + str(len(package_json_paths)))
        folder = get_containing_folder(package_json_path)
        run(['npm', '--prefix', folder, command])
