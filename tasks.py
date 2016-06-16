"""Task functions for use with Invoke."""
from threading import Thread

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
def serve(context, host='127.0.0.1', port='5000'):
    cmd = 'python3 typesetter/typesetter.py --host {host} --port {port}'
    cmd = cmd.format(host=host, port=port)

    context.run(cmd)


@task
def static(context):
    cmd = '$(npm bin)/gulp'

    context.run(cmd)


@task
def stream(context, host=None):
    tasks = [static, serve]

    threads = [Thread(target=task, args=(context,), daemon=True) for task in tasks]

    [t.start() for t in threads]
    [t.join() for t in threads]
