from flask import Flask, render_template, jsonify


app = Flask(__name__)

# Read in the entire wordlist at startup and keep it in memory.
# Optimization for improving search response time.
with open('typesetter/data/words.txt') as f:
    WORDS = f.read().split('\n')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/search/<fragment>')
def search(fragment):
    results = []

    for word in WORDS:
        if fragment in word:
            results.append({
                'word': word,
                'category': classify(word),
            })

    return jsonify(results)


def classify(word):
    length = len(word)

    if length < 7:
        return 'short'
    elif length < 10:
        return 'medium'
    else:
        return 'long'
