import mimetypes
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS, cross_origin
import joblib
import pandas as pd
from sklearn.preprocessing import PolynomialFeatures
import requests
from dotenv import load_dotenv
import os
load_dotenv()
googlekey = os.getenv('GOOGLEMAPS')

inflowmodel = joblib.load('../inflowdata.pkl')
outflowmodel = joblib.load('../outflowmodel.pkl')

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

@api.route('/api/output_rate_product')
@cross_origin()
def get_output_rate_prediction():
    # requires:
    # - user long
    # - user lat
    # - inflowdata
    lat=float(request.args.get('lat')) 
    lon=-float(request.args.get('lon')) 
    inflow = float(request.args.get('inflow')) * 1000
    response_body = {
            "value" : 0,
            "mimetype" : 'application/json'
    }
    url = f"https://maps.googleapis.com/maps/api/elevation/json?locations={17}%2C-{88}&key={googlekey}"
    r = requests.get(url)
    elevation = r.json()['results'][0]['elevation'] or 0
    print("==============================")
    print("==============================")
    print(elevation)
    print("==============================")
    print("==============================")
    if elevation:
        sample_input = pd.DataFrame([[elevation/2 + 100, elevation/6, inflow]], 
                              columns=['upstream_water_level', 'downstream_water_level', 'inflow_rate', 
                                     ])
        # Transform the input using polynomial features
        pf = PolynomialFeatures(degree=2)
        sample_input_poly = pf.fit_transform(sample_input)
        retdata = min(outflowmodel.predict(sample_input_poly)[0]/100000,10)
        response_body["value"] = retdata,
    return response_body

    