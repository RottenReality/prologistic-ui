import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import './App.css'
import ClientsList from './pages/Clients/ClientsList';
import ProductsList from './pages/Products/ProductsList';
import PortsList from './pages/Ports/PortsList';
import WarehousesList from './pages/Warehouses/WarehousesList';
import LandShipmentsList from './pages/LandShipments/LandShipmentsList';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients" element={<ClientsList/>} />
          <Route path="products" element={<ProductsList/>} />
          <Route path="ports" element={<PortsList/>} />
          <Route path="warehouses" element={<WarehousesList/>} />
          <Route path="land-shipments" element={<LandShipmentsList/>} />
          <Route path="sea-shipments" element={<div>Sea Shipments</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
