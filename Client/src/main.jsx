import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import MyContextProvider from './context/MyContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyContextProvider>
      <App />
    </MyContextProvider>
  </StrictMode>,
)
