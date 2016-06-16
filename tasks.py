"""Task functions for use with Invoke."""
from threading import Thread

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
        '$(npm bin)/bower install',
    ]
    cmd = ' && '.join(steps)

    context.run(cmd)


@task(help={
    'host': 'Hostname on which to run the server',
    'port': 'Port on which to run the server',
})
def serve(context, host='127.0.0.1', port='5000'):
    """Serve the Flask app."""
    cmd = 'python3 typesetter/typesetter.py --host {host} --port {port}'
    cmd = cmd.format(host=host, port=port)

    context.run(cmd)


@task
def static(context):
    """Compile Sass and JSX, recompiling when changes are detected."""
    cmd = '$(npm bin)/gulp'

    context.run(cmd)


@task(help={
    'host': 'Hostname on which to run the server',
})
def stream(context, host='127.0.0.1'):
    """
    Serve the site, open it in a browser, and watch for changes. Refresh the browser when changes are detected.
    """
    tasks = [
        (static, {}),
        (serve, {'host': host}),
    ]

    threads = [
        Thread(target=target, args=(context,), kwargs=kwargs, daemon=True)
        for target, kwargs in tasks
    ]

    [t.start() for t in threads]
    [t.join() for t in threads]
