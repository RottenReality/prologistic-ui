import React from 'react'
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-6">ProLogistic</h1>
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" className="p-2 rounded-md hover:bg-gray-200">
          Dashboard
        </NavLink>
        <NavLink to="/clients" className="p-2 rounded-md hover:bg-gray-200">
          Clients
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar