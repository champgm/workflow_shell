import os
import glob
import click
import re
from ..util import run
from ..util import get_result
from ..util import find_package_jsons
from ..util import get_containing_folder


command_string = 'nupgrade'
command_help = 'Takes two required arguments, the package to update and the target version. ' +\
    'Updates all NPM projects with that package to the specified version'
command_arguments = ['package', 'version']
argument_required = True
argument_default = None


def main(*args, **kwargs):
    package = kwargs.get(command_arguments[0])
    version = kwargs.get(command_arguments[1])

    package_json_paths = find_package_jsons()
    for package_json_path in package_json_paths:
        package_json = open(package_json_path).read()
        if package in package_json:
            replace_pattern = '"' + package + '": ".*"'
            new_string = '"' + package + '": "^'+version+'"'
            new_package_json = re.sub(
                replace_pattern, new_string, package_json)
            folder = get_containing_folder(package_json_path)
            with open(package_json_path, 'w') as file:
                file.write(new_package_json)
            run(['npm', '--prefix', folder, 'install'])
