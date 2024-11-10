import mimetypes
from flask import Flask, render_template, jsonify
from flask_cors import CORS, cross_origin



api = Flask(__name__, template_folder='../dist/',
            static_folder="../dist/assets/")
cors = CORS(api) # allow CORS for all domains on all routes.
api.config['CORS_HEADERS'] = 'Content-Type'

mimetypes.add_type('text/jsx', '.jsx')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('text/html', '.html')

@api.route('/')
@cross_origin()
def my_profile():
    """ response_body = {
        "name": "Some name",
        "about" :"Something text"
    } """

    return render_template("index.html")

@api.route('/api/input_rate_product')
@cross_origin()
def get_input_rate_prediction():
    response_body = {
        "value" : 42069,
        "mimetype" : 'application/json'
    }
    return response_body