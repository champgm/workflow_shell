import click
import importlib

# importlib.import_module('git.git-status')

package, module = __name__.rsplit('.', 1)
gs = importlib.import_module(package + '.git.git-status')


@click.group()
@click.option('--as-cowboy', '-c', is_flag=True, help='Greet as a cowboy.')
def wshp(as_cowboy):
    """Workflow Shell"""
    greet = 'Howdy' if as_cowboy else 'Hello'
    click.echo('{0}, {1}.'.format(greet, 'name'))
    click.echo(__name__)
    click.echo(gs)
    click.echo(dir(gs))

    # gs.main()
    # commandized = commandize(gs.main)
    # setattr(gs, 'main', commandized)


def commandize(function):
      click.echo(function.__name__)

    @wshp.command(name='gs')
    def wrapper(*args, **kwargs):
        print(function)
        return function(*args, **kwargs)
    click.echo(wrapper)
    return wrapper

commandize(gs.main)

