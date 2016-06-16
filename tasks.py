"""Task functions for use with Invoke."""
from invoke import task


@task
def clean(context):
    cmd = '$(npm bin)/gulp clean'

    context.run(cmd)


@task
def requirements(context):
    steps = [
        'pip install -r requirements.txt',
        'npm install',
        '$(npm bin)/bower install',
    ]
    cmd = ' && '.join(steps)

    context.run(cmd)


@task
def run(context, host='127.0.0.1', port='5000'):
    steps = [
        'open http://{host}:{port}/',
        'FLASK_APP=typesetter/typesetter.py FLASK_DEBUG=1 flask run --host={host} --port={port}',
    ]
    steps = [step.format(host=host, port=port) for step in steps]
    cmd = ' && '.join(steps)

    context.run(cmd)


@task
def static(context):
    cmd = '$(npm bin)/gulp'

    context.run(cmd)
