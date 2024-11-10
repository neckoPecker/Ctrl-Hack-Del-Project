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

  // X-Axis: Defines per second
  useEffect(() => {
    if (count < 5) {
      setXAxisData(xAxisData => [...xAxisData, count]);
    } else {
      setXAxisData(xAxisData => [count-4, count-3, count-2, count-1, count]);
    }
      
  }, [randNum, inputPrediction]);

  // Y-Axis: Shows off the inflow
  useEffect(() => {     
    if (count < 5) {
      setYAxisData(yAxisData => [...yAxisData, inputPrediction]);  
    } else {
      setYAxisData(yAxisData => [yAxisData[1], yAxisData[2], yAxisData[3], yAxisData[4], inputPrediction ]);  
    }
  }, [randNum, inputPrediction]);

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
      
      
    
      
      <div class="container"> 
        <div class="sidebar"> 
          <h3>Inflow:        {(Math.round(inputPrediction * 100) / 100).toFixed(2)}</h3>
          <h3>Month:        {(Math.round(randNum * 100) / 100).toFixed(2)}</h3>
          <h3>Day:       {(Math.round(randNum * 100) / 100).toFixed(2)}</h3>
          <h3>Humidity: {(Math.round(randNum * 100) / 100).toFixed(2)}</h3>
          <h3>Temp: {(Math.round(randNum * 100) / 100).toFixed(2)}</h3>
        </div>
        <div class="data-container">

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
        </div>
      </div>
    </div>
    
  )   
}



export default App;