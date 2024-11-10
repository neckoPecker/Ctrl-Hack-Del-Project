import mimetypes
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS, cross_origin
import joblib

inflowmodel = joblib.load('../inflowdata.pkl')
outflow = joblib.load('../outflowmodel.pkl')

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
    month = request.args.get('month')
    day = request.args.get('day')
    heat = request.args.get('heat')
    temp = request.args.get('temp')
    toret = inflowmodel.predict([[month,day,heat,temp]])[0]
    response_body = {
        "value" : toret,
        "mimetype" : 'application/json'
    }
    print(toret)
    return response_body