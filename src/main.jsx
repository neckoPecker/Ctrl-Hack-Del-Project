import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import App2 from './App2.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>
      <h1>Dam Data</h1>
      <App />
      <App2 />  
    </div>
  </StrictMode>,
)
