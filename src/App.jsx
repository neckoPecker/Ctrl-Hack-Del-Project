import { useEffect, useState } from 'react'
import './App.css'


function App() {

  const [time, setTime] = useState(new Date());
  const [randNum, setRandNum] = useState(0);
  const [inputPrediction, setInputPrediction] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandNum(Math.random() * 100);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

//  function testresp (response){
//    console.log(response.text())
//    setInputPrediction(response)
//  }
  useEffect(() => {
    fetch('http://localhost:5000/api/input_rate_product', {
      method: "GET"
    })
      .then(response => response.json())
      .then(result => console.log(result['value'])) 
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <h3>Humidity        {result}</h3>
      <h3>Weather:        {randNum}</h3>
      <h3>Wind Speed:       {randNum}</h3>
      <h3>Status: Shut</h3>
    </div>
  )   
}



export default App;