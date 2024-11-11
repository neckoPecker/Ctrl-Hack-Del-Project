# Dam Control

## Inspiration
There are 1440 dams in Canada, and over thirty thousand worldwide. Many small communities and towns use dams to control and harness their rivers, whether it is for flood prevention, water for agriculture, or power generation. These dams need continuous monitoring and upkeep in order to control the water flow and ensure the dam keeps a sufficient water level without overflowing. A lot goes into this upkeep, taking into consideration the many factors that affect water levels: the time of year, weather patterns, temperature, humidity, upstream water levels, and so on. A lot of intuition goes into controlling a dam, based on historical data and forecasts, something that a machine learning model would be well-suited for handling.

## What it does
This is a dam-monitoring and management tool that can self-train based off weather data, locational data, climate data and chronological data. Users who visit the website have their locational data stored and climate around the area noted (with consent of course). The dam will constantly generate predictions about the suggested outflow of the dam from various factors about the water level, including factors like:

Time of year (day and month)
Temperature
Humidity
Upstream water level
Downstream water level
Precipitation history
Yesterday's water levels
How we built it
This application was build in a Flask backend and React + MUI frontend. There are API calls to google maps, open-meteo, ipapi for real-time on-the-fly data. We also created 2 machine learning prediction models, one regresional and one classification model, to predict the future water-levels. The data was provided by kaggle and TRCA.

## Challenges we ran into
Frontend is hard and infuriating. Getting things to work in React especially with limited JavaScript expertise means that most of our time was spent tackling dependencies to make sure they worked well with each other. Finding good quality data was also hard. We had to spend some time going through each data-set and looking for quality data that suited our needs.

## Accomplishments that we're proud of
Real-time water outflow prediction dashboard

## What we learned
Along with learning React, we also learned some Bootstrap, Tailwind and MUI and ended up sticking with MUI.

## What's next for Data Dam
The next step is to bring in a working prototype of this dam hardware so that it can be integrated with software for real-life applicability.

## Contributors
* Umair Adil
* Aaron Lianto
* Vaughn Chan
* David Chen
