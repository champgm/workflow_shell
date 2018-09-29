import click
from .util import print_dir


def get_class():
    class CustomCommandClass(click.Command):
        def invoke(self, context):
            click.echo('CONTEXT: ')
            context.args=['anArg']
            print_dir(context)
            return super(CustomCommandClass, self).invoke(context)
    return CustomCommandClass
