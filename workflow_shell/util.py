import click
from subprocess import check_output
from subprocess import call


def get_result(command: list):
    """Runs a command and returns the result"""
    return check_output(command).decode("utf-8").strip()


def run(command: list):
    """Runs a command and prints output to console"""
    return call(command)


def print_dir(thing):
    """Prints all attributes for a thing"""
    dir_list = dir(thing)
    for item_name in dir_list:
        item = getattr(thing, item_name)
        click.echo(item_name+': '+str(item))
