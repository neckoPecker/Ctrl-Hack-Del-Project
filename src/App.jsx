import { useEffect, useState } from 'react'
import './App.css'
import { LineChart } from '@mui/x-charts/LineChart';
import fetchJsonp from 'fetch-jsonp';
import  DamImage  from './DamImage.jsx'

function App() {
  let pre = [];
  const [randNum, setRandNum] = useState(1);
  const [inflow, setInflow] = useState(0);
  const [outflow, setOutflow] = useState(0);
  const [count, setCount] = useState(0);
  const [xAxisData, setXAxisData] = useState([]);
  const [yAxisData, setYAxisData] = useState([]);
  const [y2AxisData, setY2AxisData] = useState([]);
  const [ip, setIp] = useState(0);
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);
  const [weather, setWeather] = useState(0);
  const [humidity, setHumidity] = useState(0);

  const [rapid, setRapid] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRapid(rapid => rapid + 1);
    }, 20);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(  () => {
  const getLocationData = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setLat(data.latitude)
      setLon(data.longitude)
      setIp(data.ip)
      // You can access specific data like:
      // data.latitude, data.longitude, data.city, data.country_name
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };
  getLocationData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setRandNum(Math.random() * 100);
      setCount(count => count+1)
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Obtain weather data through api
  useEffect(  () => {
    const interval = setInterval(() => {
    const getWeatherData = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&hourly=temperature_2m,relative_humidity_2m&forecast_days=1');
        const data = await response.json();
        setWeather(data.hourly.temperature_2m[0])
        setHumidity(data.hourly.relative_humidity_2m[0])
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };
    getWeatherData()
    }, 10000);
    }, [lat, lon])

  // X-Axis: Defines per second
  useEffect(() => {
    if (count < 10) {
      setXAxisData(xAxisData => [...xAxisData, count]);
    } else {
      setXAxisData(() => [count-9, count-8, count-7, count-6, count-5, count-4, count-3, count-2, count-1, count]);
    }
      
  }, [randNum]);

  // Y-Axis: Shows off the inflow
  useEffect(() => {     
    if (count < 10) {
      setYAxisData(yAxisData => [...yAxisData, inflow]);  
    } else {
      setYAxisData(yAxisData => [yAxisData[1], yAxisData[2], yAxisData[3], yAxisData[4], yAxisData[5], yAxisData[6], yAxisData[7], yAxisData[8], yAxisData[9], inflow ]);  
    }
  }, [randNum]);

  // Y2-Axis: Shows off the outflow
  useEffect(() => {     
    if (count < 10) {
      setY2AxisData(y2AxisData => [...y2AxisData, outflow]);  
    } else {
      setY2AxisData(y2AxisData => [y2AxisData[1], y2AxisData[2], y2AxisData[3], y2AxisData[4], y2AxisData[5], y2AxisData[6], y2AxisData[7], y2AxisData[8], y2AxisData[9], outflow]);  
    }
  }, [randNum]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/input_rate_product?month=${randNum}&day=${randNum}&heat=${randNum}&temp=${randNum}`, {
        method: "GET"
      });
      const result = await response.json();
      console.log(result['value']);
      setInflow(result['value']);
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
  
}, [randNum]);


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/output_rate_product?lat=${lat}&lon=${lon}&inflow=${inflow}`, {
        method: "GET"
      });
      const result = await response.json();
      console.log(result['value']);
      setOutflow(result['value']);
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
  
}, [randNum]);


return (
  <div className="App">
    <div class="container"> 
      <div class="sidebar">
        <div class="label-container">
          <h2 class="label">Data</h2>
        </div> 
        {/* <h3>Inflow:{'\t'}{(Math.round(inflow * 100) / 100).toFixed(2)}</h3> */}
        <h3>Inflow: {inflow}</h3>
        <h3>Outflow:{'\t'}{(Math.round(outflow * 100) / 100).toFixed(2)}</h3>
        <h3>Month:{'\t'}{(new Date()).getMonth() + 1}</h3>
        <h3>Day:{'\t'}{(new Date()).getDate()}</h3>
        <h3>Humidity:{'\t'}{(Math.round(humidity * 100) / 100).toFixed(2)}</h3>
        <h3>Temp:{'\t'}{(Math.round(weather * 100) / 100).toFixed(2)}</h3>
      </div>
      <div class="data-container">
        <div class="label-container">
          <h2 class="label">Visualizations</h2>
          <DamImage outflowlevel={outflow}></DamImage>
        </div>
        {/* Line Chart 1 for Inflow */}
        <h4>Inflow vs Time</h4> 
        <LineChart
          skipAnimation={true}
          xAxis={[{ data: xAxisData }]}
          series={[
            {
              data: yAxisData
            },
          ]}
          width={800}
          height={300}
        />

        {/* Line Chart 2 for Outflow  */}
        <h4>Outflow vs Time</h4> 
        <LineChart
          skipAnimation={true}
          xAxis={[{ data: xAxisData }]}
          series={[
            {
              data: y2AxisData
            },
          ]}
          width={800}
          height={300}
        />

      </div>
    </div>
  </div>
  
)   
}

export default App;