import joblib
import pandas as pd
import numpy as np
from sklearn.preprocessing import PolynomialFeatures
# Create a sample input with all required features
# Order should match your training data: upstream_water_level, downstream_water_level, inflow_rate, yesterday_upstream, yesterday_inflow, yesterday_downstream, yesterday_outflow
sample_input = pd.DataFrame([[120, 80, 12000]], 
                          columns=['upstream_water_level', 'downstream_water_level', 'inflow_rate', 
                                 ])

# Transform the input using polynomial features
pf = PolynomialFeatures(degree=2)
sample_input_poly = pf.fit_transform(sample_input)

# Load the model and make prediction
loaded_model = joblib.load('outflowmodel.pkl')
prediction = loaded_model.predict(sample_input_poly)

print(f"Predicted outflow rate: {prediction[0]:.2f}")