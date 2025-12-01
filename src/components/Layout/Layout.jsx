import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-6 overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout