requirements:
	pip install -r requirements.txt
	npm install
	$(npm bin)/bower install

run:
	open http://127.0.0.1:5000/ && FLASK_APP=typesetter/typesetter.py FLASK_DEBUG=1 flask run

static:
	$(npm bin)/gulp
