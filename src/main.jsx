import { createRoot } from 'react-dom/client'
// import './index.css'
// import './fanta.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <div className="dark:bg-black">
    <App />
  </div>
)
