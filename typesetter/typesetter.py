from flask import Flask, render_template, jsonify


app = Flask(__name__)
app.config.update(
    JSONIFY_PRETTYPRINT_REGULAR=False,
)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/search/<fragment>')
def search(fragment):
    results = []
    with open('typesetter/data/words.txt') as words:
        for word in words:
            word = word.strip('\n')
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
