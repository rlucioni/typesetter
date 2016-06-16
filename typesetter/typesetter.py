import argparse

from flask import Flask, render_template
from livereload import Server


parser = argparse.ArgumentParser()

parser.add_argument(
    '--host',
    action='store',
    dest='host',
    default='127.0.0.1'
)
parser.add_argument(
    '--port',
    action='store',
    dest='port',
    default='5000'
)

args = parser.parse_args()

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/hello')
def hello():
    return render_template('hello.html')


server = Server(app.wsgi_app)
server.serve(host=args.host, port=args.port, open_url=True)
