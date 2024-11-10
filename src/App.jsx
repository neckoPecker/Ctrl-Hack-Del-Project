import { useEffect, useState } from 'react'
import './App.css'
import { LineChart } from '@mui/x-charts/LineChart';


function App() {

  let predictions = [];

  const [time, setTime] = useState(new Date());
  const [randNum, setRandNum] = useState(1);
  const [inputPrediction, setInputPrediction] = useState(null);
  const [count, setCount] = useState(0);
  const [xAxisData, setXAxisData] = useState([]);
  const [yAxisData, setYAxisData] = useState([]);


  useEffect(() => {
    const interval = setInterval(() => {
      setRandNum(Math.random() * 100);
      setCount(count => count+1)
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      setXAxisData(xAxisData => [...xAxisData, count]);
  }, [randNum]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/input_rate_product?month=${randNum}&day=${randNum}&heat=${randNum}&temp=${randNum}`, {
        method: "GET"
      });
      const result = await response.json();
      console.log(result['value']);
      setInputPrediction(result['value']);
      predictions.push(result['value']);
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
  
}, [randNum]);


  return (
    <div className="App">
      
      <LineChart
      skipAnimation={true}
      xAxis={[{ data: xAxisData }]}
      series={[
        {
          data: xAxisData
        },
      ]}
      width={500}
      height={300}
    />
    
      {/* <p>Test:     {xAxisData}</p> */}
      <h3>Inflow:        {inputPrediction}</h3>
      <h3>Month:        {randNum}</h3>
      <h3>Day:       {randNum}</h3>
      <h3>Humidity: {randNum}</h3>
      <h3>Temp: {randNum}</h3>
    </div>
  )   
}



export default App;