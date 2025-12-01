import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients" element={<div>Clients</div>} />
          <Route path="products" element={<div>Products</div>} />
          <Route path="ports" element={<div>Ports</div>} />
          <Route path="warehouses" element={<div>Warehouses</div>} />
          <Route path="land-shipments" element={<div>Land Shipments</div>} />
          <Route path="sea-shipments" element={<div>Sea Shipments</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
