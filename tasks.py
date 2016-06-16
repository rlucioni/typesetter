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
def run(context):
    steps = [
        'open http://127.0.0.1:5000/',
        'FLASK_APP=typesetter/typesetter.py FLASK_DEBUG=1 flask run',
    ]
    cmd = ' && '.join(steps)

    context.run(cmd)


@task
def static(context):
    cmd = '$(npm bin)/gulp'

    context.run(cmd)
