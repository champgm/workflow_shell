import click
import importlib

# importlib.import_module('git.git-status')

package, module = __name__.rsplit('.', 1)
gs = importlib.import_module(f'{package}.git.git-status')


@click.command()
@click.option('--as-cowboy', '-c', is_flag=True, help='Greet as a cowboy.')
@click.argument('name', default='world', required=False)
def wshp(name, as_cowboy):
    """Workflow Shell"""
    greet = 'Howdy' if as_cowboy else 'Hello'
    click.echo('{0}, {1}.'.format(greet, name))
    click.echo(__name__)
    click.echo(gs)
    click.echo(dir(gs))

    gs.main()
    commandized = commandize(gs.main)
    setattr(gs, 'main', commandized)


def commandize(function):
    @wshp.command()
    def wrapper(*args, **kwargs):
        print(function)
        return function(*args, **kwargs)
    return wrapper


@wshp.command()
def asdf():
    click.echo('asdf')
