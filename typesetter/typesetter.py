import argparse

from flask import Flask, render_template, jsonify
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
app.config.update(
    JSONIFY_PRETTYPRINT_REGULAR=False,
)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/words')
def words():
    with open('typesetter/data/words.txt') as words:
        return jsonify([word.strip('\n') for word in words])


server = Server(app.wsgi_app)
server.serve(host=args.host, port=args.port)
