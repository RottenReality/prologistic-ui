import React from "react";
import { Link } from "react-router-dom";

const dashboardItems = [
  { name: "Clients", path: "/clients", icon: "👥" },
  { name: "Products", path: "/products", icon: "📦" },
  { name: "Ports", path: "/ports", icon: "⚓" },
  { name: "Warehouses", path: "/warehouses", icon: "🏭" },
  { name: "Land Shipments", path: "/land-shipments", icon: "🚚" },
  { name: "Sea Shipments", path: "/sea-shipments", icon: "🚢" },
];

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        🚀 ProLogistic Dashboard
      </h1>

      <p className="mb-6 text-gray-600">
        Quick access to all logistics modules and master data.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dashboardItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="
                        block p-6 rounded-lg shadow-lg 
                        bg-white 
                        hover:shadow-xl hover:bg-blue-50 
                        transition duration-300 ease-in-out
                        border border-gray-200
                    "
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {item.name}
            </h2>
            <p className="text-sm text-gray-500">
              Manage all {item.name.toLowerCase()} data.
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
