requirements:
	pip install -r requirements.txt
	npm install
	$(npm bin)/bower install

serve:
	FLASK_APP=typesetter/typesetter.py FLASK_DEBUG=1 flask run
