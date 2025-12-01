import React from 'react'
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Clients", path: "/clients" },
  { name: "Products", path: "/products" },
  { name: "Ports", path: "/ports" },
  { name: "Warehouses", path: "/warehouses" },
  { name: "Land Shipments", path: "/land-shipments" },
  { name: "Sea Shipments", path: "/sea-shipments" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `p-2 rounded-md transition ${
                isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar