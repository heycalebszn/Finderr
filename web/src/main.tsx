import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import DeviceTracker from './pages/find-device.tsx';
import DeviceList from './components/list-devices.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/scan' element={<DeviceTracker />} />
        <Route path='/find' element={<DeviceList />} />
      </Routes>
    </Router>
  </StrictMode>,
)
