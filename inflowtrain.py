import numpy as np 
import pandas as pd
# find correlation between
# LOCAL_MONTH (1-12)
# LOCAL_DAY (1-31)
# HEATING_DEGREE_DAYS (0-30.8)
# MEAN_TEMPERATURE (-12.8 - 25.5)
# output
# TOTAL_PRECIPITATION (0-100)

from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import numpy as np
import matplotlib.pyplot as plt
from math import isnan
import random
import joblib


climatedata = pd.read_csv('climatedata.csv')
# make data
xdata = []
ydata = []
for i in range(len(climatedata)):
    localmonth = climatedata["LOCAL_MONTH"][i]
    localday = climatedata["LOCAL_DAY"][i]
    heatingdegree = climatedata["HEATING_DEGREE_DAYS"][i]
    temp = climatedata["MEAN_TEMPERATURE"][i]
    rain = climatedata["TOTAL_PRECIPITATION"][i]
    if not(isnan(localmonth) or  isnan(localday) or isnan(heatingdegree) or isnan(temp) or isnan(rain)):
        xdata.append([localmonth, localday, heatingdegree, temp])
        ydata.append(rain)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(xdata, ydata, test_size=0.2, random_state=42)

# Create and train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
print(f"Root Mean Squared Error: {rmse}")

# Example prediction
new_data = np.array([[2, 10, 7.0, 14.0]])
predicted_rainfall = model.predict(new_data)
print(f"Predicted rainfall: {predicted_rainfall[0]:.2f} mm")


#xdatas = []
#ydatas = []
## testing the data
#for i in range(10000):
#    randmonth = random.randint(1,12)
#    randday = random.randint(1,30)
#    heatingdegree = random.randint(0,31)
#    randtemp = random.randint(-13, 26)
#    print("========")
#    xdata = np.array([randmonth, randday, heatingdegree, randtemp]).reshape(-1, 4)
#    print(xdata)
#    ydata =model.predict(xdata)
#    xdatas.append(xdata)
#    print(ydata)
#    ydatas.append(ydata)

joblib.dump(model, 'inflowdata.pkl')

breakpoint()
