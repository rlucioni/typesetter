"""Task functions for use with Invoke."""
from invoke import task


@task
def clean(context):
    """Delete compiled CSS and JS."""
    cmd = '$(npm bin)/gulp clean'

    context.run(cmd)


@task
def requirements(context):
    """Install requirements using pip, npm, and bower."""
    steps = [
        'pip install -r requirements.txt',
        'npm install',
    ]
    cmd = ' && '.join(steps)

    context.run(cmd)


@task(help={
    'host': 'Hostname on which to run the server',
    'port': 'Port on which to run the server',
})
def serve(context, host='127.0.0.1', port='5000'):
    """Serve the Flask app."""
    cmds = [
        'open http://{host}:{port}',
        'FLASK_APP=typesetter/typesetter.py FLASK_DEBUG=1 flask run --host={host} --port={port}',
    ]
    cmds = [cmd.format(host=host, port=port) for cmd in cmds]
    cmd = ' && '.join(cmds)

    context.run(cmd)


@task
def static(context):
    """Compile Sass and JSX, recompiling when changes are detected."""
    cmd = '$(npm bin)/gulp'

    context.run(cmd)
