from ..util import get_result
from ..util import run


command_string = 'gsu'
command_help = 'Sets the target upstream branch'


def main(*args, **kwargs):
    branch_name = get_result(['git', 'rev-parse', '--abbrev-ref', 'HEAD'])
    branch_path = 'origin/%(branch_name)s' % locals()
    run(['git', 'branch', '--set-upstream-to', branch_path])
