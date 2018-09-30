import sys
import click
from subprocess import check_output
from subprocess import call
from subprocess import run as sub_run


def get_result(command: list):
    """Runs a command and returns the result"""
    return check_output(command).decode("utf-8").strip()


def run(command: list):
    """Runs a command and prints output to console"""
    try:
        result = sub_run(command, check=True)
        return result
    except Exception as exception:
        click.echo(str(exception))
        sys.exit(1)


def print_dir(thing):
    """Prints all attributes for a thing"""
    dir_list = dir(thing)
    for item_name in dir_list:
        item = getattr(thing, item_name)
        click.echo(item_name+': '+str(item))
