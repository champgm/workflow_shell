import os
import glob
import click
from ..util import run
from ..util import get_result
from ..util import find_package_jsons
from ..util import get_containing_folder


command_string = 'nupdate'
command_help = 'Takes two optional arguments, the package to update and the target version. ' +\
    'Updates all NPM projects with that package to the specified version'
command_arguments = ['package', 'version']
argument_required = False
argument_default = None


def main(*args, **kwargs):
    package = kwargs.get(command_arguments[0])
    version = kwargs.get(command_arguments[1])

    package_json_paths = find_package_jsons()
    for package_json_path in package_json_paths:
        click.echo('Project ' + str(package_json_paths.index(package_json_path)+1) +
                   ' of ' + str(len(package_json_paths)))
        if package is not None:
            if package in open(package_json_path).read():
                folder = get_containing_folder(package_json_path)
                if version is not None:
                    package_and_version = package + '@' + version
                    run(['npm', '--prefix', folder, 'update', package_and_version])
                else:
                    run(['npm', '--prefix', folder, 'update', package])
        else:
            folder = get_containing_folder(package_json_path)
            run(['npm', '--prefix', folder, 'update'])
