import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 1. Importar el CSS de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// 2. Importar el JS de Bootstrap (necesario para menú hamburguesa, modales, etc.)
import 'bootstrap/dist/js/bootstrap.bundle.min.js' 

// Tu CSS personalizado (si lo necesitas)
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  )