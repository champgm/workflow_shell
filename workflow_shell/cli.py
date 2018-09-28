import click
import importlib

# importlib.import_module('git.git-status')

package, module = __name__.rsplit('.', 1)


@click.command()
@click.option('--as-cowboy', '-c', is_flag=True, help='Greet as a cowboy.')
@click.argument('name', default='world', required=False)
def main(name, as_cowboy):
    """Workflow Shell"""
    greet = 'Howdy' if as_cowboy else 'Hello'
    click.echo('{0}, {1}.'.format(greet, name))
    click.echo(__name__)
