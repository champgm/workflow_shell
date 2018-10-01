import os
import glob
import click
from ..util import run
from ..util import get_result


command_string = 'nup'
command_help = 'Takes two arguments, the package to update and the target version, which is optional. ' +\
    'Updates all NPM projects with that package to the specified version'
command_arguments = ['package', 'version']
argument_required = False
argument_default = None


def get_containing_folder(path: str):
    return os.path.dirname(path)


def main(*args, **kwargs):
    package = kwargs.get(command_arguments[0])
    version = kwargs.get(command_arguments[1])
    click.echo('package: ' + str(package))
    click.echo('version: ' + str(version))
    click.echo(
        'Finding all package.json files excluding those inside \'node_modules\' folders')
    click.echo('This may take a moment...')
    file_list = get_result(
        ['find', '.', '-type', 'f', '-name', 'package.json', '!', '-path', '*/node_modules/*'])
    package_json_paths = file_list.split('\n')
    # folders = list(
    #     map(lambda path: get_containing_folder(path), package_json_paths))
    # click.echo(str(folders))

    for package_json_path in package_json_paths:
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
    # click.echo(str(package_json_paths))
