import click

class GitStatus:
  """
  Displays the current status of the git repository.
  """

  @click.command()
  def main(self):
      click.echo('gs called')
