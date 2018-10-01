import os
import sys
import click
from subprocess import check_output
from subprocess import call
from subprocess import run as sub_run


def get_result(command: list):
    """Runs a command and returns the result"""
    click.echo()
    return check_output(command).decode("utf-8").strip()


def run(command: list, vital=True):
    """Runs a command and prints output to console"""
    try:
        click.echo()
        click.echo('Running: ' + ' '.join(command))
        result = sub_run(command, check=True)
        return result
    except Exception as exception:
        click.echo(str(exception))
        if(vital):
            click.echo('Command was vital, will exit')
            sys.exit(1)
        click.echo('Command was not vital, will continue')
        return None


def print_dir(thing):
    """Prints all attributes for a thing"""
    dir_list = dir(thing)
    for item_name in dir_list:
        item = getattr(thing, item_name)
        click.echo(item_name+': '+str(item))


def get_containing_folder(path: str):
    return os.path.dirname(path)


def find_package_jsons():
    click.echo(
        'Finding all package.json files excluding those inside \'node_modules\' folders')
    click.echo('This may take a moment...')
    file_list = get_result(
        ['find', '.', '-type', 'f', '-name', 'package.json', '!', '-path', '*/node_modules/*'])
    package_json_paths = file_list.split('\n')
    return package_json_paths
