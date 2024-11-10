import joblib
import numpy as np
model = joblib.load('inflowdata.pkl')

testx = np.array([[2, 10, 7.0, 14.0]])
print(model.predict(testx))
